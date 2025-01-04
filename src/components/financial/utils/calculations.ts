export const calculateNetWorth = (assets: Record<string, number>, liabilities: Record<string, number>): number => {
  const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
  return totalAssets - totalLiabilities;
};

export const calculateHealthScore = (assets: Record<string, number>, liabilities: Record<string, number>): number => {
  const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
  const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
  const netWorth = totalAssets - totalLiabilities;
  
  let score = 50;
  
  if (totalAssets === 0 && totalLiabilities === 0) {
    return score;
  }
  
  const netWorthRatio = netWorth / (Math.max(totalAssets, totalLiabilities) || 1);
  score += netWorthRatio * 25;
  
  const debtToAssetRatio = totalLiabilities / (totalAssets || 1);
  if (debtToAssetRatio <= 0.3) {
    score += 25;
  } else if (debtToAssetRatio <= 0.5) {
    score += 15;
  } else if (debtToAssetRatio <= 0.7) {
    score += 5;
  } else {
    score -= 15;
  }
  
  return Math.round(Math.max(0, Math.min(100, score)));
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return `${amount.toLocaleString()} ${currency}`;
};