"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import rawProducts from "@/data/products.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  descripcion: string;
  price: number | null;
  image: string;
  categoria: string;
  genero: "mujer" | "hombre";
}

const products = rawProducts as Product[];

export default function HomePage() {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria") || "";
  const generoParam = searchParams.get("genero") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = products
    .filter((p) => (categoriaParam ? p.categoria === categoriaParam : true))
    .filter((p) => (generoParam ? p.genero === generoParam : true));

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoriaParam, generoParam]);

  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">Nuestra Colección</h1>
          <p className="text-gray-700 text-lg">
            {categoriaParam && generoParam
              ? `Mostrando categoría: ${categoriaParam}, género: ${generoParam}`
              : categoriaParam
              ? `Mostrando categoría: ${categoriaParam}`
              : generoParam
              ? `Mostrando género: ${generoParam}`
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

        <nav aria-label="Paginación" className="mt-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Siguiente
            </button>
          </div>
          <div className="overflow-x-auto">
            <ul className="inline-flex space-x-2 pb-1 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      page === currentPage
                        ? "bg-[#E6D7B6] text-black"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </main>
  );
}
