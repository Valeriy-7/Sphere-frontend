'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { LoginInput } from '@/app/(full-page)/login/login-input';
import { sendCodeDtoSchema, useAuthSendCode } from '@/kubb-gen';
import { AppSpinner } from '@/components/app-spinner';

import { useImperativeHandle } from 'react';

/*
const FormSchema = z.object({
  phone: z.string().min(1, {
    message: "Обязательно для заполнения",
  }),
});

type LoginPhoneProps = {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
};
*/

z.setErrorMap((issue, ctx) => {
  console.log(issue, ctx);
  if (issue.code === z.ZodIssueCode.invalid_type && issue.received === 'undefined') {
    return { message: 'Обязательно для заполнения' };
  }
  return { message: ctx.defaultError };
});

type LoginPhoneProps = {
  onSubmit: (data: z.infer<typeof sendCodeDtoSchema>) => void;
};

export function LoginPhone(props: LoginPhoneProps) {
  const form = useForm<z.infer<typeof sendCodeDtoSchema>>({
    resolver: zodResolver(sendCodeDtoSchema),
    defaultValues: { phone: '+7' },
  });
  const { mutate, isPending } = useAuthSendCode();

  function onSubmit(data: z.infer<typeof sendCodeDtoSchema>) {
    console.log(data);
    mutate(
      { data },
      {
        onError: (e) => {
          form.setError('phone', { message: e?.response?.data.errors[0].message });
        },
        onSuccess: () => {
          props.onSubmit(data);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form className={'mt-6 w-full'} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LoginInput
                  isLoading={isPending}
                  onButtonClick={form.handleSubmit(onSubmit)}
                  placeholder="Номер телефона"
                  value={field.value || '+7'}
                  onChange={(e) => {
                    let raw = e.currentTarget.value;
                    let digits = raw.replace(/\D/g, '');
                    if (digits.startsWith('7')) digits = digits.slice(1);
                    let formatted = '+7' + digits;
                    if (formatted.length > 12) formatted = formatted.slice(0, 12);
                    field.onChange(formatted);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage className={'text-black'} />
              <AppSpinner show={isPending} className={'text-white'} />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
