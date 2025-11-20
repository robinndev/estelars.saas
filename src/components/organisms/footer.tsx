"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Github } from "lucide-react";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");

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
            {t("description")}
          </p>

          <p className="text-sm text-gray-400">{t("copyright")}</p>
        </motion.div>

        {/* Coluna 2 - Feito por */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {t("made_by_title")}
          </h4>

          <p className="text-gray-600 mb-4">{t("creator_name")}</p>

          <div className="flex items-center gap-3">
            <p className="text-gray-600">{t("follow_me")}</p>
            <div className="flex gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.instagram.com/robinltss"
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
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {t("navigation_title")}
          </h4>

          <ul className="space-y-2">
            <li>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                {t("nav_blog")}
              </Link>
            </li>

            <li>
              <Link
                href="/checklist"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                {t("nav_checklist")}
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Coluna 4 - Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            {t("legal_title")}
          </h4>

          <ul className="space-y-1">
            <li>
              <Link
                href="/therms"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                {t("legal_terms")}
              </Link>
            </li>
            <li>
              <Link
                href="/policy"
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                {t("legal_policy")}
              </Link>
            </li>
          </ul>

          <p className="text-sm text-gray-400 mt-4">{t("company_id")}</p>
        </motion.div>
      </div>
    </footer>
  );
};
