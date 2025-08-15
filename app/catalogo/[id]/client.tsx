"use client"

import type React from "react"

import { Check, Heart, Phone, Share2, Truck, Shield, Battery, Zap, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { some } from "lodash"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VariantSelector from "./variant-selector"
import type { Publicacion, Variante } from "@/types/main"
import { toggleFavProduct } from "@/store/reducers/user"
import type { RootState } from "@/store"

interface Props {
    producto: Publicacion
}

export default function ProductDetailPage({ producto }: Props) {
    const params = useParams()
    const id = params.id as string
    const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
    const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined)
    const { favProducts } = useSelector((state: RootState) => state.user)
    const isFavorite = some(favProducts, (productId) => productId === producto.id)

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: producto?.titulo,
                    text: producto?.subtitulo,
                    url: window.location.href,
                })
            } catch (err) {
                console.log("Error sharing:", err)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
        }
    }

    const handleVariantChange = (variant: Variante | null, selectedOptions: Record<string, string>) => {
        setSelectedVariant(variant)
        if (variant?.imagen?.url) {
            setCurrentImageUrl(variant.imagen.url)
        } else if (producto?.imagenes[0]?.url) {
            setCurrentImageUrl(producto.imagenes[0].url)
        } else {
            setCurrentImageUrl("/placeholder.svg")
        }
    }

    useEffect(() => {
        if (producto) {
            if (producto.variantes.length > 0) {
                const defaultVariant = producto.variantes[0]
                setSelectedVariant(defaultVariant)
                setCurrentImageUrl(defaultVariant.imagen?.url || producto.imagenes[0]?.url || "/placeholder.svg")
            } else if (producto.imagenes.length > 0) {
                setCurrentImageUrl(producto.imagenes[0].url)
            } else {
                setCurrentImageUrl("/placeholder.svg")
            }
        }
    }, [producto])

    const dispatch = useDispatch()
    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleFavProduct({ id: producto.id }))
    }

    const displayPrice = selectedVariant?.precio || null
    const hasVariantWithoutPrice = selectedVariant && (selectedVariant.precio === 0 || selectedVariant.precio === null)

    const categoriaPrincipal = producto.categorias[0]?.categoria?.nombre || "Baterías"

    return (
        <div className="min-h-screen bg-transparent relative font-inter">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.03),transparent_50%)] pointer-events-none" />

            <div className="relative z-20">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-600 bg-white/40 backdrop-blur-sm px-3 py-2  border border-yellow-200/30 w-fit">
                        <Link href="/" className="hover:text-amber-600 transition-colors font-medium">
                            Inicio
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/catalogo" className="hover:text-amber-600 transition-colors font-medium">
                            Catálogo
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-amber-600 font-semibold">{producto.titulo}</span>
                    </div>
                </div>

                {/* Product Details */}
                <section className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Images */}
                        <div className="space-y-6">
                            <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-transparent shadow-xl border border-yellow-200/30 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 to-yellow-100/10" />
                                <Image
                                    src={currentImageUrl || "/placeholder.svg"}
                                    alt={selectedVariant?.titulo || producto.titulo}
                                    width={500}
                                    height={400}
                                    className="object-cover w-full h-full relative z-10 group-hover:scale-105 transition-transform duration-500"
                                />
                              
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex space-x-3 justify-center">
                                {producto.imagenes.map((imagen, index) => (
                                    <button
                                        key={imagen.id}
                                        onClick={() => setCurrentImageUrl(imagen.url)}
                                        className={`w-20 h-20  overflow-hidden border-3 transition-all duration-300 hover:scale-110 ${currentImageUrl === imagen.url
                                                ? "border-amber-400 shadow-lg shadow-amber-400/30 scale-105"
                                                : "border-gray-200 hover:border-amber-300 bg-white"
                                            }`}
                                    >
                                        <Image
                                            src={imagen.url || "/placeholder.svg"}
                                            alt={`${producto.titulo} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-8">
                            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-yellow-200/30">
                                <Badge
                                    variant="outline"
                                    className="mb-3 border-amber-400 text-amber-600 bg-amber-50/50 px-2 py-1 text-xs"
                                >
                                    <Battery className="w-3 h-3 mr-1" />
                                    {categoriaPrincipal}
                                </Badge>
                                <h1 className="text-2xl font-bold mb-2 text-gray-800 leading-tight">{producto.titulo}</h1>
                                {producto.subtitulo && <p className="text-base text-gray-600 mb-3 font-medium">{producto.subtitulo}</p>}
                                <p className="text-sm leading-relaxed text-gray-700">{producto.descripcion}</p>
                            </div>

                            {/* Variant Selector */}
                            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-yellow-200/30">
                                <VariantSelector
                                    opciones={producto.opciones}
                                    variantes={producto.variantes}
                                    onVariantChange={handleVariantChange}
                                />
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between">
                                        {hasVariantWithoutPrice ? (
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold">No existe precio para esta variante</span>
                                                <span className="text-amber-100 text-xs font-medium">
                                                    Contacta para consultar disponibilidad
                                                </span>
                                            </div>
                                        ) : displayPrice !== null ? (
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-bold">BOB {displayPrice.toLocaleString()}</span>
                                                <span className="text-amber-100 text-xs font-medium">
                                                    {!selectedVariant ? "Selecciona una variante" : "Variante seleccionada"}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-2xl font-bold">Consultar precio</span>
                                        )}
                                        <div className="bg-white/20 backdrop-blur-sm  p-3">
                                            <Zap className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-yellow-200/30 space-y-4">
                                <h3 className="text-base font-bold text-gray-800 flex items-center">
                                    <Shield className="w-4 h-4 mr-2 text-amber-500" />
                                    Especificaciones Técnicas
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {producto.caracteristicas.slice(0, 4).map((caracteristica) => (
                                        <div
                                            key={caracteristica.id}
                                            className="flex items-center bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-3  border border-amber-200/30"
                                        >
                                            <div className="bg-green-500  p-1 mr-3">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-700 text-xs">
                                                <span className="text-amber-600 font-semibold">{caracteristica.nombre}:</span>{" "}
                                                {caracteristica.valor}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <Button
                                        asChild
                                        className="flex-1 text-sm py-4 bg-gradient-to-r from-amber-500 to-primary hover:to-yellow-600 text-white font-bold shadow-xl border-0 "
                                    >
                                        <Link
                                            href={`https://wa.me/59169848691?text=${encodeURIComponent(
                                                `Hola VOLTANA, estoy interesado en la batería "${producto.titulo}" https://voltana-bo.vercel.app/catalogo/${producto.url || producto.id}. ¿Estoy información?`,
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Phone className="w-4 h-4 mr-2" />
                                            Hablar por Whatsapp
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={handleToggleFavorite}
                                        className={`px-5 py-5  border-2 transition-all duration-300 ${isFavorite
                                                ? "bg-red-50 border-red-300 text-red-500 hover:bg-red-100"
                                                : "bg-white/50 border-gray-300 text-gray-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50"
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleShare}
                                        size="lg"
                                        className="px-5 py-5  border-2 bg-white/50 border-gray-300 text-gray-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Guarantees */}
                            <div className="grid grid-cols-3 gap-4 pt-6">
                                <div className="text-center bg-white/50 backdrop-blur-sm p-3  shadow-md border border-green-200/30 hover:shadow-lg transition-all duration-300">
                                    <div className="bg-green-100 rounded-md  w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-700">Entrega segura</p>
                                </div>
                                <div className="text-center bg-white/50 backdrop-blur-sm p-3  shadow-md border border-amber-200/30 hover:shadow-lg transition-all duration-300">
                                    <div className="bg-amber-100 rounded-md  w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                        <Truck className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-700">Entrega personal</p>
                                </div>
                                <div className="text-center bg-white/50 backdrop-blur-sm p-3  shadow-md border border-blue-200/30 hover:shadow-lg transition-all duration-300">
                                    <div className="bg-blue-100 rounded-md w-10 h-10 flex items-center justify-center mx-auto mb-2">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-700">Pago previo del 50%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="mt-20">
                        <Tabs defaultValue="descripcion" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm border border-yellow-200/30  p-1 shadow-md h-12">
                                <TabsTrigger
                                    value="descripcion"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold text-sm h-10"
                                >
                                    Descripción
                                </TabsTrigger>
                                <TabsTrigger
                                    value="especificaciones"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold text-sm h-10"
                                >
                                    Especificaciones
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="descripcion" className="mt-8">
                                <Card className="bg-white/50 backdrop-blur-sm border border-yellow-200/30 shadow-xl rounded-3xl overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="prose prose-slate max-w-none">
                                            {producto.descripcion ? (
                                                <p className="leading-relaxed whitespace-pre-line text-gray-700 text-sm">
                                                    {producto.descripcion}
                                                </p>
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">
                                                    No hay descripción disponible para este producto.
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="especificaciones" className="mt-8">
                                <Card className="bg-white/50 backdrop-blur-sm border border-yellow-200/30 shadow-xl rounded-3xl overflow-hidden">
                                    <CardContent className="p-6">
                                        {producto.caracteristicas && producto.caracteristicas.length > 0 ? (
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {producto.caracteristicas.map((caracteristica) => (
                                                    <div
                                                        key={caracteristica.id}
                                                        className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-amber-50/50 to-yellow-50/50  border border-amber-200/30"
                                                    >
                                                        <span className="font-semibold text-amber-600 text-xs">{caracteristica.nombre}:</span>
                                                        <span className="text-gray-700 font-medium text-xs">{caracteristica.valor}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">
                                                No hay especificaciones técnicas disponibles para este producto.
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </div>
        </div>
    )
}
