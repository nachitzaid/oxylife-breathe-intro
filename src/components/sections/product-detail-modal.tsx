"use client"

import { motion } from "framer-motion"
import { X, ShoppingCart, MessageSquare, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
}

export const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id)
  const activeVariant = product.variants.find((v) => v.id === activeVariantId)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-xl"
      />
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
        <motion.div
          layoutId={`card-${product.id}`}
          className="w-full max-w-6xl h-full max-h-[850px] overflow-hidden rounded-[3rem] bg-card border border-border shadow-2xl pointer-events-auto relative flex flex-col md:flex-row"
        >
          {/* Image Panel */}
          <div className="relative flex-1 bg-muted/20 overflow-hidden flex flex-col">
            <div className="absolute top-8 left-8 z-30">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-1">{product.title}</h2>
              <p className="text-xl text-primary font-bold">{product.description}</p>
            </div>

            <div className="flex-1 relative">
              <img
                src={`/.jpg?height=1200&width=1200&query=${encodeURIComponent(activeVariant?.image || "")}`}
                alt={activeVariant?.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-8 inset-x-0 flex justify-center gap-4 z-30">
              <div className="bg-background/40 backdrop-blur-2xl border border-white/10 p-3 rounded-[2rem] flex gap-3 shadow-2xl">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setActiveVariantId(variant.id)}
                    className={cn(
                      "relative w-16 h-16 rounded-2xl overflow-hidden transition-all duration-300",
                      activeVariantId === variant.id ? "ring-2 ring-primary scale-110" : "opacity-60",
                    )}
                  >
                    <img
                      src={`/.jpg?height=100&width=100&query=${encodeURIComponent(variant.image)}`}
                      alt={variant.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Panel */}
          <div className="w-full md:w-[420px] bg-card p-10 flex flex-col border-l border-border/50">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-1">Sélection</h4>
                <h3 className="text-3xl font-bold">{activeVariant?.title}</h3>
              </div>
              <p className="text-muted-foreground text-lg">{activeVariant?.description}</p>

              <div className="grid grid-cols-2 gap-3">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Demander un devis
              </Button>
              <Button variant="outline" className="w-full h-16 rounded-2xl text-lg font-bold bg-transparent">
                <MessageSquare className="mr-2 w-5 h-5" />
                Contacter un expert
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
