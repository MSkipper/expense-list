export function convertToEUR(plnAmount: number, conversionRate: number): number {
  return roundAmount(plnAmount / conversionRate );
}

export function transformAmountToNumber(amount: string): number {
  return Number(amount.replace(",", "."));
}

export function roundAmount(amount: number): number {
  return Math.round(amount * 1e2) / 1e2;
}
