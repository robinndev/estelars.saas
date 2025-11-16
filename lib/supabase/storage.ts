// utils/supabase/storage.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseKey);

export async function uploadImage(
  file: File | Blob,
  folder: string = "images"
) {
  const fileExt = file instanceof File ? file.name.split(".").pop() : "jpg";
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabaseServer.storage
    .from("images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: publicData } = supabaseServer.storage
    .from("images")
    .getPublicUrl(filePath);

  return { fileId: fileName, url: publicData.publicUrl };
}
