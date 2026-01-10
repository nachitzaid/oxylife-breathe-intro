"use client"

import { motion } from "motion/react"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.05,
      y: -12,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.8,
      },
    },
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <motion.div
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="group relative h-[480px] w-[380px] cursor-pointer overflow-hidden rounded-3xl bg-card border border-border/30 hover:border-primary/60 transition-all shadow-2xl flex-shrink-0"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`} />
        <motion.img
          src={`/images/${product.variants[0].image}`}
          alt={product.title}
          className="h-full w-full object-cover"
          variants={imageVariants}
          initial="rest"
          whileHover="hover"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="relative z-10 p-10 flex flex-col justify-end h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent backdrop-blur-sm">
        <motion.div initial={{ y: 10, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <h3 className="text-4xl font-black mb-3 tracking-tight text-white drop-shadow-lg">{product.title}</h3>
          <p className="text-lg font-medium text-white/90 drop-shadow-md">{product.description}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-6 right-6 z-20 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-bold"
        transition={{ duration: 0.3 }}
      >
        Découvrir →
      </motion.div>
    </motion.div>
  )
}
