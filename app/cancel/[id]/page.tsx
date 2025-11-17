"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function CancelPage() {
  const { id } = useParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

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

          // opcional → redirecionar após 2s
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    }

    deleteSite();
  }, [id, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {status === "loading" && (
        <>
          <Loader2 className="animate-spin w-6 h-6" />
          <p className="text-lg font-medium">Cancelando seu pedido...</p>
        </>
      )}

      {status === "success" && (
        <p className="text-lg font-medium text-green-600">
          Pedido cancelado e site removido com sucesso. ❤️
        </p>
      )}

      {status === "error" && (
        <p className="text-lg font-medium text-red-600">
          Algo deu errado ao cancelar o site {id}. Tente novamente.
        </p>
      )}
    </div>
  );
}
