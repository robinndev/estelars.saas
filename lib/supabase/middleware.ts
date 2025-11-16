// utils/supabase/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export const updateSupabaseSession = (req: NextRequest) => {
  const res = NextResponse.next();

  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  return res;
};
