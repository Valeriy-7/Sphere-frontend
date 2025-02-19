"use client";
import { AppTabs } from "@/components/app-tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import AppSelect from "@/components/app-select";

const FormSchema = z.object({
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "That's not a date!",
  }),
  select: z.array(z.object({ label: z.string(), value: z.string() })),
});

export default function UiControlsPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      select: [],
    },
  });
  return (
    <>
      <AppTabs
        list={[
          { label: "Услуги", href: "/ui/controls" },
          { label: "Логистика", href: "/ff/services/logistics" },
          { label: "Расходники", href: "/ff/services/supplies" },
          { label: "Поставки на ФФ", href: "/ff/services", disabled: true },
        ]}
      />
      <Form {...form}>
        <div className={"flex flex-wrap gap-1"}>
          <div>
            <Button>primary</Button>
            <Button disabled>disabled</Button>
          </div>
          <div>
            <Button variant={"outline"}>outline</Button>
            <Button disabled variant={"outline"}>
              disabled
            </Button>
          </div>
          <div>
            <Button variant={"secondary"}>secondary</Button>
            <Button disabled variant={"secondary"}>
              disabled
            </Button>
          </div>
          <div>
            <Button variant={"flat"}>flat</Button>
          </div>
          <div>
            <Button variant={"ghost"}>ghost</Button>
          </div>
          <div>
            <Button variant={"destructive"}>destructive</Button>
          </div>
          <div>
            <Button variant={"link"}>link</Button>
          </div>
        </div>
        <div className={"flex flex-wrap gap-1"}>
          <div>
            <Button size={"xs"}>Группировка</Button>
          </div>
          <div>
            <Button size={"xs"} variant={"outline"}>
              outline
            </Button>
          </div>
          <div>
            <Button size={"xs"} variant={"secondary"}>
              secondary
            </Button>
          </div>
          <div>
            <Button size={"xs"} variant={"flat"}>
              flat
            </Button>
          </div>
          <div>
            <Button size={"xs"} variant={"ghost"}>
              ghost
            </Button>
          </div>
          <div>
            <Button size={"xs"} variant={"destructive"}>
              destructive
            </Button>
          </div>
          <div>
            <Button size={"xs"} variant={"link"}>
              link
            </Button>
          </div>
        </div>
        <div className={"flex flex-wrap gap-1"}>
          <div>
            <Input value={"Группировка"} />
            <Input disabled value={"Группировка"} />
          </div>
          <div>
            <Input value={"Группировка"} size={"xs"} />
            <Input disabled value={"Группировка"} size={"xs"} />
          </div>
        </div>
        <div className={"flex flex-wrap gap-1"}>
          <div>
            <DatePicker form={form} name={"date"} />
          </div>
          <div>
            <Input value={"Группировка"} size={"xs"} />
          </div>
          <div>
            <AppSelect
              isMultiple
              form={form}
              name={"select"}
              options={[
                { label: "Услуги", value: "/ui/controls" },
                { label: "Логистика", value: "/ff/services/logistics" },
                { label: "Расходники", value: "/ff/services/supplies" },
                { label: "Поставки на ФФ", value: "/ff/services" },
              ]}
            />
          </div>
        </div>
      </Form>
    </>
  );
}
