"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { X, ShoppingCart, MessageSquare, ChevronRight } from "lucide-react"
import { products } from "@/data/products"
import type { Product, ProductVariant } from "@/data/products"

// Hook isInView simple
const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isInView
}

// ProductCard – ultra clean comme ton exemple
const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group relative h-[420px] w-[340px] flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/50 shadow-2xl"
      whileHover={{ y: -16, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <img
        src={`/images/${product.variants[0].image}`}
        alt={product.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-3xl font-bold text-white mb-3">{product.title}</h3>
        <p className="text-base text-slate-300/90 line-clamp-2">{product.description}</p>
      </div>
    </motion.div>
  )
}

// Modal simplifiÃ© + couleurs alignÃ©es
const ProductDetailModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id)
  const activeVariant: ProductVariant | undefined = product.variants.find(v => v.id === activeVariantId)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-lg"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          className="w-full max-w-5xl max-h-[90vh] rounded-3xl bg-slate-950 border border-slate-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row pointer-events-auto"
        >
          {/* Image */}
          <div className="flex-1 bg-slate-900/50 p-8 flex items-center justify-center relative">
            {activeVariant && (
              <motion.img
                key={activeVariant.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={`/images/${activeVariant.image}`}
                alt={activeVariant.title}
                className="max-h-[70vh] object-contain"
              />
            )}
            {/* Miniatures */}
            {product.variants.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 backdrop-blur-lg p-4 rounded-2xl border border-slate-700/50">
                {product.variants.map(v => (
                  <motion.button
                    key={v.id}
                    onClick={() => setActiveVariantId(v.id)}
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${
                      v.id === activeVariantId ? "border-teal-500 shadow-teal-500/30" : "border-slate-600 opacity-70"
                    }`}
                  >
                    <img src={`/images/${v.image}`} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="flex-1 p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/60">
            <button onClick={onClose} className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/60 border border-slate-700/50">
              <X className="w-6 h-6 text-slate-300" />
            </button>

            <div className="space-y-8 overflow-y-auto max-h-[calc(90vh-160px)]">
              {activeVariant && (
                <>
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        background: "hsl(187 60% 55% / 0.12)",
                        border: "1px solid hsl(187 60% 55% / 0.25)",
                        color: "hsl(187 60% 75%)",
                      }}>
                      Modèle sélectionné
                    </span>
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
                      {activeVariant.title}
                    </h2>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed">{activeVariant.description}</p>

                  {activeVariant.features && activeVariant.features.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white">Caractéristiques</h3>
                      <AnimatePresence mode="wait">
                        {activeVariant.features.map((f, i) => (
                          <motion.div 
                            key={`feat-${activeVariantId}-${i}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 text-slate-300">
                            <ChevronRight className="w-5 h-5 text-teal-400 flex-shrink-0" />
                            <span>{f}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}
            </div>

           
          </div>
        </motion.div>
      </div>
    </>
  )
}

// Carousel fluide
const InfiniteCarousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full overflow-hidden py-16">
    <motion.div
      className="flex gap-12 px-8"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      {children}
      {children}
    </motion.div>
  </div>
)

// Section principale – style IDENTIQUE à ton exemple "Nos Services"
export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedProduct = products.find(p => p.id === selectedId)

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-black via-slate-950 to-black" id="products">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header EXACTEMENT comme ton exemple */}
        <div className="text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-5 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: "hsl(187 60% 55% / 0.12)",
              border: "1px solid hsl(187 60% 55% / 0.25)",
              color: "hsl(187 60% 72%)",
            }}
          >
            Nos Produits
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Solutions complètes </span>
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              pour votre bien-être
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Découvrez notre gamme d'équipements médicaux et de solutions de suivi adaptées à chaque besoin de santé.
          </motion.p>
        </div>
      </div>

      {/* Carousel */}
      <InfiniteCarousel>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedId(product.id)}
          />
        ))}
      </InfiniteCarousel>

      <AnimatePresence>
        {selectedId && selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}