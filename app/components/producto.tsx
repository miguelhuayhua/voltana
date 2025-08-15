"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Publicacion } from "@/types/main"
import Image from "next/image"
import { Eye, Heart, Zap, Battery, Shield } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { some } from "lodash"
import type { RootState } from "@/store"
import { toggleFavProduct } from "@/store/reducers/user"

interface Props {
  producto: Publicacion
}

export default function ProductoBateria({ producto }: Props) {
  // Obtener el precio más bajo de las variantes
  const precioMinimo = producto.variantes.length > 0 ? Math.min(...producto.variantes.map((v) => v.precio)) : 0
  const { favProducts } = useSelector((state: RootState) => state.user)
  const isFavorite = some(favProducts, (productId) => productId === producto.id)
  const dispatch = useDispatch()

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavProduct({ id: producto.id }))
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200/60 transition-all duration-300 hover:border-amber-300/60 hover:shadow-xl hover:shadow-amber-100/50 group cursor-pointer relative overflow-hidden">
      {/* Wishlist Button */}
      <Button
        onClick={handleToggleFavorite}
        variant="ghost"
        size="icon"
        className={`absolute rounded-full top-3 right-3 z-10 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm ${
          isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-600 hover:text-red-500"
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
      </Button>


      <CardHeader className="p-0">
        <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-primary/30 to-secondary">
          <Image
            src={
              producto.imagenes.find((img) => img.orden === 0)?.url ||
              producto.imagenes[0]?.url ||
              "/placeholder.svg?height=200&width=300&query=car battery automotive"
            }
            alt={producto.titulo}
            width={300}
            height={200}
            className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>

      <CardContent className="px-3">
        {/* Categories */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-wrap gap-1">
            {producto.categorias.slice(0, 2).map((cat, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"
              >
                <Battery className="w-3 h-3 mr-1" />
                {cat.categoria?.nombre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Title */}
        <Link href={`/catalogo/${producto.id}`}>
          <CardTitle className="text-base mb-2 transition-colors duration-300 leading-tight text-slate-800 group-hover:text-amber-700 font-semibold">
            {producto.titulo}
          </CardTitle>
        </Link>

        {/* Subtitle */}
        {producto.subtitulo && (
          <p className="text-sm mb-3 font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md">
            {producto.subtitulo}
          </p>
        )}

        {/* Description */}
        <p className="text-xs mb-4 line-clamp-2 text-slate-600 leading-relaxed">{producto.descripcion}</p>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 mb-4 border border-amber-100">
          <div className="flex items-center space-x-2">
            {producto.variantes.length > 0 ? (
              <>
                <span className="text-xl font-bold text-amber-700">
                  {precioMinimo ? `BOB ${precioMinimo}` : "Cotizable"}
                </span>
                {producto.variantes.length > 1 && precioMinimo > 0 && (
                  <span className="text-xs text-slate-500">
                    hasta BOB {producto.variantes.sort((a, b) => b.precio - a.precio)[0]?.precio}
                  </span>
                )}
              </>
            ) : (
              <span className="text-lg font-bold text-amber-700">Consultar precio</span>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2 mb-4">
          {producto.caracteristicas.slice(0, 2).map((caracteristica, j) => (
            <div key={j} className="flex items-center text-xs bg-green-50 px-2 py-1 rounded-md">
              <Shield className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
              <span className="text-green-800">
                <span className="font-medium">{caracteristica.nombre}:</span> {caracteristica.valor}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-3 bg-slate-200" />

        {/* Variants Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
            <span className="font-bold text-amber-600">{producto.variantes.length}</span>{" "}
            {producto.variantes.length > 1 ? "variantes" : "variante"}
          </span>
         
        </div>

        {/* Action Button */}
        <Link href={`/catalogo/${producto.id}`} className="block">
          <Button
            size="sm"
            className="w-full text-sm bg-gradient-to-r from-primary to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium shadow-md hover:shadow-lg mb-3 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
