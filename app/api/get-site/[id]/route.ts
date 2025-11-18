import { NextResponse } from "next/server";
import { sitesService } from "@/services/sites.service";

export async function GET(req: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;

    console.log("ID recebido na rota:", id);

    if (!id) {
      return NextResponse.json(
        { error: "ID do site é obrigatório" },
        { status: 400 }
      );
    }

    const getSite = await sitesService.getById(id);

    console.log("Site encontrado:", getSite);

    if (!getSite) {
      return NextResponse.json(
        { error: "Site não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Site encontrado com sucesso",
      site: getSite,
    });
  } catch (error: any) {
    console.error("Erro ao buscar site:", error);

    return NextResponse.json(
      { error: error.message || "Erro interno ao buscar site" },
      { status: 500 }
    );
  }
}
