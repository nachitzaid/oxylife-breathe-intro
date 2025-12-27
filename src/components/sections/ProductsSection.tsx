
"use client"

import { AnimatePresence, useScroll, useSpring } from "framer-motion"
import { useState, useRef } from "react"
import { products } from "@/data/products"
import { ProductCard } from "./product-card"
import { ProductDetailModal } from "./product-detail-modal"

export default function ProductsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const selectedProduct = products.find((p) => p.id === selectedId)

  return (
    <section ref={sectionRef} className="relative h-[150vh]" id="products">
      <div className="sticky top-0 h-[147vh] flex flex-col justify-start pt-16 overflow-hidden px-6 bg-background">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Respirez la <span className="text-primary italic">Liberté.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Scrollez pour déployer nos solutions respiratoires premium.
            </p>
          </div>

          <div className="relative h-[900px] flex items-center justify-center">
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
      </div>

      <AnimatePresence>
        {selectedId && selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
