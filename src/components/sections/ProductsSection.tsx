"use client"

import { AnimatePresence, useScroll,useTransform ,useSpring, motion } from "framer-motion"
import { useState, useRef } from "react"
import { products } from "@/data/products"
import { ProductCard } from "./product-card"
import { ProductDetailModal } from "./product-detail-modal"

"use client"


export default function ProductsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const selectedProduct = products.find((p) => p.id === selectedId)

  return (
    <section ref={sectionRef} className="relative min-h-[260vh] bg-gradient-to-b from-background via-primary/5 to-background" id="products">
      {/* Fond animé */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%)",
          scale: useTransform(smoothProgress, [0, 1], [1.2, 1.8]),
          opacity: useTransform(smoothProgress, [0, 1], [0, 0.3]),
        }}
      />

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6">
        <div className="max-w-7xl mx-auto w-full text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-8"
            style={{
              textShadow: useTransform(smoothProgress, [0, 0.5], ["0 0 20px rgba(0,0,0,0)", "0 0 60px var(--primary)"]),
            }}
          >
            Respirez la <span className="text-primary italic">Liberté.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl text-muted-foreground max-w-4xl mx-auto"
          >
            Faites défiler pour découvrir nos solutions respiratoires premium
          </motion.p>
        </div>

        <div className="relative h-[1600px] flex items-center justify-center">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              total={products.length}
              progress={smoothProgress}
              onClick={() => setSelectedId(product.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}