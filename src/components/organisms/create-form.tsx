"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import { ColorPicker } from "@/src/components/atoms/color-picker";
import { Input } from "@/src/components/atoms/input";
import { TextArea } from "@/src/components/atoms/text-area";
import { FileDropzone } from "../atoms/file-dropzone";
import { DarkDatePicker } from "../atoms/date-picker";
import { DarkTimePicker } from "../atoms/time-picker";
import { PlanSelector } from "@/src/components/atoms/plan-selector";
import { BuyButton } from "../atoms/buy-button";

import { PLAN_PRICES } from "@/src/@types/plans";
import { validatedSchema } from "@/src/schemas/create";
import type { CreateFormProps } from "@/src/@types/count-form";
import { uploadImage } from "@/utils/supabase/upload-image";

type UploadResult = { fileId: string; url: string };

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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- EFFECTS ---
  useEffect(() => {
    const storedPlan = localStorage.getItem("plan_redirect");
    const validPlans = ["normal", "premium"] as const;

    if (storedPlan && validPlans.includes(storedPlan as any)) {
      setSelectedPlan(storedPlan as "normal" | "premium");
    } else if (!selectedPlan) {
      setSelectedPlan("normal");
    }

    localStorage.removeItem("plan_redirect");
  }, [selectedPlan, setSelectedPlan]);

  // --- HELPERS ---
  const handleTouch = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const startDateObj = startDate ? new Date(startDate) : undefined;

  const formData = {
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

  const parsed = validatedSchema.safeParse(formData);
  const fieldErrors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  const additionalErrors: Record<string, string> = {};
  if (touched.startHour && !startHour)
    additionalErrors.startHour = "Hora obrigatória";
  if (touched.image && (!image || image.length === 0))
    additionalErrors.image = "Selecione pelo menos uma foto";

  const isFormValid =
    parsed.success && !!startHour && !!startDate && !!image?.length;

  async function uploadWithRetry(
    file: File,
    retries = 2,
    delay = 500
  ): Promise<UploadResult> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await uploadImage(file);
      } catch (err) {
        if (attempt < retries) {
          console.warn(`Upload failed, retrying (${attempt + 1})...`);
          await new Promise((res) => setTimeout(res, delay));
        } else throw err;
      }
    }
    throw new Error("Unexpected upload failure");
  }

  async function handleSubmit() {
    if (!isFormValid) return;
    setIsLoading(true);

    try {
      const uploadedImages =
        image?.length > 0
          ? await Promise.all(image.map((file) => uploadWithRetry(file)))
          : [];

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
        images: uploadedImages.map(({ fileId, url }) => ({
          file_id: fileId,
          url,
        })),
        plan_type: selectedPlan,
      };

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

  // --- RENDER ---
  const renderError = (field: keyof typeof fieldErrors) =>
    fieldErrors[field]?.[0] && touched[field] ? (
      <p className="text-red-400 text-sm">{fieldErrors[field]![0]}</p>
    ) : null;

  const renderAdditionalError = (field: string) =>
    touched[field] &&
    additionalErrors[field] && (
      <p className="text-red-400 text-sm">{additionalErrors[field]}</p>
    );

  return (
    <div className="w-1/2 h-screen p-10 overflow-y-auto flex flex-col justify-between gap-14 bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)] rounded-3xl text-[#e7d8d8]">
      <div className="space-y-5">
        <Input
          label="Nome do casal"
          placeholder="Ex: Ana & João (Não use emojis)"
          value={coupleName}
          onChange={(e) => setCoupleName(e.target.value)}
          onBlur={() => handleTouch("coupleName")}
        />
        {renderError("coupleName")}

        <Input
          label="Seu email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Para receber seu QR Code"
          onBlur={() => handleTouch("userEmail")}
        />
        {renderError("userEmail")}

        <TextArea
          label="Mensagem especial"
          placeholder="Escreva uma mensagem de amor..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => handleTouch("message")}
        />
        {renderError("message")}

        <div className="pt-3 relative z-[50]">
          <ColorPicker
            value={color}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setColor(e.target.value)
            }
            onBlur={() => handleTouch("color")}
          />
        </div>
        {renderError("color")}

        <div className="grid grid-cols-2 gap-5">
          <div>
            <DarkDatePicker
              value={startDate}
              onChange={setStartDate}
              onBlur={() => handleTouch("startDate")}
            />
            {renderError("startDate")}
          </div>
          <div>
            <DarkTimePicker
              value={startHour}
              onChange={setStartHour}
              onBlur={() => handleTouch("startHour")}
            />
            {renderAdditionalError("startHour")}
          </div>
        </div>

        <FileDropzone
          selectedPlan={selectedPlan}
          onChange={(files) => {
            handleImage(files);
            handleTouch("image");
          }}
        />
        {renderAdditionalError("image")}

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
          {renderError("musicLink")}
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
