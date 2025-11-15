import { z } from "zod";

export const planSchema = z.enum(["free", "premium"]);

export const createFormSchema = z.object({
  coupleName: z.string().min(1, "Informe o nome do casal"),
  userEmail: z.string().email("Email inválido"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  color: z.string(),
  startDate: z.date(),
  startHour: z.string(),
  plan: planSchema,
  musicLink: z.string().optional(),
});

export const validatedSchema = createFormSchema.refine(
  (data) => {
    if (data.plan === "premium") return true;
    return !data.musicLink; // free não pode ter música
  },
  {
    path: ["musicLink"],
    message: "Apenas o plano Premium permite adicionar música",
  }
);

export type FormData = z.infer<typeof createFormSchema>;
