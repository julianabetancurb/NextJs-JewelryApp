import "./globals.css"
import Image from "next/image"
import { Facebook, Instagram, MessageCircle, Search, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Mi Catálogo de Joyería</title>
      </head>
      <body className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Síguenos:</span>
              <div className="flex space-x-3">
                <Facebook className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <MessageCircle className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
              </div>
            </div>
            {/* Logo */}
            <div className="flex-1 flex justify-center">
              <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
            </div>
            {/* Search & Cart */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="border-t border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex justify-center space-x-8 py-4">
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Inicio</a>
                <div className="relative group">
                  <a href="#" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                    Categorías<ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                </div>
                <div className="relative group">
                  <a href="#" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                    Destacado<ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                </div>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Contacto</a>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="p-4 text-center text-sm text-gray-400">
          © 2025 TOLUS Joyeria
        </footer>
      </body>
    </html>
  )
}