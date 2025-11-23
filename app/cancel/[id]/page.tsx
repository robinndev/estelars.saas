"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function CancelPage() {
  const { id } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [redirecting, setRedirecting] = useState(false);

  // Fetch / delete site
  useEffect(() => {
    console.log("🔥 ID recebido no client:", id);
    if (!id) {
      setStatus("error");
      return;
    }

    async function deleteSite() {
      try {
        const res = await fetch(`/api/delete-site/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => {
            setRedirecting(true);
            router.push("/");
          }, 4000); // Dar mais tempo para ver animação
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    }

    deleteSite();
  }, [id, router]);

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6 font-sans">
      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-16 h-16 text-indigo-600" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-indigo-700 text-center">
              Estamos Trabalhando Nisso!
            </h1>
            <p className="text-xl font-medium text-gray-600 text-center">
              Processando o cancelamento do seu pedido com muito carinho...
            </p>
          </motion.div>
        )}

        {status === "success" && (
          <motion.div
            key="success"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <CheckCircle2 className="w-24 h-24 text-green-500 stroke-1" />
            </motion.div>
            <h1 className="text-5xl font-extrabold text-green-700 leading-tight text-center">
              Tudo Certo!
            </h1>
            <p className="text-2xl font-semibold text-gray-700 max-w-2xl text-center">
              Seu pedido foi cancelado e seu site removido com sucesso.
              <br />
              Sentimos muito por vê-lo partir, mas esperamos te ver novamente!
            </p>
            {redirecting ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg text-gray-500 mt-4 text-center"
              >
                Redirecionando você de volta para casa...
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-lg text-gray-500 mt-4 text-center"
              >
                Você será redirecionado em breve.
              </motion.p>
            )}
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <XCircle className="w-24 h-24 text-red-500 stroke-1" />
            </motion.div>
            <h1 className="text-5xl font-extrabold text-red-700 leading-tight text-center">
              Oops! Algo Não Deu Certo
            </h1>
            <p className="text-2xl font-semibold text-gray-700 max-w-2xl text-center">
              Não foi possível processar o cancelamento do site{" "}
              <strong>{id}</strong>.
              <br />
              Por favor, tente novamente ou entre em contato com nosso suporte.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
