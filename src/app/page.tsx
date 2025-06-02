"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import rawProducts from "@/data/products.json"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  descripcion: string
  price: number | null
  image: string
  categoria: string
}

const products = rawProducts as Product[]

export default function HomePage() {
  const searchParams = useSearchParams()
  const categoriaParam = searchParams.get("categoria") || ""

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const filtered = categoriaParam
    ? products.filter((p) => p.categoria === categoriaParam)
    : products

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [categoriaParam])

  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">Nuestra Colección</h1>
          <p className="text-gray-700 text-lg">
            {categoriaParam
              ? `Mostrando categoría: ${categoriaParam}`
              : "Explora nuestras piezas exclusivas."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((item) => (
            <Card
              key={item.id}
              className="bg-white border border-gray-200 hover:border-[#E6D7B6] transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-900 font-medium mb-1">{item.name}</h3>
                  
                  <span className="text-black font-bold text-lg">
                    {item.price !== null ? `$${item.price}` : "—"}
                  </span>

                  <Link href={`/producto/${item.id}`}>
                    <Button className="mt-4 w-full bg-[#E6D7B6] text-black font-medium hover:bg-[#cebfa6] transition-colors">
                      Ver Más
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <nav aria-label="Paginación" className="flex justify-center mt-8">
          <ul className="inline-flex -space-x-px">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page}>
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border ${
                    page === currentPage
                      ? "bg-[#E6D7B6] text-black border-[#E6D7B6]"
                      : "bg-white text-[#E6D7B6] border-gray-200 hover:bg-gray-100"
                  } first:rounded-l last:rounded-r`}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}
