export interface SitePhoto {
  id: string;
  url: string;
  file_id: string;
  site_id: string;
}

export interface ISiteData {
  id: string;
  couple_name: string;
  slug: string;
  start_date: string; // ISO date
  start_hour: string;
  message: string;
  color: string;
  music: string | null;
  plan: "normal" | "premium"; // deixe flexível
  plan_price: number;
  payment_state: "draft" | "paid" | "canceled" | string;
  created_at: string;
  updated_at: string;
  email_address: string;
  purchase_date: string;
  is_recurring: boolean;
  billing_cycle: string | null;
  photos: SitePhoto[];
  selected_plan: "normal" | "premium";
}
