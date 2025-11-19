"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full bg-white">
      <div className="container mx-auto px-6 lg:px-20 py-20 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Coluna 1 - Logo e descrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="Estelars" width={40} height={40} />
            <h3 className="text-2xl font-bold text-rose-600">Estelars</h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-xs">
            Surpreenda o seu amor criando um contador de tempo de relacionamento
            inesquecível 💖
          </p>
          <p className="text-sm text-gray-400">
            Copyright © 2025 — Todos os direitos reservados.
          </p>
        </motion.div>

        {/* Coluna 2 - Feito por */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Feito por
          </h4>
          <p className="text-gray-600 mb-4">Robinndev</p>

          <div className="flex items-center gap-3">
            <p className="text-gray-600">Me siga no</p>
            <div className="flex gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Coluna 3 - Navegação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Navegar</h4>
          <ul className="space-y-2">
            {[
              { name: "Blog", href: "/blog" },
              { name: "Checklist para casais", href: "/checklist" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-rose-600 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Coluna 4 - Projetos e Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-1">
            <li>
              <Link
                href="#"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                Termos de uso
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                Política de privacidade
              </Link>
            </li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">CNPJ: 58.236.094/0001-82</p>
        </motion.div>
      </div>
    </footer>
  );
};
