"use client";

import { StorageWBCard } from "./StorageWBCard";

import * as React from "react";

import { StorageWBCity } from "./StorageWBCity";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  type ProductListItemDtoType,
  useWbGetProductsSuspense,
} from "@/kubb-gen";
import { useJWTAuthContext } from "@/modules/auth";

export function RowSize({ children, className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid-cols-subgrid col-span-5 flex justify-around [&_div]:flex-1 gap-1 items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

const rowSize = ["S / 42", "M / 44", "L / 46", "XL / 48", "XXL / 50"];

function NumericSizes({ numericSizes }: { numericSizes: string[] }) {
  const emptyList = new Array(rowSize.length - numericSizes.length).fill(0);
  const list = [...numericSizes, ...emptyList];
  return (
    <RowSize className={"bg-white rounded-lg dark:bg-transparent border"}>
      {list.map((i, index) => (
        <div key={index}>{i}</div>
      ))}
    </RowSize>
  );
}

export default function StorageWBPage() {
  const { user } = useJWTAuthContext();
  const cabinetId = user.cabinets.filter((i) => i.isActive)[0].id;
  const {
    data: { stats, items },
  } = useWbGetProductsSuspense({ cabinetId });

  return (
    <div className={"text-center text-xs"}>
      <div
        className={cn(
          "grid grid-cols-[200px_repeat(9,minmax(0,1fr))] gap-1 auto-rows-[minmax(2rem,1fr)] items-center",
          "bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg font-semibold py-[2px]",
        )}
      >
        <div>Карточки</div>
        <div>Всего</div>
        <div>На складах</div>
        <div>К клиенту</div>
        <div>От клиента</div>
        <RowSize>
          {rowSize.map((i) => (
            <div key={i}>{i}</div>
          ))}
        </RowSize>
      </div>
      <div
        className={cn(
          "grid grid-cols-[200px_repeat(9,minmax(50px,1fr))] gap-1 auto-rows-[minmax(2rem,1fr)] items-center",
          "mb-1.5",
          "bg-white dark:bg-transparent rounded-bl-lg rounded-br-lg border",
        )}
      >
        <div></div>
        <div>{stats.totalProducts}</div>
        <div>{stats.totalInStock}</div>
        <div>{stats.totalInTransitToClient}</div>
        <div>{stats.totalInTransitFromClient}</div>
        <RowSize></RowSize>
      </div>

      {items.map((i) => (
        <StorageWBRow key={i.id} {...i} />
      ))}
    </div>
  );
}

function StorageWBRow(props: ProductListItemDtoType) {
  return (
    <div
      className={cn(
        "grid grid-cols-[200px_repeat(9,minmax(50px,1fr))] gap-1 mt-2.5",
      )}
    >
      <div className={"row-span-2"}>
        <StorageWBCard {...props}></StorageWBCard>
      </div>

      <div
        className={cn(
          "grid-cols-subgrid col-span-4 grid auto-rows-[minmax(2rem,1fr)] items-center",
          "bg-white rounded-lg dark:bg-transparent border",
        )}
      >
        <div>{props.total}</div>
        <div>{props.inStock}</div>
        <div className={"text-green-500"}>{props.inTransitToClient}</div>
        <div className={"text-red-500"}>{props.inTransitFromClient}</div>
      </div>
      <NumericSizes numericSizes={props.numericSizes}></NumericSizes>

      <div
        className={cn(
          "grid-cols-subgrid col-span-9",
          "bg-white rounded-lg p-2 dark:bg-transparent border border-b-primary content-center",
        )}
      >
        <ScrollArea className={"whitespace-nowrap"}>
          <div className={"flex gap-6 items-center"}>
            {props.cities.map((i) => (
              <div>
                <StorageWBCity {...i} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
