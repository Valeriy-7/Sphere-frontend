'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SettingsAvatar } from '@/app/(main)/settings/settings-avatar';
import { TypographyH2 } from '@/components/app-typography';
import {
  cabinetsUpdateMutationRequestSchema,
  useCabinetsGetActiveSuspense,
  useCabinetsUpdate,
  CabinetType,
  cabinetsGetActiveSuspenseQueryKey,
} from '@/kubb-gen';
import { useJWTAuthContext } from '@/modules/auth';

const updateCabinetDtoSchema = z.object({
  inn: z.string().describe('ИНН организации').optional(),
  ogrn: z.string().describe('ОГРН организации').optional(),
  legalCompanyName: z.string().describe('Юридическое название организации').optional(),
  legalAddress: z.string().describe('Юридический адрес').optional(),
  companyName: z.string().describe('Название организации для отображения').optional(),
  companyPhone: z.string().describe('Телефон организации').optional(),
  companyEmail: z.string().describe('Email организации').optional(),
  telegramUrl: z.string().describe('Ссылка на Telegram').optional(),
  whatsappUrl: z.string().describe('Ссылка на WhatsApp').optional(),
  actualAddress: z.string().describe('Фактический адрес').optional(),
  managerFullName: z.string().describe('ФИО управляющего').optional(),
  bankName: z.string().describe('Название банка').optional(),
  bik: z.string().describe('БИК банка').optional(),
  checkingAccount: z.string().describe('Расчетный счет').optional(),
  correspondentAccount: z.string().describe('Корреспондентский счет').optional(),
  registrationUrl: z.string().describe('Ссылка для регистрации контрагентов').optional(),
  avatarUrl: z.string().describe('URL аватарки').optional(),
  type: z.enum(['wildberries', 'fulfillment']).describe('Тип организации').nullable().nullish(),
});

/*z.setErrorMap((issue, ctx) => {
  if (issue.received === "null") {
    return { message: "Обязательно для заполнения" };
  }
  return { message: ctx.defaultError };
});*/
import { useQueryClient } from '@tanstack/react-query';
export default function SettingsPage() {
  const { user } = useJWTAuthContext();

  const { data } = useCabinetsGetActiveSuspense();

  const queryClient = useQueryClient();

  const { id: cabinetActiveId, type, ...restData } = data as CabinetType;

  const { mutate, isPending } = useCabinetsUpdate();
  console.log(restData);
  const form = useForm<z.infer<typeof cabinetsUpdateMutationRequestSchema>>({
    resolver: zodResolver(cabinetsUpdateMutationRequestSchema),
    defaultValues: { ...restData },
  });

  function onSubmit(data: z.infer<typeof cabinetsUpdateMutationRequestSchema>) {
    console.log(data);
    mutate(
      { data, id: cabinetActiveId },
      {
        onSuccess: () => {
          toast.success('Успешно обновлено');
          queryClient.invalidateQueries({
            queryKey: [...cabinetsGetActiveSuspenseQueryKey()],
          });
        },
        onError: (error) => {
          console.log(error?.response?.data.message);
          error?.response?.data.message?.forEach((i: string) => {
            toast.error(i);
          });
        },
      },
    );
  }

  return (
    <div className={'max-w-screen-lg'}>
      <TypographyH2 as={'h1'}>Данные организации</TypographyH2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className={'gap-10 lg:flex'}>
            <SettingsAvatar cabinetActiveId={cabinetActiveId} src={restData.avatarUrl} />
            {/*<SettingsAvatarUpload/>*/}
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Название организации" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={'grid-cols-4 gap-4 space-y-4 sm:grid sm:space-y-0'}>
                <FormField
                  control={form.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormControl>
                        <Input label="Номер телефона организации" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managerFullName"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormControl>
                        <Input label="Имя управляющего" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegramUrl"
                  render={({ field }) => (
                    <FormItem className={'col-span-1'}>
                      <FormControl>
                        <Input label="@ Ник в Telegram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappUrl"
                  render={({ field }) => (
                    <FormItem className={'col-span-1'}>
                      <FormControl>
                        <Input label="@ Ник в WhatsApp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormControl>
                        <Input label="E - mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="actualAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Адрес" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className={'grid-cols-2 gap-10 space-y-4 sm:grid sm:space-y-0'}>
            <div className={'space-y-4'}>
              <TypographyH2>Юридические данные</TypographyH2>
              <FormField
                control={form.control}
                name="legalCompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled label="Название" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={type === 'fulfillment'} label="ИНН" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ogrn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled label="ОГРН" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legalAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled label="Место регистрации" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={'space-y-4'}>
              <TypographyH2>Финансовые данные</TypographyH2>
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Название банка" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bik"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="БИК" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkingAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Расчётный счёт" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correspondentAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="Корр. счёт" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {type === 'wildberries' && (
            <div className={'space-y-4 pt-4'}>
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input label="API Wildberries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className={'space-y-4'}>
            <FormField
              control={form.control}
              name="registrationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled label="Ссылка для регистрации контрагентов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button loading={isPending} type="submit">
            Сохранить
          </Button>
        </form>
      </Form>
    </div>
  );
}
