export interface Subscription {
  id: string;
  user_id?: string;
  name: string;
  amount: number;
  next_payment_date: string;
  image_url?: string;
  date: string;
  created_at?: string;
  currency?: string;
  category: string;
  email?: string;
  frequency?: string;
}
