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
  useAvatarUploadAvatar,
} from '@/kubb-gen';
import { useJWTAuthContext } from '@/modules/auth';

/*z.setErrorMap((issue, ctx) => {
  if (issue.received === "null") {
    return { message: "Обязательно для заполнения" };
  }
  return { message: ctx.defaultError };
});*/
import { useQueryClient } from '@tanstack/react-query';
import ImageUpload from '@/components/image-upload-validator';
export default function SettingsPage() {
  const { user, fetchUser } = useJWTAuthContext();

  const { data } = useCabinetsGetActiveSuspense();
  const { mutateAsync: mutateAvatar } = useAvatarUploadAvatar({
    mutation: {
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
      onSuccess: ({ avatarUrl }) => {
        queryClient.setQueriesData(cabinetsGetActiveSuspenseQueryKey(), (old) => ({
          ...old,
          avatarUrl,
        }));
        fetchUser();
      },
    },
  });
  const queryClient = useQueryClient();

  const { id: cabinetActiveId, type, ...restData } = data as CabinetType;

  const { mutate, isPending } = useCabinetsUpdate();

  const form = useForm<z.infer<typeof cabinetsUpdateMutationRequestSchema>>({
    resolver: zodResolver(cabinetsUpdateMutationRequestSchema),
    defaultValues: { ...restData },
  });

  const registrationUrl = `${window.location.origin}/login?registrationUrl=${restData.registrationUrl}`;

  function onSubmit(data: z.infer<typeof cabinetsUpdateMutationRequestSchema>) {
    mutate(
      { data, id: cabinetActiveId },
      {
        onSuccess: () => {
          toast.success('Успешно обновлено');
          queryClient.invalidateQueries({
            queryKey: [...cabinetsGetActiveSuspenseQueryKey()],
          });
          fetchUser();
        },
        onError: (error) => {
          console.log(error?.response?.data.errors);
          console.log(error?.response?.data.message);

          error?.response?.data.errors?.forEach(
            ({
              field,
              type,
              message,
            }: {
              field: string;
              message: string;
              name: string;
              type: string;
            }) => {
              form.setError(field, { type, message });
            },
          );
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
            <SettingsAvatar>
              <ImageUpload
                onFile={(file, imageUrl) => {
                  mutateAvatar({ cabinetId: cabinetActiveId, data: { file } });
                }}
                src={restData.avatarUrl}
              ></ImageUpload>
            </SettingsAvatar>
            {/*<SettingsAvatarUpload/>*/}
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Название организации" {...field} />
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
                        <Input placeholder="Номер телефона организации" {...field} />
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
                        <Input placeholder="Имя управляющего" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'grid-cols-12 gap-4 space-y-4 sm:grid sm:space-y-0'}>
                <FormField
                  control={form.control}
                  name="telegramUrl"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormControl>
                        <Input placeholder="@ Ник в Telegram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappUrl"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormControl>
                        <Input placeholder="@ Ник в WhatsApp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormControl>
                        <Input placeholder="E - mail" {...field} />
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
                      <Input placeholder="Адрес" {...field} />
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
          {type !== 'fulfillment' && (
            <div className={'space-y-4'}>
              <Input disabled label="Ссылка для регистрации контрагентов" value={registrationUrl} />
            </div>
          )}

          <Button loading={isPending} type="submit">
            Сохранить
          </Button>
        </form>
      </Form>
    </div>
  );
}
