import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Battery, Zap, Truck, Shield, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return (
        <>
            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.05),transparent_50%)]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <Badge variant="secondary" className="">
                                    <Battery className="w-4 h-4 mr-2" />
                                    Energiza tu Mundo con Confianza
                                </Badge>

                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                        <span className="text-primary">Voltana</span>
                                        <br />
                                        <span className="text-foreground/80 text-3xl md:text-4xl lg:text-5xl font-medium">
                                            Baterías y mucho más
                                        </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                                        Descubre nuestra gama completa de baterías de distintas marcas <span className="text-primary font-semibold"> Potencia garantizada </span>
                                        para cada necesidad.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/catalogo">
                                        <Button
                                            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4  font-semibold"
                                        >
                                            Explorar Catálogo
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Truck className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Entregas Personales</p>
                                            <p className="text-xs text-muted-foreground">Cuando lo necesites</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Shield className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Baterías nuevas </p>
                                            <p className="text-xs text-muted-foreground">100% seguras</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <Award className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Mucha variedad</p>
                                            <p className="text-xs text-muted-foreground">Busca cual más te guste</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative lg:pl-8">
                                <div className="relative">
                                    {/* Elemento decorativo de fondo */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl"></div>

                                    <div className="relative w-full h-96 rounded-2xl overflow-hidden group shadow-2xl border border-border/20">
                                        <Image
                                            src="/fondo.jpeg"
                                            alt="Voltana - Tienda Premium de Baterías"
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center justify-between">

                                                <div className="flex space-x-2">
                                                    <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                                                    <div className="w-2 h-2 bg-primary-foreground/70 rounded-full animate-pulse delay-100"></div>
                                                    <div className="w-2 h-2 bg-primary-foreground/50 rounded-full animate-pulse delay-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-lg">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs font-medium">En línea</span>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-primary">98%</p>
                                            <p className="text-xs text-muted-foreground">Satisfacción</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
