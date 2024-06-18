import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://npfwfiiwxvhfiggqjqdo.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZndmaWl3eHZoZmlnZ3FqcWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5OTYzNjAsImV4cCI6MjAzMjU3MjM2MH0.4N_jdWi_soz5y5_GT6ZmTWWYe1646dIPZ5HJ-PPUwb4'
// since i only allowed read operations in the RLS (row level security), so this exposed key is safe and not a security threat unless we allow other permissions (write operations)
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
