"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { X } from "lucide-react";

import { DataTableTotal } from "@/components/date-table/data-table-total";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MarketImg } from "@/app/(main)/wb/delivery/ff/create/market-img";
import * as React from "react";
import {
  DPBody,
  DPItem,
  DPTitle,
} from "@/app/(main)/wb/delivery/ff/create/delivery-create-row";
import { CheckboxItem, FormSchema, FormValues } from "./schema";
import { DPSelect } from "@/app/(main)/wb/delivery/ff/create/DPList";
import { DatePicker } from "@/components/date-picker";
import { CurrencyInput } from "@/components/currency-input";
import { formatCurrency } from "@/lib/formatCurrency";

const getAmountReduce = (list: number[]) => list.reduce((p, c) => p + c, 0);

export default function NestedDynamicForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      place: "",
      rows: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  function onSubmit(data: FormValues) {
    console.log(data);
  }

  const totalColumnValue = [
    getAmountReduce(form.getValues().rows.map((i) => i.count ?? 0)),
    getAmountReduce(form.getValues().rows.map((i) => i.price ?? 0)),
    0,
    getAmountReduce(
      form
        .getValues()
        .rows.map((row) =>
          getAmountReduce(row.checkboxList.map((i) => i.price)),
        ),
    ),
  ];

  const tableTotal = [
    {
      title: "Количество (ед)",
      value: formatCurrency(totalColumnValue[0]),
    },
    {
      title: "Цена товаров (₽)",
      value: formatCurrency(totalColumnValue[1]),
    },
    {
      title: "Логистика до ФФ (₽)",
      value: formatCurrency(totalColumnValue[2]),
    },
    {
      title: "Цена за услуги ФФ (₽)",
      value: formatCurrency(totalColumnValue[3]),
    },
    {
      title: "Сумма (₽)",
      value: formatCurrency(
        totalColumnValue[1] + totalColumnValue[2] + totalColumnValue[3],
      ),
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-3"}
      >
        <div
          className={"grid xl:grid-cols-12 sm:grid-cols-6 grid-cols-0 gap-4"}
        >
          <div className={"col-span-2"}>
            <DataTableTotal
              data={[
                {
                  title: "Дата поставки",
                  value: <DatePicker<FormValues> form={form} name={"date"} />,
                },
              ]}
            />
          </div>
          <div className={"col-span-2"}>
            <DataTableTotal
              data={[
                {
                  title: "Грузовые места",
                  value: (
                    <FormField
                      control={form.control}
                      name="place"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input size={"xs"} {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className={"col-span-8"}>
            <DataTableTotal data={tableTotal} />
          </div>
        </div>
        <div>
          <ScrollArea
            className={"bg-white border dark:bg-transparent p-2 rounded-lg"}
          >
            <div className={"flex gap-4 items-center"}>
              {Array(20)
                .fill({})
                .map((val, i) => (
                  <button
                    key={i}
                    className={"cursor-pointer flex-none"}
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        id: String(i),
                        count: 0,
                        price: 0,
                        checkboxList: [],
                        supplierList: [],
                      });
                    }}
                  >
                    <MarketImg />
                  </button>
                ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {form.formState.errors.rows?.message}
        </div>

        {fields.map((field, index) => (
          <div
            className={
              "bg-white border dark:bg-transparent rounded-lg p-2 text-min text-center flex flex-wrap gap-4 relative pr-[40px]"
            }
            key={field.id}
          >
            <MarketImg />
            <DPItem>
              <DPTitle>Данные</DPTitle>
              <DPBody className={"h-full"}>
                <ul className={"text-left space-y-0.5"}>
                  <li className={"text-primary"}>Платье чёрное</li>
                  <li>Арт: 187677</li>
                  <li>Цвет: Розовый</li>
                  <li>Категория: Платья</li>
                  <li>Размеры:</li>
                  <li>S / M / L / XL</li>
                </ul>
              </DPBody>
            </DPItem>
            <DPItem>
              <DPTitle>Заказать (ед)</DPTitle>
              <FormField
                control={form.control}
                name={`rows.${index}.count`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CurrencyInput {...field} size={"xs"} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DPTitle>Цена (₽)</DPTitle>
              <FormField
                control={form.control}
                name={`rows.${index}.price`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <CurrencyInput {...field} size={"xs"} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </DPItem>

            <DPSelect
              isSelect
              title={"Услуги"}
              items={[
                { label: "Стирка", price: 10, id: "1" },
                { label: "Глаженье", price: 10, id: "2" },
                { label: "Глаженье", price: 10, id: "3" },
                { label: "Глаженье", price: 10, id: "4" },
                { label: "Глаженье", price: 10, id: "5" },
                { label: "Глаженье", price: 10, id: "6" },
              ]}
              tForm={{ form, index, name: `checkboxList` }}
            />

            <DPSelect
              isSelect
              title={"Расходники ФФ"}
              items={[
                { label: "Стирка", price: 10, id: "1" },
                { label: "Глаженье", price: 10, id: "2" },
                { label: "Глаженье", price: 10, id: "3" },
                { label: "Глаженье", price: 10, id: "4" },
                { label: "Глаженье", price: 10, id: "5" },
                { label: "Глаженье", price: 10, id: "6" },
              ]}
              tForm={{ form, index, name: `checkboxList` }}
            />

            <DPSelect
              isSelect
              title={"Расходники Магазина"}
              items={[
                { label: "Стирка", price: 10, id: "1" },
                { label: "Глаженье", price: 10, id: "2" },
                { label: "Глаженье", price: 10, id: "3" },
                { label: "Глаженье", price: 10, id: "4" },
                { label: "Глаженье", price: 10, id: "5" },
                { label: "Глаженье", price: 10, id: "6" },
              ]}
              tForm={{ form, index, name: `checkboxList` }}
            />

            <DPSelect
              isSupplier
              isSelect
              title={"Поставщик"}
              items={[
                { label: "Пушкин А.С", id: "1" },
                { label: "Пушкин А.С", id: "2" },
                { label: "Пушкин А.С", id: "3" },
                { label: "Пушкин А.С", id: "4" },
                { label: "Пушкин А.С", id: "5" },
                { label: "Пушкин А.С", id: "6" },
              ]}
              tForm={{ form, index, name: `supplierList` }}
            />
            <Button
              className={"absolute right-0 top-0"}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
            >
              <X />
            </Button>
          </div>
        ))}

        <div className={"text-right"}>
          <Button type="submit">Создать поставку</Button>
        </div>
      </form>
    </Form>
  );
}
