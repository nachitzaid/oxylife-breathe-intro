"use client"

import { motion } from "framer-motion"
import { X, ShoppingCart, MessageSquare, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"
import { useState, useEffect } from "react"

// Composant Typewriter pour l'effet d'écriture
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("")
  
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [text])

  return <span>{displayText}<span className="animate-pulse">|</span></span>
}

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
}

export const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id)
  const activeVariant = product.variants.find((v) => v.id === activeVariantId)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const buttonVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "backOut" } },
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-2xl"
      />
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 pointer-events-none overflow-y-auto">
        <motion.div
          layoutId={`card-${product.id}`}
          className="w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-[3rem] bg-card border border-border shadow-2xl pointer-events-auto flex flex-col lg:flex-row"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image + Miniatures */}
          <div className="relative flex-1 bg-muted/10 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-10 left-10 z-20 max-w-md"
            >
              <h2 className="text-5xl font-black tracking-tighter mb-3">
                <TypewriterText text={product.title} />
              </h2>
              <p className="text-2xl font-bold text-primary">
                <TypewriterText text={product.description} />
              </p>
            </motion.div>

            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              src={`/images/${activeVariant?.image}`}
              alt={activeVariant?.title}
              className="w-full h-full object-contain lg:object-cover"
            />

            {/* Miniatures avec animation */}
            {product.variants.length > 1 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
              >
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 p-4 rounded-3xl flex gap-4 shadow-2xl">
                  {product.variants.map((variant, i) => (
                    <motion.button
                      key={variant.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      onClick={() => setActiveVariantId(variant.id)}
                      className={`
                        w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all
                        ${activeVariantId === variant.id 
                          ? "border-primary scale-110 shadow-lg" 
                          : "border-transparent opacity-70 hover:opacity-100"}
                      `}
                    >
                      <img
                        src={`/images/${variant.image}`}
                        alt={variant.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Contenu texte avec animations variées */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-96 bg-card p-10 flex flex-col border-t lg:border-t-0 lg:border-l border-border/50"
          >
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-8 right-8 rounded-full z-10">
              <X className="w-6 h-6" />
            </Button>

            <div className="flex-1 space-y-8 mt-6 overflow-y-auto">
              <motion.div variants={itemVariants}>
                <span className="text-sm font-black text-primary uppercase tracking-widest">Modèle sélectionné</span>
                <h3 className="text-3xl font-bold mt-1">{activeVariant?.title}</h3>
              </motion.div>

              <motion.p variants={itemVariants} className="text-muted-foreground text-lg leading-relaxed">
                {activeVariant?.description}
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <h4 className="font-semibold text-xl">Caractéristiques principales</h4>
                {product.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Boutons qui montent du bas */}
            <motion.div 
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 mt-10"
            >
              <Button size="lg" className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl">
                <ShoppingCart className="mr-3 w-6 h-6" />
                Demander un devis
              </Button>
              <Button size="lg" variant="outline" className="w-full h-16 rounded-2xl text-lg font-bold">
                <MessageSquare className="mr-3 w-6 h-6" />
                Contacter un expert
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}