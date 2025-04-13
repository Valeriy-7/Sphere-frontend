import * as React from 'react';

import { cn } from '@/lib/utils';
import { inputVariants } from '@/components/ui/input';
import type { VariantProps } from 'class-variance-authority';

import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

// Создаем тип, заменяющий стандартный onChange на нашу версию
export type CustomTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> & {
  onChange: (value: string) => void;
} & VariantProps<typeof inputVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, variant, size, onChange, ...props }, ref) => {
    // Обработчик изменения значения, который преобразует событие в строку
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange],
    );

    // Копируем props без ref (ref передается отдельно)
    const { style, ...restProps } = props;

    const textareaProps: Omit<TextareaAutosizeProps, 'ref'> = {
      ...restProps,
      className: cn(inputVariants({ variant, size, className })),
      onChange: handleChange,
      style: style as any, // Принудительное приведение типа для style
    };

    return <TextareaAutosize ref={ref} {...textareaProps} />;
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
