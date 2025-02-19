'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { Button } from '@/components/ui/button';
import { LoginButtonChevron } from '@/app/(full-page)/login/login-button-chevron';
import { useJWTAuthContext } from '@/modules/auth';
import { useAuthSendCode } from '@/kubb-gen';
import { AppSpinner } from '@/components/app-spinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  code: z.string().min(4, {
    message: 'Код должен состоять из 4 цифр',
  }),
});

type LoginOtpProps = {
  phone: string;
};

export function LoginOtp({ phone }: LoginOtpProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();
  const { mutate: mutateSendCode, isPending } = useAuthSendCode({
    mutation: {
      onError: (e) => {
        form.setError('code', { message: e?.response?.data.message });
      },
      onSuccess: () => {
        form.clearErrors();
      },
    },
  });

  const { loginWithCredentials } = useJWTAuthContext();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  function onSubmit({ code }: z.infer<typeof FormSchema>) {
    setIsLoadingLogin(true);
    form.clearErrors();
    loginWithCredentials({ code, phone })
      .then(({ regStatus, cabinets, role }) => {
        setIsLoadingLogin(false);
        if (role === 'admin') {
          router.push('/admin/list/requests');
          return;
        }
        if (regStatus === 'verified') {
          if (cabinets?.[0].type === 'fulfillment') {
            router.push('/ff');
          }
          if (cabinets?.[0].type === 'wildberries') {
            router.push('/wb');
          }
        }
      })
      .catch((err) => {
        form.setError('code', { message: err?.response?.data?.message });
        setIsLoadingLogin(false);
      });
  }

  return (
    <>
      <div className={'text-[20px] font-normal leading-tight'}>
        Мы отправили SMS на номер <br />
        {phone} <br />
        Введите код из полученного SMS
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <div className={'flex flex-row gap-4'}>
                  <FormControl>
                    <InputOTP pattern={REGEXP_ONLY_DIGITS} maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <LoginButtonChevron disabled={isLoadingLogin} type="submit" />
                </div>

                <FormMessage className={'text-black'} />
                <Button
                  disabled={isPending || isLoadingLogin}
                  className={'w-auto max-w-none'}
                  onClick={() => {
                    mutateSendCode({ data: { phone } });
                    form.setValue('code', '');
                  }}
                  type={'button'}
                  variant="ghost"
                >
                  Отправить код повторно
                </Button>
                <AppSpinner show={isPending || isLoadingLogin} className={'text-white'} />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
