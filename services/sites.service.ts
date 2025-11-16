// services/sites.service.ts
import { SupabaseClient } from "@supabase/supabase-js";

export const sitesService = {
  async createDraft(
    supabase: SupabaseClient,
    {
      name,
      message,
      date,
      layout,
    }: { name: string; message: string; date: string; layout: string }
  ) {
    const { data, error } = await supabase
      .from("sites")
      .insert({
        name,
        message,
        date,
        layout,
        paid: false,
      })
      .select()
      .single();

    return { data, error };
  },
};
