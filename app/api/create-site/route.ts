import { cookies } from "next/headers";
import { sitesService } from "@/services/sites.service";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerSupabase(cookieStore);

  const body = await req.json();

  const site = await sitesService.createDraft(supabase, {
    name: body.name,
    message: body.message,
    date: body.date,
    layout: body.layout,
  });

  return Response.json(site);
}
