"use client";

import { useState } from "react";
import { ColorPicker } from "@/src/components/atoms/color-picker";
import { Input } from "@/src/components/atoms/input";
import { PlanSelector } from "@/src/components/atoms/plan-selector";
import { TextArea } from "@/src/components/atoms/text-area";
import { FileDropzone } from "../atoms/file-dropzone";
import { DarkDatePicker } from "../atoms/date-picker";
import { DarkTimePicker } from "../atoms/time-picker";
import { BuyButton } from "../atoms/buy-button";
import { PLAN_PRICES } from "@/src/@types/plans";
import { validatedSchema } from "@/src/schemas/create";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";

type UploadResult = { fileId: string; url: string };

interface CreateFormProps {
  themes: { id: string; label: string; bg: string; text: string }[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  coupleName: string;
  setCoupleName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
  color: string;
  setColor: (color: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  startHour: string;
  setStartHour: (hour: string) => void;
  handleImage: (files: File[]) => void;
  musicLink: string;
  setMusicLink: (link: string) => void;
  selectedPlan: "normal" | "premium";
  setSelectedPlan: (plan: "normal" | "premium") => void;
  image: File[] | null;
}

export default function CreateForm(props: CreateFormProps) {
  const {
    coupleName,
    setCoupleName,
    userEmail,
    setUserEmail,
    message,
    setMessage,
    color,
    setColor,
    startDate,
    setStartDate,
    startHour,
    setStartHour,
    handleImage,
    musicLink,
    setMusicLink,
    selectedPlan,
    setSelectedPlan,
    image,
  } = props;

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleTouch = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Converter startDate string para Date se necessário
  const startDateObj = startDate ? new Date(startDate) : undefined;

  const rawData = {
    coupleName,
    userEmail,
    message,
    color,
    startDate: startDateObj,
    startHour,
    plan: selectedPlan,
    musicLink,
    image,
  };

  const parsed = validatedSchema.safeParse(rawData);
  const fieldErrors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  // Validações extras
  const additionalErrors: { [key: string]: string } = {};
  if (touched.startHour && !startHour)
    additionalErrors.startHour = "Hora obrigatória";
  if (touched.image && (!image || image.length === 0))
    additionalErrors.image = "Selecione pelo menos uma foto";

  const isFormValid =
    parsed.success && !!startHour && !!startDate && !!image && image.length > 0;

  async function uploadWithRetry(
    file: File,
    retries = 2,
    delay = 500
  ): Promise<UploadResult> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const result = await uploadImage(file); // sua função atual
        return result; // garante que sempre retorna UploadResult
      } catch (err) {
        if (attempt < retries) {
          console.warn(`Upload falhou, tentando novamente (${attempt + 1})...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw err; // todas as tentativas falharam
        }
      }
    }
    throw new Error("Falha inesperada no upload"); // só pra TS não reclamar
  }

  async function handleSubmit() {
    if (!isFormValid) return;
    setIsLoading(true);

    const uploadedImages = [];
    if (image && image.length > 0) {
      for (const file of image) {
        const { fileId, url } = await uploadWithRetry(file);
        uploadedImages.push({ file_id: fileId, url });
      }
    }

    const payload = {
      couple_name: coupleName,
      start_date: startDateObj,
      start_hour: startHour,
      message,
      color,
      music: musicLink || undefined,
      plan: selectedPlan,
      plan_price: PLAN_PRICES[selectedPlan],
      email_address: userEmail,
      is_recurring: false,
      billing_cycle: undefined,
      images: uploadedImages,
      plan_type: selectedPlan,
    };

    try {
      const res = await fetch("/api/create-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      router.push(data.checkout_url);

      console.log("✅ Site criado:", data);
    } catch (err) {
      console.error("❌ Erro ao criar site:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-1/2 h-screen p-10 overflow-y-auto flex flex-col justify-between gap-14 bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] rounded-3xl text-[#e7d8d8]">
      {/* TEMA */}
      {/* <div className="border-white/10">
        <ThemeSelector
          themes={themes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div> */}

      {/* CAMPOS */}
      <div className="space-y-5">
        <Input
          label="Nome do casal"
          placeholder="Ex: Ana & João (Não use emojis)"
          value={coupleName}
          onChange={(e) => setCoupleName(e.target.value)}
          onBlur={() => handleTouch("coupleName")}
        />
        {touched.coupleName && fieldErrors.coupleName && (
          <p className="text-red-400 text-sm">{fieldErrors.coupleName[0]}</p>
        )}

        <Input
          label="Seu email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Para receber seu QR Code"
          onBlur={() => handleTouch("userEmail")}
        />
        {touched.userEmail && fieldErrors.userEmail && (
          <p className="text-red-400 text-sm">{fieldErrors.userEmail[0]}</p>
        )}

        <TextArea
          label="Mensagem especial"
          placeholder="Escreva uma mensagem de amor..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => handleTouch("message")}
        />
        {touched.message && fieldErrors.message && (
          <p className="text-red-400 text-sm">{fieldErrors.message[0]}</p>
        )}

        <div className="pt-3 relative z-[50]">
          <ColorPicker
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
            onBlur={() => handleTouch("color")}
          />
        </div>
        {touched.color && fieldErrors.color && (
          <p className="text-red-400 text-sm">{fieldErrors.color[0]}</p>
        )}

        <div className="grid grid-cols-2 gap-5">
          <div>
            <DarkDatePicker
              value={startDate}
              onChange={setStartDate}
              onBlur={() => handleTouch("startDate")}
            />
            {touched.startDate && fieldErrors.startDate && (
              <p className="text-red-400 text-sm">{fieldErrors.startDate[0]}</p>
            )}
          </div>
          <div>
            <DarkTimePicker
              value={startHour}
              onChange={setStartHour}
              onBlur={() => handleTouch("startHour")}
            />
            {touched.startHour && additionalErrors.startHour && (
              <p className="text-red-400 text-sm">
                {additionalErrors.startHour}
              </p>
            )}
          </div>
        </div>

        <FileDropzone
          selectedPlan={selectedPlan}
          onChange={(files) => {
            handleImage(files);
            handleTouch("image");
          }}
        />
        {touched.image && additionalErrors.image && (
          <p className="text-red-400 text-sm">{additionalErrors.image}</p>
        )}

        <div className="space-y-1">
          <label className="block font-medium text-white/80">
            Música (Premium)
          </label>
          <input
            type="text"
            disabled={selectedPlan !== "premium"}
            value={musicLink}
            onChange={(e) => setMusicLink(e.target.value)}
            placeholder={
              selectedPlan === "premium"
                ? "Link da música (YouTube)"
                : "Apenas no Premium"
            }
            className={`w-full p-3 rounded-lg border bg-black/40 text-white outline-none transition ${
              selectedPlan !== "premium"
                ? "border-white/5 text-white/30 cursor-not-allowed"
                : "border-white/10"
            }`}
            onBlur={() => handleTouch("musicLink")}
          />
          {touched.musicLink && fieldErrors.musicLink && (
            <p className="text-red-400 text-sm">{fieldErrors.musicLink[0]}</p>
          )}
        </div>
      </div>

      <div className="-mt-20">
        <PlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </div>

      <div className="w-full">
        <BuyButton
          disabled={!isFormValid}
          isLoading={isLoading}
          onClick={handleSubmit}
        />
        {!isFormValid && (
          <p className="text-purple-400 text-sm mt-2 text-center opacity-80">
            Preencha todos os campos corretamente
          </p>
        )}
      </div>
    </div>
  );
}
