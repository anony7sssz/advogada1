// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tviyrsobxjpxryciwghc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aXlyc29ieGpweHJ5Y2l3Z2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMzM0NjAsImV4cCI6MjA1ODgwOTQ2MH0.NNqqRja6oX-vkjJDzAvPwE-ZDk4UQ3Zi6h7Cp2sO2d4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);