import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase public environment variables (URL/Anon Key)");
}

// Client-side / Standard public client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side / Admin client (for uploading files/bypassing storage RLS safely in Server Actions)
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
