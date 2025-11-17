import { NextResponse } from "next/server";
import { sitesService } from "@/services/sites.service";

export async function DELETE(req: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;

    console.log("🔥 Params resolvido:", params);
    console.log("🔥 ID:", id);
    console.log("🔥 Raw URL:", req.url);

    if (!id) {
      return NextResponse.json(
        { error: "ID do site é obrigatório" },
        { status: 400 }
      );
    }

    const deleted = await sitesService.deleteById(id);

    console.log("Site deletado:", deleted);

    if (!deleted) {
      return NextResponse.json(
        { error: "Site não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Site deletado com sucesso",
      site: deleted,
    });
  } catch (error: any) {
    console.error("Erro ao deletar site:", error);

    return NextResponse.json(
      { error: error.message || "Erro interno ao deletar site" },
      { status: 500 }
    );
  }
}
