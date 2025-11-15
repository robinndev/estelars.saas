"use client";

import { ColorPicker } from "@/src/components/atoms/color-picker";
import { Input } from "@/src/components/atoms/input";
import { PlanSelector } from "@/src/components/atoms/plan-selector";
import { TextArea } from "@/src/components/atoms/text-area";
import { ThemeSelector } from "@/src/components/atoms/theme-selector";
import { FileDropzone } from "../atoms/file-dropzone";
import { DarkDatePicker } from "../atoms/date-picker";
import { DarkTimePicker } from "../atoms/time-picker";
import { BuyButton } from "../atoms/buy-button";
import { PLAN_PRICES } from "@/src/@types/plans";
import { validatedSchema } from "@/src/schemas/create";

export default function CreateForm(props: any) {
  const {
    themes,
    selectedColor,
    setSelectedColor,
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
  } = props;

  function handleSubmit() {
    const rawData = {
      coupleName,
      userEmail,
      message,
      color,
      startDate,
      startHour,
      plan: selectedPlan,
      musicLink,
    };

    try {
      const parsed = validatedSchema.parse(rawData);
      const price = PLAN_PRICES[selectedPlan];

      console.log("🎉 Dados válidos:", parsed);
      console.log("💰 Vai pagar:", price);

      // Aqui você envia pro backend, stripe, API, etc:
      // await api.post("/checkout", { ...parsed, price });
    } catch (err: any) {
      console.error("❌ Erros no formulário:", err);
    }
  }

  function isFormValid() {
    const rawData = {
      coupleName,
      userEmail,
      message,
      color,
      startDate,
      startHour,
      plan: selectedPlan,
      musicLink,
    };

    try {
      validatedSchema.parse(rawData);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <div
      className="
        w-1/2 h-screen p-10 overflow-y-auto flex flex-col justify-between gap-14

        /* DARK GLASS */
        bg-black/30 
        backdrop-blur-xl
        border border-white/10
        shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]
        rounded-3xl

        /* Vibe */
        text-[#e7d8d8]
      "
    >
      {/* TEMA */}
      <div className=" border-white/10">
        <ThemeSelector
          themes={themes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      {/* CAMPOS */}
      <div className="space-y-5">
        <Input
          label="Nome do casal"
          placeholder="Ex: Ana & João"
          value={coupleName}
          onChange={(e) => setCoupleName(e.target.value)}
        />

        <Input
          label="Seu email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="para enviar o link final"
        />

        <TextArea
          label="Mensagem especial"
          placeholder="Escreva uma mensagem de amor..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="pt-3 relative z-[50]">
          <ColorPicker
            value={color}
            onChange={(e: any) => setColor(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <DarkDatePicker value={startDate} onChange={setStartDate} />

          <DarkTimePicker value={startHour} onChange={setStartHour} />
        </div>

        <FileDropzone onChange={handleImage} />

        {/* CAMPO DE MÚSICA */}
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
                ? "Link da música"
                : "Apenas no Premium"
            }
            className={`
              w-full p-3 rounded-lg border bg-black/40 text-white outline-none transition
              ${
                selectedPlan !== "premium"
                  ? "border-white/5 text-white/30 cursor-not-allowed"
                  : "border-white/10"
              }
            `}
          />
        </div>
      </div>
      {/* PLANOS */}
      <div className="-mt-20">
        <PlanSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </div>

      <div className="w-full">
        <BuyButton
          disabled={!isFormValid()}
          onClick={isFormValid() ? handleSubmit : () => {}}
        />

        {!isFormValid() && (
          <p className="text-purple-400 text-sm mt-2 text-center opacity-80">
            Preencha todos os campos
          </p>
        )}
      </div>
    </div>
  );
}
