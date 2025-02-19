"use client";
import React, { useContext, useState } from "react";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/formatCurrency";
import { CurrencyInput } from "@/components/currency-input";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { PortalContext } from "./portal-context";
import {fa} from "@faker-js/faker";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    isEdit?: boolean;
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteRow?: (rowIndex: number) => void;
    onSubmit: (props: OnSubmitProps) => void;
    resetData?: () => void;
  }
}

// Give our default column cell renderer editing superpowers!

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  onSubmit: (props: OnSubmitProps) => void;
  //portalContainer:HTMLElement | null
}

type OnSubmitProps = {
  removeIds: number[];
  newRows: [];
  updateRows: [];
  rows: [];
};

export function ServicesTable<TData, TValue>({
  columns,
  initialData,
  onSubmit,
  //portalContainer,
}: TableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData);

  const portalContainer = useContext(PortalContext);

  const defaultColumn: Partial<ColumnDef<TData>> = {
    cell: ({ getValue, row: { index }, column: { id }, table, column }) => {
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
        if (typeof value === "number") {
          return formatCurrency(value);
        }
        return value;
      }

      if (typeof value === "number") {
        return (
          <CurrencyInput
            size={"xs"}
            style={{ fieldSizing: "content" }}
            className={
              "text-center block w-full rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ml-auto mr-auto"
            }
            value={value}
            onChange={(val) => {
              if (val) return setValue(val);
              setValue(0);
            }}
            onBlur={onBlur}
          />
        );
      }

      return (
        <textarea
          style={{ fieldSizing: "content" }}
          className={
            "text-center block w-full rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          }
          value={value as string}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={onBlur}
        />
      );
    },
  };

  const [isEdit, setIsEdit] = useState(false);

  const resetData = () => {
    setData(initialData);
  };
  const [idsRemoveRow, setIdsRemoveRow] = useState<number[]>([]);

  const addRow = () => {
    setIsEdit(true);
    setData((old) => [
      {
        name: "",
        number: old.length,
        id: old.length,
        price: 0,
        description: "",
        _isNew: true,
      },
      ...old,
    ]);
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      resetData,
      isEdit,
      setIsEdit,
      onSubmit: () =>
        onSubmit({
          newRows: data.filter((i) => i._isNew),
          updateRows: data.filter((i) => i._isUpdate && !i._isNew),
          removeIds: idsRemoveRow,
          rows: data,
        }),
      deleteRow: (rowIndex) => {
        setData((old) =>
          old.filter((row, index) => {
            if (index == rowIndex) {
              setIdsRemoveRow([row.id, ...idsRemoveRow]);
            }

            return index !== rowIndex;
          }),
        );
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) => {
          const newData = old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
                _isUpdate: true,
              };
            }
            return row;
          });
          //onSubmit(newData)

          return newData;
        });
      },
    },
    debugTable: true,
    state:{
      columnVisibility: {
        imageUrl: false,
      },
    }
  });
  return (
    <>
      {portalContainer &&
        createPortal(
          <Button onClick={addRow}>Добавить</Button>,
          portalContainer,
        )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.columnDef.meta?.className}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
