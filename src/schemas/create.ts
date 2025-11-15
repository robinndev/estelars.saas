import { z } from "zod";

export const planSchema = z.enum(["normal", "premium"]);

export const createFormSchema = z.object({
  coupleName: z.string().min(1, "Informe o nome do casal"),
  userEmail: z.string().email("Email inválido"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  color: z.string(),
  startDate: z.date(),
  startHour: z.string().min(1, "Informe a hora"),
  image: z.any().refine((val) => val && val.length > 0, {
    message: "Envie ao menos 1 foto",
  }),
  plan: planSchema,
  musicLink: z.string().optional(),
});

export const validatedSchema = createFormSchema.refine(
  (data) => {
    if (data.plan === "premium") return true;
    return !data.musicLink;
  },
  {
    path: ["musicLink"],
    message: "Apenas o plano Premium permite adicionar música",
  }
);
