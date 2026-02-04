"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { X, ShoppingCart, MessageSquare, ChevronRight } from "lucide-react"
import { products } from "@/data/products"
import type { Product } from "@/data/products"

// ============ DÉTECTION MOBILE ============
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

const isSmallMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
};

// ============ HOOK CUSTOM ============
const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isInView
}

// ============ PRODUCT CARD - OPTIMISÉE MOBILE ============
const ProductCard = ({
  product,
  onClick,
  isMobileDevice
}: {
  product: Product
  onClick: () => void
  isMobileDevice: boolean
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800/50 shadow-2xl flex-shrink-0 ${isMobileDevice
        ? 'h-[360px] w-[280px] sm:h-[420px] sm:w-[340px]'
        : 'h-[420px] w-[340px]'
        }`}
      whileHover={isMobileDevice ? {} : { y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: isMobileDevice ? "tween" : "spring",
        stiffness: isMobileDevice ? undefined : 280,
        damping: isMobileDevice ? undefined : 24,
        duration: isMobileDevice ? 0.2 : undefined
      }}
    >
      {/* Image - scale réduit sur mobile */}
      <img
        src={`/images/${product.variants[0].image}`}
        alt={product.title}
        className={`absolute inset-0 h-full w-full object-cover transition-transform ${isMobileDevice
          ? 'duration-500 group-active:scale-105'
          : 'duration-1000 group-hover:scale-110'
          }`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8`}>
        <motion.h3
          className={`font-bold text-white mb-2 ${isMobileDevice
            ? 'text-xl sm:text-2xl'
            : 'text-3xl'
            }`}
        >
          {product.title}
        </motion.h3>
        <p className={`text-slate-300/90 line-clamp-2 ${isMobileDevice
          ? 'text-xs sm:text-sm'
          : 'text-base'
          }`}>
          {product.description}
        </p>
      </div>

      {/* Discover badge - caché sur petit mobile */}
      {!isSmallMobile() && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileHover={isMobileDevice ? { opacity: 0 } : { opacity: 1, y: 0 }}
          className="absolute top-4 right-4 z-20 bg-cyan-600/90 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold"
          transition={{ duration: 0.3 }}
        >
          Découvrir →
        </motion.div>
      )}
    </motion.div>
  )
}

// ============ MODAL PRODUIT - OPTIMISÉE MOBILE ============
const ProductDetailModal = ({
  product,
  onClose,
  isMobileDevice
}: {
  product: Product
  onClose: () => void
  isMobileDevice: boolean
}) => {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id)
  const activeVariant = product.variants.find(v => v.id === activeVariantId)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none overflow-y-auto">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className={`w-full rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row pointer-events-auto my-auto ${isMobileDevice
            ? 'max-w-md sm:max-w-2xl max-h-[85vh]'
            : 'max-w-5xl max-h-[90vh]'
            }`}
        >
          {/* Image Section */}
          <div className={`bg-slate-900/50 flex items-center justify-center relative ${isMobileDevice
            ? 'w-full h-64 sm:h-80 lg:w-1/2 lg:h-auto lg:flex-1 lg:p-4 sm:p-6'
            : 'flex-1 p-8'
            }`}>
            {activeVariant && (
              <motion.img
                key={activeVariantId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={`/images/${activeVariant.image}`}
                alt={activeVariant.title}
                className={`object-contain ${isMobileDevice
                  ? 'max-h-64 sm:max-h-80'
                  : 'max-h-[70vh]'
                  }`}
              />
            )}

            {/* Thumbnails - Position adaptée */}
            {product.variants.length > 1 && (
              <div className={`absolute flex gap-2 sm:gap-3 bg-black/60 backdrop-blur-lg rounded-lg sm:rounded-xl border border-slate-700/50 ${isMobileDevice
                ? 'bottom-2 left-1/2 -translate-x-1/2 p-2 sm:p-3'
                : 'bottom-6 left-1/2 -translate-x-1/2 p-4'
                }`}>
                {product.variants.map(v => (
                  <motion.button
                    key={v.id}
                    onClick={() => setActiveVariantId(v.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-lg sm:rounded-xl overflow-hidden border-2 flex-shrink-0 ${v.id === activeVariantId
                      ? 'border-cyan-500 shadow-cyan-500/30'
                      : 'border-slate-600 opacity-60'
                      } ${isMobileDevice
                        ? 'w-10 h-10 sm:w-12 sm:h-12'
                        : 'w-16 h-16'
                      }`}
                  >
                    <img src={`/images/${v.image}`} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className={`flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/60 relative ${isMobileDevice
            ? 'w-full p-4 sm:p-6 lg:w-1/2'
            : 'flex-1 p-10'
            }`}>
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute p-2 sm:p-3 rounded-full bg-slate-900/60 border border-slate-700/50 hover:bg-slate-800/80 transition ${isMobileDevice
                ? 'top-3 right-3 sm:top-4 sm:right-4'
                : 'top-6 right-6'
                }`}
            >
              <X className={`text-slate-300 ${isMobileDevice ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-6 h-6'}`} />
            </button>

            {/* Content - Scroll optimisé */}
            <div className={`overflow-y-auto space-y-4 sm:space-y-6 ${isMobileDevice
                ? 'max-h-[calc(85vh-220px)] sm:max-h-[calc(85vh-200px)]'
                : 'max-h-[calc(90vh-160px)]'
              }`}>
              {activeVariant && (
                <>
                  {/* Header */}
                  <div className="pr-8">
                    <span className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-medium ${isMobileDevice
                      ? 'text-xs sm:text-sm'
                      : 'text-sm'
                      }`}
                      style={{
                        background: "hsl(187 60% 55% / 0.12)",
                        border: "1px solid hsl(187 60% 55% / 0.25)",
                        color: "hsl(187 60% 75%)",
                      }}>
                      Modèle sélectionné
                    </span>
                    <h2 className={`font-bold text-white leading-tight mt-2 sm:mt-3 ${isMobileDevice
                      ? 'text-lg sm:text-2xl'
                      : 'text-4xl md:text-5xl'
                      }`}>
                      {activeVariant.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className={`text-slate-300 leading-relaxed ${isMobileDevice
                    ? 'text-xs sm:text-sm'
                    : 'text-lg'
                    }`}>
                    {activeVariant.description}
                  </p>

                  {/* Features */}
                  {activeVariant.features && activeVariant.features.length > 0 && (
                    <div className="space-y-3">
                      <h3 className={`font-bold text-white ${isMobileDevice
                        ? 'text-base sm:text-lg'
                        : 'text-xl'
                        }`}>
                        Caractéristiques
                      </h3>
                      <AnimatePresence mode="wait">
                        {activeVariant.features.map((f, i) => (
                          <motion.div
                            key={`feat-${activeVariantId}-${i}`}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-start gap-2 sm:gap-3 text-slate-300"
                          >
                            <ChevronRight className={`text-cyan-400 flex-shrink-0 mt-0.5 ${isMobileDevice
                              ? 'w-4 h-4'
                              : 'w-5 h-5'
                              }`} />
                            <span className={isMobileDevice ? 'text-xs sm:text-sm' : 'text-sm'}>
                              {f}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CTA Buttons - Stack sur mobile */}
            <div className={`mt-6 sm:mt-8 space-y-2 sm:space-y-3 ${isMobileDevice ? 'pt-4 border-t border-slate-800/60' : ''}`}>
              <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg transition hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base">
                <ShoppingCart className={isMobileDevice ? 'w-4 h-4' : 'w-5 h-5'} />
                Demander un devis
              </button>
              <button className="w-full border border-slate-600 hover:border-cyan-500 text-white font-semibold rounded-lg transition hover:bg-cyan-500/5 active:scale-95 flex items-center justify-center gap-2 py-2.5 sm:py-3 text-sm sm:text-base">
                <MessageSquare className={isMobileDevice ? 'w-4 h-4' : 'w-5 h-5'} />
                Contacter un expert
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

const InfiniteCarousel = ({
  children,
  isMobileDevice
}: {
  children: React.ReactNode
  isMobileDevice: boolean
}) => {
  return (
    <div className={`relative w-full ${isMobileDevice ? 'py-8 sm:py-12' : 'py-16'}`}>
      {/* Mobile: Scrollable container */}
      {isMobileDevice ? (
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide px-4 sm:px-8">
          <div className="flex gap-4 sm:gap-8 pb-4">
            {children}
          </div>
        </div>
      ) : (
        /* Desktop: Infinite animation */
        <motion.div
          className="flex gap-8 px-8 overflow-hidden"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {children}
          {children}
        </motion.div>
      )}

      {/* Hint text pour mobile */}
      {isMobileDevice && (
        <p className="text-center text-xs text-gray-500 mt-4">
          Glissez pour voir plus →
        </p>
      )}
    </div>
  )
}

// ============ MAIN SECTION ============
export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [isSmall, setIsSmall] = useState(false)

  const selectedProduct = products.find(p => p.id === selectedId)

  useEffect(() => {
    setIsMobileDevice(isMobile())
    setIsSmall(isSmallMobile())

    const handleResize = () => {
      setIsMobileDevice(isMobile())
      setIsSmall(isSmallMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black via-slate-950 to-black"
      id="products"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium mb-4 sm:mb-6 ${isSmall ? 'text-xs' : 'text-sm'
              }`}
            style={{
              background: "hsl(187 60% 55% / 0.12)",
              border: "1px solid hsl(187 60% 55% / 0.25)",
              color: "hsl(187 60% 72%)",
            }}
          >
            Nos Produits
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`font-bold mb-4 sm:mb-6 leading-tight ${isSmall
              ? 'text-2xl sm:text-3xl'
              : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
              }`}
          >
            <span className="text-white">Solutions complètes</span>
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              pour votre bien-être
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`text-slate-400 max-w-2xl mx-auto leading-relaxed ${isSmall
              ? 'text-xs sm:text-sm'
              : 'text-base sm:text-lg md:text-xl'
              }`}
          >
            Découvrez notre gamme d'équipements médicaux et de solutions de suivi adaptées à chaque besoin de santé.
          </motion.p>
        </div>

        {/* Carousel */}
        <InfiniteCarousel isMobileDevice={isMobileDevice}>
          {products.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <ProductCard
                product={product}
                onClick={() => setSelectedId(product.id)}
                isMobileDevice={isMobileDevice}
              />
            </motion.div>
          ))}
        </InfiniteCarousel>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedId(null)}
            isMobileDevice={isMobileDevice}
          />
        )}
      </AnimatePresence>
    </section>
  )
}