"use client"
import "keen-slider/keen-slider.min.css"

import { StarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useKeenSlider } from "keen-slider/react"

const testimonios = [
  {
    nombre: "Carlos Mayta",
    ubicacion: "Transportista - Via La Paz–Oruro",
    texto:
      "Se me descargó la batería del camión camino a Patacamaya. Llamé a Voltana y en menos de dos horas me trajeron una nueva hasta la carretera. Gracias a eso pude llegar a destino sin perder el viaje.",
    producto: "Batería para camión",
    avatar: "CM",
    rating: 5,
  },
  {
    nombre: "María Muñoz",
    ubicacion: "Taxista - Villa Fátima",
    texto:
      "Hace 8 meses compré mi batería aquí y sigue funcionando como nueva. El precio estaba más barato que en la Uyustus y la garantía me da confianza para trabajar sin preocuparme.",
    producto: "Batería automotriz",
    avatar: "MM",
    rating: 5,
  },
  {
    nombre: "Roberto Vizcarra",
    ubicacion: "Taller mecánico - Sopocachi",
    texto:
      "En mi taller siempre uso baterías de Voltana para los clientes. Son originales y duran bastante, incluso con el frío de La Paz. El servicio técnico es rápido y confiable.",
    producto: "Baterías variadas",
    avatar: "RV",
    rating: 5,
  },
  {
    nombre: "Ana Chipana",
    ubicacion: "Oficina - Miraflores",
    texto:
      "Necesitaba una batería UPS para que no se apague mi computadora cuando se corta la luz. Me asesoraron bien, el precio fue justo y la instalación fue al instante.",
    producto: "Batería UPS",
    avatar: "AC",
    rating: 5,
  },
  {
    nombre: "Luis Callisaya",
    ubicacion: "Motociclista - San Miguel",
    texto:
      "Mi moto no arrancaba y era la batería. En Voltana tenían justo el modelo, me la cambiaron ahí mismo y hasta me dieron consejos para que dure más.",
    producto: "Batería para moto",
    avatar: "LC",
    rating: 5,
  },
  {
    nombre: "Patricia Huanca",
    ubicacion: "Ama de casa - Calacoto",
    texto:
      "Compré una batería para el auto familiar. Me explicaron todo el cuidado que debo darle y cómo arrancar si se descarga. Muy atentos y profesionales.",
    producto: "Batería automotriz",
    avatar: "PH",
    rating: 5,
  },
  {
    nombre: "Javier Ticona",
    ubicacion: "Delivery - La Ceja",
    texto:
      "Trabajo en delivery y necesito que mi moto esté lista todos los días. La batería que compré aquí ya lleva 6 meses sin darme ningún problema.",
    producto: "Batería para moto",
    avatar: "JT",
    rating: 5,
  },
  {
    nombre: "Sandra Flores",
    ubicacion: "Empresaria - Zona Sur",
    texto:
      "Tengo una flota de 5 autos y siempre compro baterías en Voltana. El precio por mayor es buenísimo y siempre entregan a tiempo.",
    producto: "Baterías para flota",
    avatar: "SF",
    rating: 5,
  },
  {
    nombre: "Miguel Poma",
    ubicacion: "Técnico - Centro La Paz",
    texto:
      "Como técnico en electrónica, busco baterías que no me dejen mal con los clientes. Aquí encuentro variedad y buena calidad.",
    producto: "Baterías especializadas",
    avatar: "MP",
    rating: 5,
  },
  {
    nombre: "Elena Choque",
    ubicacion: "Estudiante - UMSA",
    texto:
      "Mi laptop necesitaba batería nueva y no tenía mucho presupuesto. Aquí encontré una buena opción, barata y con garantía. Me explicaron todo con paciencia.",
    producto: "Batería para laptop",
    avatar: "EC",
    rating: 5,
  },
];


export default function TestimonialSection() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 40,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 28,
        },
      },
    },
  })

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Lo que dicen nuestros clientes</h2>
          <div className="flex justify-center mb-6 items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">4.9/5 basado en +500 reseñas</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cientos de bolivianos confían en Voltana para energizar sus vehículos y equipos
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonios.map((testimonio, i) => (
            <div key={i} className="keen-slider__slide">
              <Card className="bg-card/80 backdrop-blur-sm  transition-all duration-300 hover:scale-105 hover:shadow-xl border h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-3 w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                        {testimonio.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonio.nombre}</p>
                      <p className="text-sm text-muted-foreground">{testimonio.ubicacion}</p>
                      <div className="flex mt-1">
                        {[...Array(testimonio.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground italic">
                    "{testimonio.texto}"
                  </blockquote>

                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  >
                    ⚡ {testimonio.producto}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ¿Quieres ser el próximo cliente satisfecho?
            <span className="text-primary font-medium ml-1">¡Contáctanos hoy!</span>
          </p>
        </div>
      </div>
    </section>
  )
}
