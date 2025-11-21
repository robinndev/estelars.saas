// CreateForm fully internationalized

"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { ColorPicker } from "@/src/components/atoms/color-picker";
import { Input } from "@/src/components/atoms/input";
import { TextArea } from "@/src/components/atoms/text-area";
import { FileDropzone } from "../atoms/file-dropzone";
import { PlanSelector } from "@/src/components/atoms/plan-selector";
import { BuyButton } from "../atoms/buy-button";
import { DatePicker } from "../atoms/date-picker";
import { TimePicker } from "../atoms/time-picker";

import { PLAN_PRICES } from "@/src/@types/plans";
import { validatedSchema } from "@/src/schemas/create";
import type { CreateFormProps } from "@/src/@types/count-form";
import { uploadImage } from "@/utils/supabase/upload-image";

type UploadResult = { fileId: string; url: string };

export default function CreateForm(props: CreateFormProps) {
  const t = useTranslations("CreateForm");

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
    additionalErrors.startHour = t("errors.start_hour_required");
  if (touched.image && (!image || image.length === 0))
    additionalErrors.image = t("errors.image_required");

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
        images: uploadedImages.map(({ fileId, url }) => ({
          file_id: fileId,
          url,
        })),
        is_recurring: false,
        billing_cycle: undefined,
        plan_type: selectedPlan,
      };

      const res = await fetch("/api/create-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      router.push(data.checkout_url);
    } catch (err) {
      console.error("❌ Error creating site:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const renderError = (field: keyof typeof fieldErrors) =>
    fieldErrors[field]?.[0] && touched[field] ? (
      <p className="text-red-600 text-sm mt-1">{t(`errors.${field}`)}</p>
    ) : null;

  const renderAdditionalError = (field: string) =>
    touched[field] &&
    additionalErrors[field] && (
      <p className="text-red-600 text-sm mt-1">{additionalErrors[field]}</p>
    );

  return (
    <div className="w-full max-w-2xl mx-auto p-10 lg:p-12 bg-white border border-gray-200 rounded-3xl flex flex-col gap-12 text-gray-900">
      <PlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-6 tracking-tight">
          {t("site_details")}
        </h2>

        <div>
          <Input
            label={t("fields.couple_name")}
            placeholder={t("placeholders.couple_name")}
            value={coupleName}
            onChange={(e) => setCoupleName(e.target.value)}
            onBlur={() => handleTouch("coupleName")}
          />
          {renderError("coupleName")}
        </div>

        <div>
          <Input
            label={t("fields.email")}
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder={t("placeholders.email")}
            onBlur={() => handleTouch("userEmail")}
          />
          {renderError("userEmail")}
        </div>

        <div>
          <TextArea
            label={t("fields.message")}
            placeholder={t("placeholders.message")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleTouch("message")}
          />
          {renderError("message")}
        </div>

        <div className="relative z-[50]">
          <ColorPicker
            value={color}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setColor(e.target.value)
            }
            onBlur={() => handleTouch("color")}
          />
        </div>
        {renderError("color")}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-6 tracking-tight">
          {t("counter_setup")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              onBlur={() => handleTouch("startDate")}
            />
            {renderError("startDate")}
          </div>

          <div>
            <TimePicker
              value={startHour}
              onChange={setStartHour}
              onBlur={() => handleTouch("startHour")}
            />
            {renderAdditionalError("startHour")}
          </div>
        </div>

        <div>
          <FileDropzone
            selectedPlan={selectedPlan}
            onChange={(files) => {
              handleImage(files);
              handleTouch("image");
            }}
          />
          {renderAdditionalError("image")}
        </div>

        <div className="space-y-1">
          <label className="block font-medium text-gray-700 tracking-wide">
            {t("fields.music")}
          </label>

          <input
            type="text"
            disabled={selectedPlan !== "premium"}
            value={musicLink}
            onChange={(e) => setMusicLink(e.target.value)}
            placeholder={
              selectedPlan === "premium"
                ? t("placeholders.music_link")
                : t("placeholders.music_premium_only")
            }
            onBlur={() => handleTouch("musicLink")}
            className={`
              w-full p-3 rounded-xl border outline-none transition duration-200 text-base placeholder-gray-500
              ${
                selectedPlan === "premium"
                  ? "bg-white border-gray-300 text-gray-900 hover:border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                  : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
              }
            `}
          />
          {renderError("musicLink")}
        </div>
      </div>

      <div className="space-y-8">
        <div className="w-full">
          <BuyButton
            disabled={!isFormValid}
            isLoading={isLoading}
            onClick={handleSubmit}
          />

          {!isFormValid && (
            <p className="text-red-500 text-sm mt-2 text-center opacity-90 font-medium">
              {t("errors.fill_all")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
