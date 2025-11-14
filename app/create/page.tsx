"use client";

import Preview from "@/src/components/molecules/preview";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CreatePage() {
  const [selectedLayout, setSelectedLayout] = useState<string>("layout1");
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");

  // Campos
  const [coupleName, setCoupleName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("#8b0000");

  const [image, setImage] = useState<string | null>(null);
  const [musicLink, setMusicLink] = useState("");

  const layouts = [
    { id: "layout1", label: "Layout Minimalista" },
    { id: "layout2", label: "Layout Romântico" },
    { id: "layout3", label: "Layout Moderno" },
  ];

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen w-full bg-white flex"
    >
      {/* -------------------------------- */}
      {/* PREVIEW AQUI — SEU COMPONENTE     */}
      {/* -------------------------------- */}
      <div className="w-1/2 h-screen p-10 flex items-start justify-center text-white">
        <Preview selectedLayout={selectedLayout} />
      </div>

      {/* ----------------------------------- */}
      {/* FORMULÁRIO - PARTE DIREITA          */}
      {/* ----------------------------------- */}
      <div
        className="w-1/2 h-screen p-10 overflow-y-auto space-y-10"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        {/* ----------------------- */}
        {/* Seleção de Layouts      */}
        {/* ----------------------- */}
        <div>
          <h1 className="text-xl font-semibold mb-4 text-red-900">
            Escolha o layout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {layouts.map((l) => (
              <label
                key={l.id}
                className={`
                  cursor-pointer rounded-xl p-4 flex flex-col items-center gap-4 
                  border-2 transition-all
                  ${
                    selectedLayout === l.id
                      ? "border-red-900 bg-red-900/10"
                      : "border-red-900/30 hover:border-red-900/60"
                  }
                `}
              >
                {/* Mini-preview fake */}
                <div className="w-full h-24 rounded-lg bg-red-900/10 p-2 flex flex-col gap-1">
                  {l.id === "layout1" && (
                    <div className="flex flex-col gap-1 h-full">
                      <div className="w-full h-2/3 bg-red-900/30 rounded-md" />
                      <div className="w-3/4 h-2 bg-red-900/20 rounded" />
                      <div className="w-1/2 h-2 bg-red-900/20 rounded" />
                    </div>
                  )}

                  {l.id === "layout2" && (
                    <div className="flex gap-2 h-full">
                      <div className="w-1/2 h-full bg-red-900/30 rounded-md" />
                      <div className="flex flex-col justify-between w-1/2">
                        <div className="w-full h-2 bg-red-900/20 rounded" />
                        <div className="w-3/4 h-2 bg-red-900/20 rounded" />
                        <div className="w-1/2 h-2 bg-red-900/20 rounded" />
                      </div>
                    </div>
                  )}

                  {l.id === "layout3" && (
                    <div className="flex flex-col gap-2 h-full">
                      <div className="flex gap-2">
                        <div className="w-1/3 h-10 bg-red-900/30 rounded-md" />
                        <div className="w-1/3 h-10 bg-red-900/20 rounded-md" />
                        <div className="w-1/3 h-10 bg-red-900/10 rounded-md" />
                      </div>
                      <div className="w-full h-2 bg-red-900/20 rounded" />
                      <div className="w-2/3 h-2 bg-red-900/20 rounded" />
                    </div>
                  )}
                </div>

                <input
                  type="radio"
                  name="layout"
                  checked={selectedLayout === l.id}
                  onChange={() => setSelectedLayout(l.id)}
                  className="accent-red-900 h-5 w-5"
                />

                <span className="text-center text-red-900 text-sm font-medium">
                  {l.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ----------------------- */}
        {/* Campos do formulário     */}
        {/* ----------------------- */}
        <div className="space-y-6 text-red-900">
          <div>
            <label className="block mb-1 font-medium">Nome do casal</label>
            <input
              type="text"
              value={coupleName}
              onChange={(e) => setCoupleName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-red-900/30 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Seu email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="para enviar o link final"
              className="w-full p-3 rounded-lg bg-white border border-red-900/30 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mensagem especial</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-red-900/30 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Cor principal</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-10 rounded-lg border border-red-900/30 cursor-pointer"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Data do início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-red-900/30 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Hora do início</label>
            <input
              type="time"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-red-900/30 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Anexar imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full p-3 rounded-lg bg-white border border-red-900/30"
            />
          </div>

          {/* ---------------- MUSIC LINK ---------------- */}
          <div>
            <label className="block mb-1 font-medium">Música (Premium)</label>
            <input
              type="text"
              value={musicLink}
              disabled={selectedPlan !== "premium"}
              onChange={(e) => setMusicLink(e.target.value)}
              placeholder={
                selectedPlan === "premium"
                  ? "Cole o link da música"
                  : "Disponível apenas no Premium"
              }
              className={`w-full p-3 rounded-lg border outline-none
                ${
                  selectedPlan !== "premium"
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white border-red-900/30"
                }
              `}
            />
          </div>
        </div>

        {/* ----------------------- */}
        {/* Planos                  */}
        {/* ----------------------- */}
        <div className="mt-12 text-red-900">
          <h2 className="text-lg font-semibold mb-3">Escolha o plano</h2>

          <div className="flex gap-4">
            {/* FREE */}
            <label
              className={`flex-1 p-4 rounded-xl cursor-pointer border-2 transition 
                ${
                  selectedPlan === "free"
                    ? "bg-white border-red-900"
                    : "bg-white border-red-900/30 hover:border-red-900/60"
                }`}
            >
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === "free"}
                onChange={() => setSelectedPlan("free")}
                className="accent-red-900 mr-2"
              />
              <span className="font-medium">Plano Free</span>
              <p className="text-sm opacity-70 mt-1">
                Sem música, recursos essenciais.
              </p>
            </label>

            {/* PREMIUM */}
            <label
              className={`flex-1 p-4 rounded-xl cursor-pointer border-2 transition 
                ${
                  selectedPlan === "premium"
                    ? "bg-white border-red-900"
                    : "bg-white border-red-900/30 hover:border-red-900/60"
                }`}
            >
              <input
                type="radio"
                name="plan"
                checked={selectedPlan === "premium"}
                onChange={() => setSelectedPlan("premium")}
                className="accent-red-900 mr-2"
              />
              <span className="font-medium">Premium</span>
              <p className="text-sm opacity-70 mt-1">
                Libera música + extras exclusivos.
              </p>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
