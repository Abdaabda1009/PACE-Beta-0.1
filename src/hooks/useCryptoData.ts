import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CryptoData {
  id: string;
  user_id: string;
  name: string;
  symbol: string;
  current_price: number;
  percentage_change: number;
  timeframe: string;
  historical_data: { time: string; value: number }[];
  created_at: string;
  updated_at: string;
}

export const useCryptoData = () => {
  return useQuery({
    queryKey: ['crypto-data'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: cryptoData, error } = await supabase
        .from('cryptocurrencies')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!cryptoData) {
        // If no data exists, fetch from an external API and store it
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        const { data: newCryptoData, error: insertError } = await supabase
          .from('cryptocurrencies')
          .insert({
            user_id: user.id,
            name: 'Bitcoin',
            symbol: 'BTC',
            current_price: data.bitcoin.usd,
            percentage_change: data.bitcoin.usd_24h_change,
            timeframe: 'Today',
            historical_data: Array.from({ length: 24 }, (_, i) => ({
              time: `${i}:00`,
              value: data.bitcoin.usd * (1 + (Math.random() * 0.1 - 0.05))
            }))
          } as CryptoData)
          .select()
          .maybeSingle();

        if (insertError) {
          throw insertError;
        }

        if (!newCryptoData) {
          throw new Error('Failed to create cryptocurrency data');
        }

        return newCryptoData as CryptoData;
      }

      return cryptoData as CryptoData;
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};