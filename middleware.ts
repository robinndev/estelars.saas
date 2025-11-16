// middleware.ts

import { updateSupabaseSession } from "./lib/supabase/middleware";

export function middleware(req) {
  return updateSupabaseSession(req);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};
