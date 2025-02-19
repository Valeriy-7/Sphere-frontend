import { formatValue } from 'react-currency-input-field';
import { SUFFIX_RUB } from '@/lib/constants/rub';

export type FormatCurrency = (value?: number, type?: string) => string;

export const formatCurrency: FormatCurrency = (value, type = 'currency') => {
  const formatedValue = formatValue({
    value: String(value),
    intlConfig: { locale: 'ru' },
  });

  const suffix = type === 'currency' ? SUFFIX_RUB : '';

  return `${formatedValue}`;
};
