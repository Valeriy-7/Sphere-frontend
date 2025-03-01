'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import {
  createSupplierDtoSchema,
  deliveriesGetSuppliersQueryKey,
  DeliveryPointDtoType,
  deliveryPointsGetAllDeliveryPoints,
  deliveryPointsGetDeliveryPoints,
  useDeliveriesCreateSupplier,
  useDeliveryPointsGetDeliveryPoints,
} from '@/kubb-gen';
import { useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useJWTAuthUser } from '@/modules/auth';

const textRequired = 'Обязательно для заполнения';

const formSchema = createSupplierDtoSchema;

export function SupplierCreateDialog() {
  const [open, setOpen] = useState(false);

  const { data = [], isPending } = useDeliveryPointsGetDeliveryPoints({ type: 'WILDBERRIES' });
  const { cabinetActive } = useJWTAuthUser();

  const { mutate } = useDeliveriesCreateSupplier({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: deliveriesGetSuppliersQueryKey(),
        });
        setOpen(false);
      },
    },
  });
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cabinetId: cabinetActive.id,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({ data });
  }

  console.log(form.formState.errors);
  console.log(form.getValues());
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={'w-full max-w-none'} size={'xs'} variant="outline">
          Добавить +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить поставщика</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="myform" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Название" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Номер телефона" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketplaceName"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={isPending}
                      onValueChange={(value) => {
                        // Find the selected fruit object by id
                        const find = data.find((i) => i.id === value) as DeliveryPointDtoType;
                        // Set just the fruit name as the field value
                        field.onChange(find.name);
                        form.setValue('address', find.name);
                      }}
                      // Display the selected fruit id
                      value={data.find((i) => i.name === field.value)?.id || ''}
                    >
                      <FormControl>
                        <SelectTrigger className={'w-full'}>
                          <SelectValue placeholder="Название рынка" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.map((i) => (
                          <SelectItem key={i.id} value={i.id}>
                            {i.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled placeholder="Адрес" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Место" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button form="myform" type="submit">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
