// src/app/privacy-policy/page.tsx (ou src/components/PrivacyPolicy.tsx)

import React from "react";
import { Info, Mail, Clock, Shield, Users, UserCheck } from "lucide-react";

// --- NOVOS DADOS ---
const APP_NAME = "Estelars";
const CONTACT_EMAIL = "developer.robson@hotmail.com";
const CNPJ = "58.236.094/0001-82";
const LAST_UPDATED = "20 de Julho de 2024";

// Dados de exemplo para as seções de Privacidade
const privacySections = [
  {
    icon: Info,
    title: "1. Introdução",
    content:
      "Sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "2. Informações que Coletamos",
    content: (
      <>
        Coletamos as seguintes informações quando você utiliza nossa plataforma:
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
          <li>
            <span className="font-semibold">Informações de Cadastro:</span>{" "}
            Nome, data de início do relacionamento, mensagem personalizada,
            fotos do casal e endereço de email cadastrado.
          </li>
          <li>
            <span className="font-semibold">Informações de Pagamento:</span>{" "}
            Endereço de email cadastrado no Stripe para processamento do
            pagamento e envio do link da página personalizada.
          </li>
        </ul>
      </>
    ),
    color: "text-indigo-600",
  },
  {
    icon: UserCheck,
    title: "3. Como Usamos Suas Informações",
    content: (
      <>
        Utilizamos suas informações para:
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 ml-4">
          <li>
            Processar o pagamento e enviar o link da página personalizada via
            email.
          </li>
          <li>
            Personalizar e criar a página do casal com as informações
            fornecidas.
          </li>
          <li>Melhorar nossos serviços e suporte ao cliente.</li>
        </ul>
      </>
    ),
    color: "text-green-600",
  },
  {
    icon: Users,
    title: "4. Compartilhamento de Informações",
    content:
      "Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para processar pagamentos (Stripe) e conforme exigido por lei.",
    color: "text-red-600",
  },
  {
    icon: Shield,
    title: "5. Segurança",
    content:
      "Implementamos medidas de segurança para proteger suas informações pessoais contra acesso, uso ou divulgação não autorizados. No entanto, nenhuma transmissão de dados pela internet é completamente segura, e não podemos garantir a segurança absoluta.",
    color: "text-yellow-600",
  },
  {
    icon: Clock,
    title: "6. Retenção de Dados",
    content:
      "Reteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas ou conforme exigido por lei.",
    color: "text-purple-600",
  },
  {
    icon: Mail,
    title: "7. Seus Direitos",
    content: `Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco pelo email: ${CONTACT_EMAIL}`,
    color: "text-teal-600",
  },
  {
    icon: Info,
    title: "8. Alterações nesta Política de Privacidade",
    content:
      "Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos isso, revisaremos a data da 'última atualização' no topo desta página. É sua responsabilidade revisar esta política periodicamente para se manter informado sobre quaisquer alterações.",
    color: "text-gray-600",
  },
];

export default function Page() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header (Simplificado para o contexto da Política) */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {APP_NAME} | Política de Privacidade
          </h1>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            Última atualização:{" "}
            <span className="font-semibold ml-1">{LAST_UPDATED}</span>
          </div>
        </header>

        {/* Corpo da Política */}
        <section className="space-y-12">
          {/* Mapeamento das Seções */}
          <div className="grid gap-10">
            {privacySections.map((section, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-300 pb-6 last:border-b-0 last:pb-0"
              >
                {/* Ícone estilizado */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-opacity-10 ${section.color.replace(
                      "text",
                      "bg"
                    )} p-2`}
                  >
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                </div>

                {/* Conteúdo da Seção */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rodapé e Contato Final */}
        <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">Contato</h4>
          <p className="text-gray-600 mb-4">
            Se você tiver alguma dúvida sobre esta Política, entre em contato
            conosco:
            <br />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-150"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-6">
            {APP_NAME} | CNPJ: {CNPJ}
            <br />
            Copyright © 2025 - Todos os direitos reservados
          </p>
        </footer>
      </div>
    </div>
  );
}

// Para usar este componente em uma página do Next.js App Router:
/*
export default function PrivacyPage() {
    return <PrivacyPolicy />;
}
*/
