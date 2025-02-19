import { MarketImg } from "./market-img";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { DPSelect } from "@/app/(main)/wb/delivery/ff/create/DPList";

export type DPProps = PropsWithChildren & {
  className?: string;
};

export function DeliveryCreateRow() {
  return (
    <div
      className={
        "bg-white border dark:bg-transparent rounded-lg p-2 text-min text-center flex flex-wrap gap-4"
      }
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
        <Input size={"xs"} />
        <DPTitle>Цена (₽)</DPTitle>
        <Input size={"xs"} />
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
      ></DPSelect>
    </div>
  );
}

export function DPTitle({ children, className }: DPProps) {
  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground rounded-sm px-2 py-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DPItem({ children, className }: DPProps) {
  return (
    <div className={cn("space-y-1 w-[100px] flex flex-col", className)}>
      {children}
    </div>
  );
}

export function DPBody({ children, className }: DPProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-transparent border rounded-sm px-2 py-1 h-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
