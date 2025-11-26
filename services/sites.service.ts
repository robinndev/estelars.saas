import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/email/resend";
import { generateSlug } from "@/utils/generate-slug";
import { deleteImages } from "@/utils/supabase/delete-images";

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
    images,
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
      const slug = generateSlug(couple_name);

      const site = await prisma.site.create({
        data: {
          couple_name,
          start_date,
          start_hour,
          message,
          color,
          music,
          slug,
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
          console.log(
            "Fazendo rollback, apagando imagens do storage...",
            uploadedFileIds
          );
          await deleteImages(uploadedFileIds);
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
    if (!siteId) return null;

    const byId = await prisma.site.findUnique({
      where: { id: siteId },
      include: { photos: true },
    });

    if (byId) return byId;

    console.log("Buscando site pelo slug:", siteId);

    return prisma.site.findUnique({
      where: { slug: siteId },
      include: { photos: true },
    });
  },

  async updatePaymentState(siteId: string, state: "paid" | "canceled") {
    const site = await this.getById(siteId);
    if (!site) return null;

    return prisma.site.update({
      where: { id: siteId },
      data: { payment_state: state },
    });
  },

  async deleteById(siteId: string) {
    // 1️⃣ Busca o site com todas as fotos
    const site = await this.getById(siteId);

    if (!site) return null;
    if (site.payment_state === "paid") {
      throw new Error("Não é possível apagar um site pago.");
    }

    // 2️⃣ Monta os caminhos dos arquivos no storage
    const filesToDelete = site.photos.map((photo) => `images/${photo.file_id}`);

    // 3️⃣ Apaga as imagens no storage
    if (filesToDelete.length > 0) {
      try {
        await deleteImages(filesToDelete);
      } catch (error) {
        console.error("Erro ao apagar imagens do Supabase:", error);
        // ❗️ Não retorna aqui
      }
    }

    // 4️⃣ Apaga o site (e cascata apaga as fotos da tabela)
    return prisma.site.delete({
      where: { id: siteId },
      include: { photos: true },
    });
  },

  async sendEmailWithCredentials({
    siteId,
    emailTemplate,
  }: {
    siteId: string;
    emailTemplate: string;
  }) {
    const site = await this.getById(siteId);
    if (!site) return null;

    try {
      await resend.emails.send({
        from: "Estelars <no-reply@mail.estelars.com>",
        to: site.email_address,
        subject: "Momentos começam aqui — seu QR Code chegou ✨",
        html: emailTemplate,
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail de criação:", error);
    }

    console.log("E-mail de criação enviado para:", site.email_address);
  },
};
