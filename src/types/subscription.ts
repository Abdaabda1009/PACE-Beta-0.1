export interface Subscription {
  id: string;
  user_id?: string;
  name: string;
  amount: string;
  next_payment_date: string;
  image_url?: string;
  date: string;
  created_at?: string;
  currency?: string;
}
