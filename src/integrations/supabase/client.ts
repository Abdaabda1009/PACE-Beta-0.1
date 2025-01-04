import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";

export const supabase = createClient(
  "https://xhagdzpvgizcrslucmmy.supabase.co", // Project URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYWdkenB2Z2l6Y3JzbHVjbW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MzAyOTYsImV4cCI6MjA1MTEwNjI5Nn0.EPEJGD8Q365x17pb9BLx_SHu9FNPq6S_Lin8iQwxt9U" // Supabase API key
);
