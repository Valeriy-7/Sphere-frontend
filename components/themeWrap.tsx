import { PropsWithChildren } from 'react';
import { LKTypeValue } from '@/lib/types';
export default function ThemeWrap({ children, name }: PropsWithChildren<{ name: LKTypeValue }>) {
  return <div className={`theme-${name}`}>{children}</div>;
}
