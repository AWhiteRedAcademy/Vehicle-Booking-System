import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_ID = "bbmsyfvdiodnfvrlpbfb";
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

const SUPABASE_ANON_KEY = "sb_publishable_SWEndpzs4TtqFw_-FiBk1A_b8H97e4Y"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
