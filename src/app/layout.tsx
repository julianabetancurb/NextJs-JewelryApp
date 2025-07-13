"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import rawProducts from "@/data/products.json";

interface Product {
  id: string;
  name: string;
  descripcion: string;
  price: number | null;
  image: string;
  categoria: string;
  genero: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showGenders, setShowGenders] = useState(false);
  const [showContactLink, setShowContactLink] = useState(false);

  const whatsappLink =
    "https://api.whatsapp.com/send?phone=573332904492&text=Conectate%20TalusTops%20%C2%BFEn%20que%20podemos%20asesorarte%3F%F0%9F%92%AC%F0%9F%AB%82";

  const productsList = rawProducts as Product[];
  const categories = Array.from(new Set(productsList.map((p) => p.categoria)));
  const genders = Array.from(new Set(productsList.map((p) => p.genero)));

  return (
    <html lang="es">
      <head>
        <title>TALUSTOP Joyería - Catálogo</title>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <header className="bg-black text-white">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-sm">Escríbenos:</span>
              <a
                href="https://www.instagram.com/talustops/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 hover:text-[#E6D7B6] transition-colors" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 hover:text-[#E6D7B6] transition-colors" />
              </a>
            </div>

            <Image
              src="/logo.png"
              alt="TALUS"
              width={120}
              height={60}
              className="object-contain"
              priority
            />

            <div className="text-sm">Medellín - Antioquia, Colombia</div>
          </div>

          <nav className="bg-black border-t border-gray-700 z-10 relative">
            <div className="container mx-auto px-4">
              <ul className="flex justify-center space-x-8 py-3">
                <li>
                  <Link href="/" className="hover:text-[#E6D7B6]">
                    Inicio
                  </Link>
                </li>

                <li className="relative">
                  <button
                    onClick={() => {
                      setShowCategories((prev) => !prev);
                      setShowGenders(false);
                      setShowContactLink(false);
                    }}
                    className="hover:text-[#E6D7B6] flex items-center focus:outline-none"
                  >
                    Categorías
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {showCategories && (
                    <ul
                      className="absolute left-0 mt-2 bg-black border border-gray-700 rounded shadow-lg z-20 w-auto min-w-[160px]"
                      onMouseLeave={() => setShowCategories(false)}
                    >
                      {categories.map((cat) => (
                        <li key={cat}>
                          <Link
                            href={`/?categoria=${encodeURIComponent(cat)}`}
                            className="block px-4 py-2 text-white hover:bg-gray-800"
                            onClick={() => setShowCategories(false)}
                          >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <button
                    onClick={() => {
                      setShowGenders((prev) => !prev);
                      setShowCategories(false);
                      setShowContactLink(false);
                    }}
                    className="hover:text-[#E6D7B6] flex items-center focus:outline-none"
                  >
                    Género
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {showGenders && (
                    <ul
                      className="absolute left-0 mt-2 bg-black border border-gray-700 rounded shadow-lg z-20 w-auto min-w-[140px]"
                      onMouseLeave={() => setShowGenders(false)}
                    >
                      {genders.map((g) => (
                        <li key={g}>
                          <Link
                            href={`/?genero=${encodeURIComponent(g)}`}
                            className="block px-4 py-2 text-white hover:bg-gray-800"
                            onClick={() => setShowGenders(false)}
                          >
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <button
                    onClick={() => {
                      setShowContactLink((prev) => !prev);
                      setShowCategories(false);
                      setShowGenders(false);
                    }}
                    className="hover:text-[#E6D7B6] flex items-center focus:outline-none"
                  >
                    Contacto
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  {showContactLink && (
                    <div
                      className="absolute right-0 mt-2 bg-black border border-gray-700 rounded shadow-lg z-20 w-64 p-4"
                      onMouseLeave={() => setShowContactLink(false)}
                    >
                      <div className="text-gray-200 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Correo:</span>{" "}
                          servicetalus@gmail.com
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Teléfono:</span>{" "}
                          +57&nbsp;333&nbsp;2904492
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-black text-gray-400 text-center py-6">
          © 2025 TALUSTOP.
        </footer>
      </body>
    </html>
  );
}
