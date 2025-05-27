// src/app/page.tsx
"use client"

import Image from "next/image"
import { Facebook, Instagram, MessageCircle, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const jewelryItems = [
  {
    id: 1,
    name: "Anillo de Compromiso Diamante",
    price: "$2,500",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Collar de Perlas Elegante",
    price: "$850",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Aretes de Oro Blanco",
    price: "$1,200",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Pulsera de Diamantes",
    price: "$3,200",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Reloj de Lujo Dorado",
    price: "$4,500",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Cadena de Plata Premium",
    price: "$680",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Anillo de Esmeralda",
    price: "$1,800",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Conjunto de Joyas Nupciales",
    price: "$5,500",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
     

      {/* Jewelry Catalog */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-yellow-400 mb-4">Nuestra Colección</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Descubre nuestra exquisita selección de joyas de alta calidad, diseñadas para momentos especiales
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jewelryItems.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-yellow-400 font-bold text-lg">{item.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium transition-all duration-300 transform hover:scale-105">
                      Ver Más
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg">
          <MessageCircle className="w-6 h-6" />
          <span className="ml-2 hidden sm:inline">Escríbenos por WhatsApp</span>
        </Button>
      </div>
    </div>
  )
}
