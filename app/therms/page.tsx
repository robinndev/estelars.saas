// src/app/terms-of-service/page.tsx (ou src/components/TermsOfService.tsx)

import React from "react";
import { CheckCircle, Info, Lock, Zap } from "lucide-react";

// Dados de exemplo para as seções
const termsSections = [
  {
    icon: Info,
    title: "1. Aceitação dos Termos",
    content:
      "Ao acessar e utilizar nosso serviço, você concorda em estar vinculado por estes Termos de Serviço e por todas as diretrizes e políticas aqui incorporadas. Se você não concordar com qualquer parte dos termos, você não deve utilizar o serviço.",
    color: "text-blue-500",
  },
  {
    icon: Lock,
    title: "2. Privacidade e Segurança",
    content:
      "Sua privacidade é fundamental. Nossas práticas de coleta, uso e divulgação de informações pessoais são regidas por nossa Política de Privacidade, que é incorporada a estes Termos por referência.",
    color: "text-green-500",
  },
  {
    icon: CheckCircle,
    title: "3. Conduta do Usuário",
    content:
      "Você concorda em não usar o serviço para qualquer finalidade ilegal ou proibida por estes Termos, incluindo, mas não se limitando a, postar conteúdo difamatório, assediador ou prejudicial. O uso indevido pode resultar na suspensão ou encerramento da sua conta.",
    color: "text-red-500",
  },
  {
    icon: Zap,
    title: "4. Alterações e Atualizações",
    content:
      "Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento, a nosso exclusivo critério. Notificaremos você sobre quaisquer mudanças significativas. O uso contínuo do serviço após tais mudanças constitui sua aceitação dos novos termos.",
    color: "text-yellow-500",
  },
];

export default function TermsOfService() {
  // Data da última atualização
  const lastUpdated = "19 de Novembro de 2025";

  return (
    // 1. O fundo cinza claro (bg-gray-50) se torna o fundo de toda a página
    <div className="bg-gray-50 min-h-screen">
      {/* 2. O container central agora só limita a largura e centraliza (max-w-4xl mx-auto) */}
      {/* e definimos o padding interno aqui para dar respiro ao conteúdo */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header - Título e Informações */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Termos de Serviço
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Rege o seu uso da nossa aplicação/serviço. Por favor, leia com
            atenção.
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <Info className="w-4 h-4 mr-1 text-gray-400" />
            Última atualização:{" "}
            <span className="font-semibold ml-1">{lastUpdated}</span>
          </div>
        </header>

        {/* Corpo dos Termos */}
        <section className="space-y-12">
          {/* Introdução com destaque (Mantive o fundo azul-claro para dar destaque) */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Bem-vindo(a)!
            </h2>
            <p className="text-blue-700 leading-relaxed">
              Estes Termos de Serviço constituem um acordo legal vinculativo
              entre você e a [Nome da Sua Empresa/Serviço]. Ao se inscrever ou
              usar nossos serviços, você concorda integralmente com estes
              termos.
            </p>
          </div>

          {/* Mapeamento das Seções */}
          <div className="grid gap-10">
            {termsSections.map((section, index) => (
              <div
                key={index}
                // Ajustei a cor do texto para melhor leitura no fundo claro
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition duration-150">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action ou Contato */}
        <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">Dúvidas?</h4>
          <p className="text-gray-600">
            Se você tiver alguma dúvida sobre estes Termos de Serviço, por
            favor, entre em contato conosco em:
            <br />
            <a
              href="mailto:contato@seuservico.com"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-150"
            >
              contato@seuservico.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
