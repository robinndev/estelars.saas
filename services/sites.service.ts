import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabase/storage"; // seu client do supabase

export const sitesService = {
  async createDraft({
    couple_name,
    start_date,
    start_hour,
    message,
    color,
    music,
    plan,
    plan_price,
    email_address,
    is_recurring,
    billing_cycle,
    images, // array de { url, file_id }
  }: {
    couple_name: string;
    start_date: Date;
    start_hour: string;
    message: string;
    color: string;
    music?: string;
    plan: "normal" | "premium";
    plan_price: number;
    email_address: string;
    is_recurring?: boolean;
    billing_cycle?: "monthly" | "yearly";
    images?: { url: string; file_id: string }[];
  }) {
    const uploadedFileIds: string[] = [];

    try {
      // 1️⃣ Cria o site no banco
      const site = await prisma.site.create({
        data: {
          couple_name,
          start_date,
          start_hour,
          message,
          color,
          music,
          plan,
          plan_price,
          email_address,
          is_recurring: is_recurring ?? false,
          billing_cycle,
          payment_state: "draft",
          photos: {
            create: images?.map((img) => {
              uploadedFileIds.push(img.file_id); // marca arquivo para possível rollback
              return {
                url: img.url,
                file_id: img.file_id,
              };
            }),
          },
        },
        include: { photos: true },
      });

      return site;
    } catch (error) {
      console.error("Erro ao criar draft do site:", error);

      // 2️⃣ Se houver imagens, remove do storage
      if (uploadedFileIds.length > 0) {
        try {
          await supabaseServer.storage
            .from("images")
            .remove(uploadedFileIds.map((id) => `images/${id}`));
        } catch (storageError) {
          console.error("Erro ao apagar imagens do storage:", storageError);
        }
      }

      throw new Error(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  },

  async getById(siteId: string) {
    return prisma.site.findUnique({
      where: { id: siteId },
      include: { photos: true },
    });
  },

  async updatePaymentState(siteId: string, state: "paid" | "canceled") {
    return prisma.site.update({
      where: { id: siteId },
      data: { payment_state: state },
    });
  },

  async deleteById(siteId: string) {
    // 1️⃣ Busca o site com todas as fotos
    const site = await this.getById(siteId);

    if (!site) return null;

    // 2️⃣ Monta os caminhos dos arquivos no storage
    const filesToDelete = site.photos.map((photo) => `images/${photo.file_id}`);

    // 3️⃣ Apaga as imagens no storage
    if (filesToDelete.length > 0) {
      const { error: storageError } = await supabaseServer.storage
        .from("images")
        .remove(filesToDelete);

      if (storageError) {
        console.error("Erro ao apagar imagens do Supabase:", storageError);
        // ❗️ Não retorna aqui
        // Se der erro no storage, ainda apagamos o site no banco
      }
    }

    // 4️⃣ Apaga o site (e cascata apaga as fotos da tabela)
    return prisma.site.delete({
      where: { id: siteId },
      include: { photos: true },
    });
  },
};
