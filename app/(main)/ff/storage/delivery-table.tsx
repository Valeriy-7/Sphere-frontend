import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadFilter,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Pencil, Filter } from "lucide-react";

type StorageTableProps = {
  caption: string;
  data: {
    title: string;
    value: string | number;
  }[];
} & React.HTMLAttributes<HTMLTableElement>;
export function StorageTable({
  caption,
  data = [],
  ...props
}: StorageTableProps) {
  return (
    <>
      <Table className={"text-center w-full"} {...props}>
        <TableHeader>
          <TableRowHeader />
          <TableRowFilter />
          <TableRowTotal />
        </TableHeader>
        <TableBody>
          <TableRowStore />
          <TableHeaderProduct />
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <>
              <TableRowProduct />
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRowSize />
              ))}
            </>
          ))}
          {/*   <tr className={'contents'}>
                       <td className={'contents'} colSpan={18}>
                           <div className={'max-h-[500px] overflow-auto'}>
                               <Table className={'contents'}>
                                   <TableHeader className={'contents'}>

                                   </TableHeader>
                                   <TableBody>

                                   </TableBody>
                               </Table>
                           </div>

                       </td>
                    </tr>*/}
        </TableBody>
      </Table>
    </>
  );
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const TableRowFilter = () => (
  <>
    <TableRow rowSpace={"0"}>
      <TableHeadFilter className={"w-1"}></TableHeadFilter>
      <TableHeadFilter colSpan={6}>
        <Input
          className={"px-1 md:text-xs h-auto bg-background"}
          placeholder={"Поиск"}
        ></Input>
      </TableHeadFilter>
      <TableHeadFilter>
        <TableFilterRange />
      </TableHeadFilter>
      <TableHeadFilter></TableHeadFilter>
      <TableHeadFilter>
        <TableFilterRange />
      </TableHeadFilter>
      <TableHeadFilter></TableHeadFilter>
      <TableHeadFilter>
        <TableFilterRange />
      </TableHeadFilter>
      <TableHeadFilter></TableHeadFilter>
      <TableHeadFilter>
        <TableFilterRange />
      </TableHeadFilter>
      <TableHeadFilter></TableHeadFilter>
      <TableHeadFilter>
        <TableFilterRange />
      </TableHeadFilter>
      <TableHeadFilter></TableHeadFilter>
    </TableRow>
  </>
);

const TableFilterRange = () => (
  <>
    <div className="inline-flex gap-1 w-[150px]">
      <Input
        className={"px-1 md:text-xs h-auto bg-background"}
        placeholder={"От"}
      />
      <Input
        className={"px-1 md:text-xs h-auto bg-background"}
        placeholder={"До"}
      />
    </div>
  </>
);

const TableRowTotal = () => (
  <>
    <TableRow rowSpace={"0"}>
      <TableHead className={""} isTotal></TableHead>
      <TableHead className={""} isTotal colSpan={6}>
        Всего
      </TableHead>
      <TableHead className={""} isTotal>
        3000
      </TableHead>
      <TableHead className={""} isTotal>
        2000
      </TableHead>
      <TableHead className={""} isTotal>
        3000
      </TableHead>
      <TableHead className={""} isTotal></TableHead>
      <TableHead className={""} isTotal>
        500
      </TableHead>
      <TableHead className={""} isTotal></TableHead>
      <TableHead className={""} isTotal>
        600
      </TableHead>
      <TableHead className={""} isTotal></TableHead>
      <TableHead className={""} isTotal>
        0
      </TableHead>
      <TableHead className={""} isTotal></TableHead>
    </TableRow>
  </>
);

const TableRowHeader = () => (
  <>
    <TableRow rowSpace={"0"}>
      <TableHead className={"w-1"}>№</TableHead>
      <TableHead colSpan={6}>Магазин</TableHead>
      <TableHead>Продукт</TableHead>
      <TableHead></TableHead>
      <TableHead>Товар (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Брак (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Расходники (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Возвраты с ПВЗ (ед)</TableHead>
      <TableHead>
        <Button variant={"ghost"} size={"icon"}>
          <Filter />
        </Button>
      </TableHead>
    </TableRow>
  </>
);

const TableRowStore = () => (
  <>
    <TableRow>
      <TableCell>77</TableCell>
      <TableCell colSpan={5}>
        <Card className={"p-1 flex items-center gap-2 max-w-[165px]"}>
          <img
            className={"w-[60px] h-[30px] rounded-lg"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UE1dYBdrFfV1Dz09dGWXy7R8TasGsOk7zQ&s"
            alt=""
          />
          <div className={"text-min font-medium"}>
            Logistik Company <br />
            ООО “Логистик”
          </div>
        </Card>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>1000</TableCell>
      <TableCell></TableCell>
      <TableCell>2000</TableCell>
      <TableCell></TableCell>
      <TableCell>170</TableCell>
      <TableCell></TableCell>
      <TableCell>550</TableCell>
      <TableCell></TableCell>
      <TableCell>33</TableCell>
      <TableCell></TableCell>
    </TableRow>
  </>
);

const TableHeaderProduct = () => (
  <>
    <TableRow className={"font-medium"}>
      <TableCell level={1}>№</TableCell>
      <TableCell level={1} colSpan={4}>
        Наименование
      </TableCell>
      <TableCell level={1}>Артиукл</TableCell>
      <TableCell level={1}>Место</TableCell>
      <TableCell level={1}>Кол-во</TableCell>
      <TableCell level={1}>Место</TableCell>
      <TableCell level={1}>Кол-во</TableCell>
      <TableCell level={1}>Место</TableCell>
      <TableCell level={1}>Кол-во</TableCell>
      <TableCell level={1}>Место</TableCell>
      <TableCell level={1}>Кол-во</TableCell>
      <TableCell level={1}>Место</TableCell>
      <TableCell level={1}>Кол-во</TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  </>
);

const TableRowProduct = () => (
  <>
    <TableRow rowSpace={"xs"}>
      <TableCell level={1}>1</TableCell>
      <TableCell level={1} colSpan={4}>
        Футболка женская длинное название
      </TableCell>
      <TableCell level={1}>36749595</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>0</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}>
        <Pencil strokeWidth={1} className={"w-4 inline-flex"}></Pencil>
      </TableCell>
    </TableRow>
  </>
);

const TableRowSize = () => (
  <>
    <TableRow rowSpace={"xs"}>
      <TableCell level={1}></TableCell>
      <TableCell level={1} colSpan={4}>
        Размер
      </TableCell>
      <TableCell level={1}>S</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>0</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  </>
);
