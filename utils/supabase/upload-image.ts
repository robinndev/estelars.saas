import { createBrowserSupabase } from "@/lib/supabase/client";

export async function uploadImage(file: File | Blob, folder = "images") {
  const supabase = createBrowserSupabase();

  const ext = file instanceof File ? file.name.split(".").pop() : "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  return { fileId: fileName, url: data.publicUrl };
}
