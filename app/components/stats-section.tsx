import { Progress } from "@/components/ui/progress"
import { Battery, Shield, Truck, Star } from "lucide-react"

const stats = [
  {
    numero: "150+",
    etiqueta: "Clientes Satisfechos",
    progress: 85,
    icon: Star,
    descripcion: "En nuestros primeros meses",
  },
  {
    numero: "25+",
    etiqueta: "Marcas Disponibles",
    progress: 90,
    icon: Battery,
    descripcion: "Las mejores del mercado",
  },
  {
    numero: "12",
    etiqueta: "Meses de Garantía",
    progress: 100,
    icon: Shield,
    descripcion: "En todas nuestras baterías",
  },
  {
    numero: "98%",
    etiqueta: "Entregas a Tiempo",
    progress: 98,
    icon: Truck,
    descripcion: "Puntualidad garantizada",
  },
]

export default function StatSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Voltana en Números</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aunque somos una tienda nueva, ya estamos marcando la diferencia en el mercado boliviano de baterías
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((estadistica, i) => {
            const IconComponent = estadistica.icon
            return (
              <div
                key={i}
                className="group relative bg-card rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl font-bold text-primary">{estadistica.numero}</div>
                    <div className="font-semibold text-foreground">{estadistica.etiqueta}</div>
                    <div className="text-sm text-muted-foreground">{estadistica.descripcion}</div>
                  </div>

                  <div className="w-full">
                    <Progress value={estadistica.progress} className="h-2 bg-secondary/20" />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground italic">
            "Construyendo confianza una batería a la vez" - Voltana Bolivia
          </p>
        </div>
      </div>
    </section>
  )
}
