import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl: string = process.env.PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
