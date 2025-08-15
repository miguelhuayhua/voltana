import { Battery, MapPin, Star, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export default function FeatureSection() {
  return (
    <section className="py-16 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up text-primary">
            ¿Por Qué Elegir Voltana Bolivia?
          </h2>
          <p className="text-base animate-fade-in-up animation-delay-200 font-medium">
            Las mejores baterías del mercado boliviano con garantía y calidad
          </p>
        </div>
        <div className="grid md:grid-cols-3  gap-6">
          {[
            {
              icon: Battery,
              titulo: "Baterías Originales",
              descripcion: "Solo marcas reconocidas con certificación de calidad",
            },
            {
              icon: MapPin,
              titulo: "Entrega en Bolivia",
              descripcion: "Cobertura nacional en principales ciudades",
            },
            
            {
              icon: Zap,
              titulo: "Asesoría Técnica",
              descripcion: "Te ayudamos a elegir la batería perfecta",
            },
          ].map((caracteristica, i) => (
            <Card
              key={i}
              className={`bg-white/90 backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 group animate-slide-in-up hover:shadow-lg`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardContent className="p-4">
                <caracteristica.icon className={`w-8 h-8 mx-auto mb-3 group-hover:animate-bounce text-primary`} />
                <h3 className="text-sm font-semibold mb-2">{caracteristica.titulo}</h3>
                <p className="text-xs font-medium leading-relaxed">{caracteristica.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
