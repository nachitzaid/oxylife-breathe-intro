"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"
import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
  index: number
  total: number
  progress: MotionValue<number>
  onClick: () => void
}

export const ProductCard = ({ product, index, total, progress, onClick }: ProductCardProps) => {
  const columns = 3
  const col = index % columns
  const row = Math.floor(index / columns)

  const rotate = useTransform(progress, [0, 1], [-15 + (index * 30) / (total - 1), 0])
  const x = useTransform(progress, [0, 1], [0, (col - 1) * 450])
  const y = useTransform(progress, [0, 1], [0, row * 520])
  const scale = useTransform(progress, [0, 1], [0.9, 1])
  const opacity = useTransform(progress, [0, 0.3], [0.5 + index * 0.1, 1])

  return (
    <motion.div
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="group absolute h-[450px] w-[350px] cursor-pointer overflow-hidden rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/40 transition-colors shadow-2xl"
      style={{
        zIndex: total - index,
        x,
        y,
        rotate,
        scale,
        opacity,
        left: "50%",
        top: "50%",
        marginLeft: "-175px",
        marginTop: "-225px",
      }}
      whileHover={{ scale: 1.02, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    >
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-20`} />
        <img
          src={`/.jpg?height=800&width=800&query=${encodeURIComponent(product.variants[0].image)}`}
          alt={product.title}
          className="h-full w-full object-cover opacity-80 mix-blend-overlay"
        />
      </div>

      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/40 to-transparent">
        <h3 className="text-3xl font-bold mb-2 tracking-tight">{product.title}</h3>
        <p className="text-muted-foreground text-lg font-medium">{product.description}</p>
      </div>
    </motion.div>
  )
}
