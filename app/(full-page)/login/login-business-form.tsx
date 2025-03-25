'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { LoginInput } from '@/app/(full-page)/login/login-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { userTypeEnum, useAuthCompleteRegistration } from '@/kubb-gen';
import { AppSpinner } from '@/components/app-spinner';
import { useJWTAuthContext } from '@/modules/auth';
import { useState } from 'react';

const FormSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(userTypeEnum.wildberries),
    apiKey: z.string().min(32, 'Должен содержать мимум 32 символа'),
    token: z.string().optional().nullable(),
  }),
  z.object({
    type: z.enum([
      userTypeEnum.fulfillment,
      /*    Business.Wholesaler,
      Business.Transport,*/
    ]),
    inn: z.string({ message: 'Обязательно для заполнения' }).regex(/^\d{10}$|^\d{12}$/),
    token: z.string().optional().nullable(),
  }),
]);

export function LoginBusinessForm({ classNameTitle }: { classNameTitle: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: undefined,
      inn: undefined,
      apiKey: '',
      token: localStorage.getItem('registrationUrl'),
    },
  });
  const { user, fetchUser } = useJWTAuthContext();
  const router = useRouter();
  const { mutate, isPending } = useAuthCompleteRegistration();

  const [isMutateSuccess, setIsMutateSuccess] = useState(false);
  const isShowApiKeyField = form.watch('type') === userTypeEnum.wildberries;
  const isBusinessNotEmpty = form.watch('type') !== undefined;

  const isHideForm = user?.regStatus === 'complete' || isMutateSuccess;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      { data },
      {
        onError: (e) => {
          if (isShowApiKeyField) {
            form.setError('apiKey', { message: e?.response?.data.message });
          } else {
            form.setError('inn', { message: e?.response?.data.message });
          }
        },
        onSuccess: () => {
          if (data.token) {
            localStorage.removeItem('registrationUrl');
          }
          if(data.type ==='wildberries'){
            fetchUser().then(()=>{
              router.push('/');
            })
          }
          setIsMutateSuccess(true);
        },
      },
    );
  }

  return (
    <Form {...form}>
      {!isHideForm ? (
        <form className={'mt-6 w-full space-y-5'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className={classNameTitle}>Вид деятельности</div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger
                      isIconLogin
                      className={
                        'flex h-[70px] w-full rounded-md border-transparent bg-login px-3 py-1 text-base text-primary-foreground placeholder:text-primary-foreground'
                      }
                    >
                      <SelectValue placeholder="Вид деятельности" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={'bg-login text-primary-foreground'}>
                    <SelectItem value={userTypeEnum.wildberries}>Продавец WB</SelectItem>
                    <SelectItem value={userTypeEnum.fulfillment}>Фулфилмент</SelectItem>
                    {/*     <SelectItem value={Business.Wholesaler}>
                    Оптовый продавец
                  </SelectItem>
                  <SelectItem value={Business.Transport}>
                    Транспортная компания
                  </SelectItem>*/}
                  </SelectContent>
                </Select>
                <FormMessage className={'text-black'} />
              </FormItem>
            )}
          />

          {isBusinessNotEmpty ? (
            <>
              {isShowApiKeyField ? (
                <FormField
                  key={'apiKey'}
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LoginInput
                          isloading={isPending}
                          onButtonClick={form.handleSubmit(onSubmit)}
                          placeholder="Ключ API"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={'text-black'} />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  key={'inn'}
                  control={form.control}
                  name="inn"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <LoginInput
                          isloading={isPending}
                          inputMode="numeric"
                          maxLength={12}
                          onButtonClick={form.handleSubmit(onSubmit)}
                          placeholder="Инн"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className={'text-black'} />
                    </FormItem>
                  )}
                />
              )}
            </>
          ) : null}

          <AppSpinner show={isPending} className={'text-white'} />
          <p className={'text-xs'}>
            Нажимая далее, вы принимаете условия <br />{' '}
            <a href={'#'} className={'text-[#7727EE]'}>
              Пользовательского соглашения
            </a>{' '}
          </p>
        </form>
      ) : (
        <>
          <div className={classNameTitle}>Данные отправлены</div>
          <p className={'text-white'}>Ожидайте верификации кабинета</p>
        </>
      )}
    </Form>
  );
}
