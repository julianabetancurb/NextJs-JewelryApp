// src/app/producto/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import rawProducts from "@/data/products.json";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  descripcion: string;
  price: number | null;
  image: string;
  categoria: string;
}

export default function ProductDetailPage() {

  const params = useParams();
  const id = params?.id as string;

  // 2) Casteamos el JSON a Product[]
  const products = rawProducts as Product[];

  // 3) Buscamos el producto cuyo id coincida
  const product = products.find((p) => p.id === id);

  // 4) Si no existe, mostramos un mensaje
  if (!product) {
    return (
      <main className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">Producto no encontrado.</p>
          <Link
            href="/"
            className="mt-4 inline-block bg-[#E6D7B6] text-black font-medium py-2 px-4 rounded hover:bg-[#cebfa6] transition-colors"
          >
            Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  // 5) Si existe, renderizamos el detalle
  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Botón “Volver al catálogo” */}
       

        {/* Tarjeta con detalle de producto */}
        <Card className="bg-white border border-gray-200 shadow-md">
          <CardContent className="flex flex-col md:flex-row">
            {/* Imagen del producto */}
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
              <p className="text-gray-700 text-lg mb-4">
                {product.descripcion}
              </p>

              {/* Mostramos la categoría */}
              <p className="mb-4">
                <span className="font-medium">Categoría: </span>
                <span className="text-gray-800">{product.categoria}</span>
              </p>

              {/* Precio */}
              <span className="block text-2xl font-bold text-black mb-6">
                {product.price !== null ? `$${product.price}` : "—"}
              </span>

              {/* Botón “Cotizar por WhatsApp” */}
              <a
                href="https://api.whatsapp.com/send?phone=573332904492&text=Hola%2C%20quiero%20cotizar%20el%20producto%20de%20nombre%3A%20"
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
