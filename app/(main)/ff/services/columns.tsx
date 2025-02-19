"use client";

import { ColumnDef, Cell } from "@tanstack/react-table";
import { Check, Pencil, X } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { TableCardImg } from "@/components/date-table/table-card-img";
import { formatCurrency } from "@/lib/formatCurrency";
import { TableCardImgText } from "@/components/date-table/table-img-text";
import { RUB } from "@/lib/constants/rub";
import ImageUpload from "@/components/image-upload-validator";
import type {ServiceType} from "@/kubb-gen";



export const columns: ColumnDef<ServiceType>[] = [
  {
    accessorKey: "imageUrl",
  },
  {
    accessorKey: "number",
    header: "№",
    meta: {
      className: "w-[50px]",
      editDisabled: true,
    },
  },
  {
    accessorKey: "name",
    header: "Услуги",
    meta: {
      className: "w-[20%]",
    },
    cell: ({
      getValue,
      row: { index, original },
      column: { id },
      table,
      column,
    }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      if (!table.options.meta?.isEdit || column.columnDef.meta?.editDisabled) {
        return (
          <TableCardImgText image={{ src: original.image }} title={value} />
        );
      }

      return (
        <TableCardImgText slotImage={<ImageUpload onFile={(file)=>{
          table.options.meta?.updateData(index, 'imageUrl', file)

        }} src={original.image} />}>
          <textarea
            style={{
              fieldSizing: "content",
              minInlineSize: "5ch",
            }}
            className={
              "break-all text-center min-w-3 block w-full rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            }
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        </TableCardImgText>
      );
    },
  },
  {
    accessorKey: "price",
    header: `Цена за единицу ${RUB}`,
    meta: {
      className: "w-[15%]",
    },
    /*  cell: ({ getValue }) => {
      return formatCurrency(getValue())
    },*/
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "edit",
    meta: {
      className: "w-[70px] text-right",
    },
    cell: ({ row: { index }, table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) return;
      return (
        <div className={"text-right"}>
          <button
            onClick={() => meta?.deleteRow(index)}
            className={"transition-colors p-1 rounded-lg"}
          >
            <X strokeWidth={1} />
          </button>
        </div>
      );
    },
    header: ({ table }) => {
      const { meta } = table.options;
      if (!meta?.isEdit) {
        return (
          <button
            onClick={() => meta?.setIsEdit(true)}
            className={"hover:bg-white/20 transition-colors p-1 rounded-lg"}
          >
            <Pencil />
          </button>
        );
      }
      return (
        <>
          <button
            onClick={() => {
              meta?.setIsEdit(false);
              meta?.onSubmit();
            }}
            className={"hover:bg-white/20 transition-colors p-1 rounded-lg"}
          >
            <Check />
          </button>
          <button
            onClick={() => {
              meta?.resetData();
              meta?.setIsEdit(false);
            }}
            className={"hover:bg-white/20 transition-colors p-1 rounded-lg"}
          >
            <X />
          </button>
        </>
      );
    },
  },
];
