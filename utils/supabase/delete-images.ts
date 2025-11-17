import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // seguro porque é só no server
);

export async function deleteImages(files: string[]) {
  const { error } = await supabase.storage.from("images").remove(files);

  if (error) throw error;
}
