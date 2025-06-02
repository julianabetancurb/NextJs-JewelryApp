// src/app/producto/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
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
}

export default function ProductDetailPage() {
  // Recoge el parámetro dinámico “id” de la URL
  const params = useParams();
  const id = params?.id as string;

  // Hacemos un estado local para el producto
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Convertimos el JSON a un array tipado
    const products = rawProducts as Product[];
    // Buscamos el producto cuyo id coincida
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      setProduct(null);
    }
  }, [id]);

  // Si todavía no hemos cargado (o no existe), podemos mostrar null o mensaje
  if (!product) {
    return (
      <main className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">Producto no encontrado.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Botón “Volver” — simplemente un enlace a la página principal */}
        

        {/* Tarjeta con detalle de producto */}
        <Card className="bg-white border border-gray-200 shadow-md">
          <CardContent className="flex flex-col md:flex-row">
            {/* Imagen grande */}
            <div className="md:w-1/2">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Información textual */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-700 text-lg mb-6">
                {product.descripcion}
              </p>
              <span className="block text-2xl font-bold text-black mb-6">
                {product.price !== null ? `$${product.price}` : "—"}
              </span>

              {/* Botón de Cotizar por WhatsApp */}
              <a
                href="https://api.whatsapp.com/send?phone=573332904492&text=Conectate%20TalusTops%20%C2%BFEn%20que%20podemos%20acesorarte%3F%F0%9F%92%AC%F0%9F%AB%82"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block bg-[#E6D7B6] text-black font-medium text-center py-3 rounded hover:bg-[#cebfa6] transition-colors"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
