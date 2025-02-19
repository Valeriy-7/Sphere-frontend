import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadFilter,
  TableRow,
  TableRowExpand,
} from "@/components/ui/table";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Pencil, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getColSizeList } from "@/lib/TableHelpers";
import { TableCardImgText } from "@/components/date-table/table-img-text";
type StorageTableProps = {
  caption: string;
  data: {
    title: string;
    value: string | number;
  }[];
} & React.HTMLAttributes<HTMLTableElement>;

const { colSizeList } = getColSizeList([
  "w-[3%]",
  "w-[22%]",
  "w-[4%]",
  "w-[11%]",

  "w-[4%]",
  "w-[11%]",
  "w-[4%]",
  "w-[11%]",

  "w-[4%]",
  "w-[11%]",
  "w-[4%]",
  "w-[11%]",

  "w-[3%]",
  "w-[3%]",
]);

export function StorageTableNew({
  caption,
  data = [],
  ...props
}: StorageTableProps) {
  return (
    <div
      style={
        {
          "--storage-column-icon": "3%",
          "--storage-column-head": "11%",
          "--storage-column-place": "4%",
        } as React.CSSProperties
      }
    >
      <Table
        _colSizeList={colSizeList}
        className={"text-center w-full table-fixed relative"}
        {...props}
      >
        <TableHeader>
          <TableRowHeader />
          <TableRowFilter />
        </TableHeader>
        <TableBody>
          <TableRowStore />
          <TableRowExpand colSpan={13}>
            <ScrollArea
              className={"flex max-h-[500px] flex-col overflow-y-auto"}
            >
              <Table _colSizeList={colSizeList} className={"table-fixed"}>
                <TableHeader>
                  <TableHeaderProduct />
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (i) => (
                      <>
                        <TableRowProduct />
                        <TableRowSize />
                        <TableRowSize />
                        <TableRowSize />
                        <TableRowSize />
                      </>
                    ),
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TableRowExpand>
          <TableRowStore />
        </TableBody>
      </Table>
    </div>
  );
}

const TableRowHeader = () => (
  <>
    <TableRow rowSpace={false}>
      <TableHead className={"w-[--storage-column-icon]"}>№</TableHead>
      <TableHead className={"w-[calc(var(--storage-column-head)*2)]"}>
        Магазин
      </TableHead>
      <TableHead className={"w-[--storage-column-place]"}></TableHead>
      <TableHead className={"w-[--storage-column-head]"}>Продукт</TableHead>
      <TableHead className={"w-[--storage-column-place]"}></TableHead>
      <TableHead className={"w-[--storage-column-head]"}>Товар (ед)</TableHead>
      <TableHead className={"w-[--storage-column-place]"}></TableHead>
      <TableHead className={"w-[--storage-column-head]"}>Брак (ед)</TableHead>
      <TableHead className={"w-[--storage-column-place]"}></TableHead>
      <TableHead className={"w-[--storage-column-head]"}>
        Расходники (ед)
      </TableHead>
      <TableHead className={"w-[--storage-column-place]"}></TableHead>
      <TableHead className={"w-[--storage-column-head]"}>
        Возвраты с ПВЗ (ед)
      </TableHead>
      <TableHead className={"w-[--storage-column-icon]"}>1</TableHead>
    </TableRow>
  </>
);
const TableHeaderProduct = () => (
  <>
    <TableRow rowSpace={"xs"} className={"font-medium"}>
      <TableCell className={"sticky top-0 w-[--storage-column-icon]"} level={1}>
        №
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Наименование
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Артиукл
      </TableCell>
      <TableCell
        className={"sticky top-0 w-[--storage-column-place]"}
        level={1}
      >
        Место
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Кол-во
      </TableCell>
      <TableCell
        className={"sticky top-0 w-[--storage-column-place]"}
        level={1}
      >
        Место
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Кол-во
      </TableCell>
      <TableCell
        className={"sticky top-0 w-[--storage-column-place]"}
        level={1}
      >
        Место
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Кол-во
      </TableCell>
      <TableCell
        className={"sticky top-0 w-[--storage-column-place]"}
        level={1}
      >
        Место
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Кол-во
      </TableCell>
      <TableCell
        className={"sticky top-0 w-[--storage-column-place]"}
        level={1}
      >
        Место
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-head]"} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={"sticky top-0 w-[--storage-column-icon]"} level={1}>
        <Pencil strokeWidth={1} className={"w-4 inline-flex"}></Pencil>
      </TableCell>
    </TableRow>
  </>
);

const TableRowStore = () => (
  <>
    <TableRow>
      <TableCell className={"w-[--storage-column-icon]"}>№</TableCell>
      <TableCell className={"w-[calc(var(--storage-column-head)*2)]"}>
        <TableCardImgText
          image={{
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UE1dYBdrFfV1Dz09dGWXy7R8TasGsOk7zQ&s",
          }}
          title={"Logistik Company"}
          text={"ООО “Логистик”"}
        />
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"}></TableCell>
      <TableCell className={"w-[--storage-column-head]"}>1000</TableCell>
      <TableCell className={"w-[--storage-column-place]"}></TableCell>
      <TableCell className={"w-[--storage-column-head]"}>2000</TableCell>
      <TableCell className={"w-[--storage-column-place]"}></TableCell>
      <TableCell className={"w-[--storage-column-head]"}>3000</TableCell>
      <TableCell className={"w-[--storage-column-place]"}></TableCell>
      <TableCell className={"w-[--storage-column-head]"}>5000</TableCell>
      <TableCell className={"w-[--storage-column-place]"}></TableCell>
      <TableCell className={"w-[--storage-column-head]"}>6000</TableCell>
      <TableCell className={"w-[--storage-column-icon]"}>1</TableCell>
    </TableRow>
  </>
);

const TableRowFilter = () => (
  <>
    <TableRow rowSpace={"md"}>
      <TableHead isTotal className={"w-[--storage-column-icon]"}></TableHead>
      <TableHead isTotal className={"w-[calc(var(--storage-column-head)*2)]"}>
        <Input
          className={"px-1 md:text-xs h-auto"}
          placeholder={"Поиск"}
        ></Input>
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
      <TableHead isTotal className={"w-[--storage-column-head]"}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
      <TableHead isTotal className={"w-[--storage-column-head]"}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
      <TableHead isTotal className={"w-[--storage-column-head]"}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
      <TableHead isTotal className={"w-[--storage-column-head]"}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
      <TableHead isTotal className={"w-[--storage-column-head]"}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={"w-[--storage-column-place]"}></TableHead>
    </TableRow>
  </>
);

const TableFilterRange = () => (
  <>
    <div className="inline-flex gap-1 max-w-[150px]">
      <Input className={"px-1 md:text-xs h-auto"} placeholder={"От"} />
      <Input className={"px-1 md:text-xs h-auto"} placeholder={"До"} />
    </div>
  </>
);

const TableRowTotal = () => (
  <>
    <TableRow rowSpace={"0"}>
      <TableHead isTotal></TableHead>
      <TableHead isTotal colSpan={6}>
        Всего
      </TableHead>
      <TableHead isTotal>3000</TableHead>
      <TableHead isTotal>2000</TableHead>
      <TableHead isTotal>3000</TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>500</TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>600</TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>0</TableHead>
      <TableHead isTotal></TableHead>
    </TableRow>
  </>
);

const TableRowProduct = () => (
  <>
    <TableRow rowSpace={"xs"}>
      <TableCell className={"w-[--storage-column-icon]"} level={1}>
        1
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        Футболка женская длинное название
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        36749595
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        П - 13
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        200
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-icon]"} level={1}></TableCell>
    </TableRow>
  </>
);

const TableRowSize = () => (
  <>
    <TableRow rowSpace={"xs"}>
      <TableCell className={"w-[--storage-column-icon]"} level={1}></TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}></TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        S
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}></TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        200
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-place]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-head]"} level={1}>
        -
      </TableCell>
      <TableCell className={"w-[--storage-column-icon]"} level={1}></TableCell>
    </TableRow>
  </>
);
