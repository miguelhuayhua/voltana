"use client"
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import type { Categoria } from "@/types/main"

export default function Footer() {
  const enlaces = ["nosotros", "contacto", "servicios"]
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    fetch("https://uayua.com/uayua/api/categorias/getall?fields=nombre,id,ruta", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
      },
    })
      .then((res) => res.json())
      .then(setCategorias)
  }, [])

  const [colecciones, setColecciones] = useState<Categoria[]>([])

  useEffect(() => {
    fetch("https://uayua.com/uayua/api/colecciones/getall?fields=nombre,id,ruta", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUATOKEN}`,
      },
    })
      .then((res) => res.json())
      .then(setColecciones)
  }, [])

  return (
    <footer className="bg-secondary/30 py-12 border-t ">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-4">

              <Image
                src="/logo.png"
                alt="VOLTANA Logo"
                width={70}
                height={30}
                className="object-contain w-30 h-full"
              />
            
            </div>
            <p className=" mb-4 text-sm font-medium leading-relaxed">
              Tu tienda especializada en baterías. Energía confiable.
            </p>
          
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wide">Negocio</h4>
            <ul className="space-y-3">
              {enlaces.map((enlace, j) => (
                <li key={j}>
                  <Link
                    href={`/#${enlace}`}
                    className="transition-all duration-300 text-sm font-medium hover:text-yellow-400 hover:translate-x-1 inline-block capitalize"
                  >
                    {enlace}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wide">Categorías</h4>
            <ul className="space-y-3">
              {categorias.map((categoria, j) => (
                <li key={j}>
                  <Link
                    href={`/catalogo?categoria=${categoria.ruta || categoria.id}`}
                    className="transition-all duration-300 text-sm font-medium hover:text-yellow-400 hover:translate-x-1 inline-block capitalize"
                  >
                    {categoria.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wide">Colecciones</h4>
            <ul className="space-y-3">
              {colecciones.map((coleccion, j) => (
                <li key={j}>
                  <Link
                    href={`/catalogo?coleccion=${coleccion.ruta || coleccion.id}`}
                    className="transition-all duration-300 text-sm font-medium hover:text-yellow-400 hover:translate-x-1 inline-block capitalize"
                  >
                    {coleccion.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-center  text-gray-400 animate-fade-in-up animation-delay-800 flex flex-col sm:flex-row justify-center items-center gap-2">
          <div className="flex items-center gap-2 font-bold text-sm text-yellow-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            VOLTANA
          </div>
          <p className="text-xs font-medium">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>

        <small className="flex gap-1 mt-2 text-gray-500 justify-center  items-center">
          <span>Powered by </span>
          <Image alt="logo" width={50} height={20} src="/light.png" className="mt-1" />
        </small>
      </div>
    </footer>
  )
}
