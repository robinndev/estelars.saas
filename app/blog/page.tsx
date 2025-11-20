"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Variants } from "framer-motion";
import { useTranslations } from "next-intl";

// --- MOCK DE DADOS DO BLOG ---
const featuredPost = {
  id: 1,
  image: "/logo.png",
  author: "Júlia & Rafael",
  date: "18 de Novembro, 2025",
};

const latestPosts = [
  {
    id: 2,
    title: "Destinos Românticos Inesquecíveis Para Uma Escapada a Dois",
    author: "Júlia e Rafael",
    date: "10 de Novembro, 2025",
  },
  {
    id: 3,
    title: "A Arte de Pedir Desculpas: Consertando Erros",
    author: "Júlia e Rafael",
    date: "05 de Novembro, 2025",
  },
  {
    id: 4,
    title: "10 Ideias de 'Date Night' Criativas e Baratas",
    author: "Júlia e Rafael",
    date: "28 de Outubro, 2025",
  },
];

// Função auxiliar para criar slug
const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// 🔥 VARIANTS
const headerVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, delay: 0.1 },
  },
};

const sidebarVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, delay: 0.3 },
  },
};

export default function BlogPage() {
  const router = useRouter();
  const t = useTranslations("BlogPage");

  const featuredSlug = createSlug(t("featured_post.title"));
  const featuredUrl = `/blog/${featuredSlug}`;

  const handleFeaturedPostClick = () => {
    router.push(featuredUrl);
  };

  return (
    <section className="relative w-full min-h-screen py-16 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-r from-rose-50/70 via-white to-white blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Header */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 border-gray-100 pb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-500 mb-2">
            {t("tagline")} <Heart className="w-3.5 h-3.5 inline mb-0.5 ml-1" />
          </p>
          <h1 className="text-7xl font-extrabold tracking-tight text-gray-900">
            {t("title")}
          </h1>
        </motion.header>

        {/* Featured + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <motion.div
              className="mb-10 cursor-pointer"
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 150 }}
              onClick={handleFeaturedPostClick}
            >
              <div className="relative w-full h-96 mb-6 overflow-hidden rounded-3xl shadow-xl group">
                <Image
                  src={featuredPost.image}
                  alt={t("featured_post.title")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest bg-pink-500 py-1 px-3 rounded-full mb-2 inline-block">
                    {t("featured_category")}
                  </span>

                  <h2 className="text-4xl font-extrabold leading-tight">
                    {t("featured_post.title")}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-4 max-w-2xl leading-relaxed">
                {t("featured_post.summary")}
              </p>

              <div className="flex items-center text-sm text-gray-500">
                <span className="font-semibold text-gray-900 mr-2">
                  {t("featured_post.author")}
                </span>
                •<span className="mx-2">{t("featured_post.date")}</span>•
                <span className="ml-1">
                  {t("featured_post.read_time")} {t("read_time")}
                </span>
                <span className="flex items-center text-pink-500 font-semibold ml-4 hover:text-pink-700 transition-colors">
                  {t("read_now")} <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 lg:pl-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {t("more_read")}
            </h3>

            {latestPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
                className="py-4 group"
              >
                <Link href={`/blog/${createSlug(post.title)}`}>
                  <h4 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-pink-500 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("by")} {post.author} • {post.date}
                  </p>
                </Link>
              </motion.div>
            ))}

            {/* Newsletter */}
            <div className="mt-10 p-6 bg-white border border-pink-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center text-pink-500 mb-3">
                <Send className="w-6 h-6 mr-3" />
                <h4 className="font-extrabold text-xl text-pink-500">
                  {t("newsletter_title")}
                </h4>
              </div>

              <p className="text-gray-600 mb-4 text-sm">
                {t("newsletter_description")}
              </p>

              <form>
                <input
                  type="email"
                  placeholder={t("newsletter_placeholder")}
                  className="w-full p-3 mb-3 border border-pink-300 rounded-lg text-gray-800 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                  required
                />
                <button className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors shadow-md flex justify-center items-center">
                  <Heart className="w-4 h-4 mr-2" /> {t("newsletter_button")}
                </button>
              </form>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
