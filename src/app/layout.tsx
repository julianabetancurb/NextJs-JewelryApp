"use client"
import "./globals.css"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import rawProducts from "@/data/products.json"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showContactLink, setShowContactLink] = useState(false)
  const whatsappLink = "https://api.whatsapp.com/send?phone=573332904492&text=Conectate%20TalusTops%20%C2%BFEn%20que%20podemos%20acesorarte%3F%F0%9F%92%AC%F0%9F%AB%82"

  const categories = Array.from(
    new Set((rawProducts as any[]).map(p => p.categoria))
  )

  return (
    <html lang="es">
      <head>
        <title>TALUSTOP Joyería - Catálogo</title>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <header className="bg-black text-white">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-sm">Síguenos:</span>       
              <a href="https://www.instagram.com/talustops/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 hover:text-[#E6D7B6] transition-colors" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=573332904492&text=Conectate%20TalusTops%20%C2%BFEn%20que%20podemos%20acesorarte%3F%F0%9F%92%AC%F0%9F%AB%82" target="_blank" rel="noopener noreferrer">
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

          <nav className="bg-black border-t border-gray-700 relative">
            <div className="container mx-auto px-4">
              <ul className="flex justify-center space-x-8 py-3">
                <li>
                  <Link href="/" className="hover:text-[#E6D7B6]">
                    Inicio
                  </Link>
                </li>

                <li className="relative group">
                  <span className="hover:text-[#E6D7B6] flex items-center cursor-pointer">
                    Categorías
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                  <ul className="absolute left-0 mt-2 bg-black border border-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {categories.map(cat => (
                      <li key={cat}>
                        <Link
                          href={`/?categoria=${encodeURIComponent(cat)}`}
                          className="block px-4 py-2 hover:bg-gray-800"
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="relative">
                  <span
                    onClick={() => setShowContactLink(prev => !prev)}
                    className="hover:text-[#E6D7B6] flex items-center cursor-pointer"
                  >
                    Contacto
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </span>
                  {showContactLink && (
                    <ul className="absolute right-0 mt-2 bg-black border border-gray-700 rounded shadow-lg z-10">
                      <li>
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-white hover:bg-gray-800"
                        >
                          Escríbenos
                        </a>
                      </li>
                    </ul>
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
  )
}
