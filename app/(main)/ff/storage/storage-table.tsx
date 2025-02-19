import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadFilter,
  TableRow,
} from '@/components/ui/table';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Pencil, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
type StorageTableProps = {
  caption: string;
  data: {
    title: string;
    value: string | number;
  }[];
} & React.HTMLAttributes<HTMLTableElement>;
export function StorageTable({ caption, data = [], ...props }: StorageTableProps) {
  return (
    <div
      style={
        {
          '--storage-column-icon': '3%',
          '--storage-column-head': '11%',
          '--storage-column-place': '4%',
        } as React.CSSProperties
      }
    >
      <Table className={'relative w-full table-fixed text-center'} {...props}>
        <TableHeader>
          <TableRowHeader />
          <TableRowFilter />
        </TableHeader>
        <TableBody>
          <TableRowStore />

          <tr>
            <td className={'rounded-lg border bg-white py-2 dark:bg-transparent'} colSpan={18}>
              <ScrollArea className={'flex max-h-[500px] flex-col overflow-y-auto'}>
                <Table className={'table-fixed'}>
                  <TableHeader>
                    <TableHeaderProduct />
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                      <>
                        <TableRowProduct />
                        <TableRowSize />
                        <TableRowSize />
                        <TableRowSize />
                        <TableRowSize />
                      </>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </td>
          </tr>
          <TableRowStore />
        </TableBody>
      </Table>
    </div>
  );
}

const TableRowHeader = () => (
  <>
    <TableRow rowSpace={false}>
      <TableHead className={'w-[--storage-column-icon]'}>№</TableHead>
      <TableHead className={'w-[calc(var(--storage-column-head)*2)]'}>Магазин</TableHead>
      <TableHead className={'w-[--storage-column-place]'}>Место</TableHead>
      <TableHead className={'w-[--storage-column-head]'}>Продукт</TableHead>
      <TableHead className={'w-[--storage-column-place]'}></TableHead>
      <TableHead className={'w-[--storage-column-head]'}>Товар (ед)</TableHead>
      <TableHead className={'w-[--storage-column-place]'}></TableHead>
      <TableHead className={'w-[--storage-column-head]'}>Брак (ед)</TableHead>
      <TableHead className={'w-[--storage-column-place]'}></TableHead>
      <TableHead className={'w-[--storage-column-head]'}>Расходники (ед)</TableHead>
      <TableHead className={'w-[--storage-column-place]'}></TableHead>
      <TableHead className={'w-[--storage-column-head]'}>Возвраты с ПВЗ (ед)</TableHead>
      <TableHead className={'w-[--storage-column-icon]'}>1</TableHead>
    </TableRow>
  </>
);
const TableHeaderProduct = () => (
  <>
    <TableRow rowSpace={'xs'} className={'font-medium'}>
      <TableCell className={'sticky top-0 w-[--storage-column-icon]'} level={1}>
        №
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Наименование
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Артиукл
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-place]'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-place]'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-place]'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-place]'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-place]'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-head]'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0 w-[--storage-column-icon]'} level={1}>
        1
      </TableCell>
    </TableRow>
  </>
);

const TableRowStore = () => (
  <>
    <TableRow>
      <TableCell className={'w-[--storage-column-icon]'}>№</TableCell>
      <TableCell className={'w-[calc(var(--storage-column-head)*2)]'}>
        <Card className={'inline-flex max-w-[165px] items-center gap-2 p-1'}>
          <img
            className={'h-[30px] w-[60px] rounded-lg'}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UE1dYBdrFfV1Dz09dGWXy7R8TasGsOk7zQ&s"
            alt=""
          />
          <div className={'text-min font-medium'}>
            Logistik Company <br />
            ООО “Логистик”
          </div>
        </Card>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>1000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>2000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>3000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>5000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>6000</TableCell>
      <TableCell className={'w-[--storage-column-icon]'}>1</TableCell>
    </TableRow>
  </>
);

const TableRowFilter = () => (
  <>
    <TableRow rowSpace={'md'}>
      <TableHead isTotal className={'w-[--storage-column-icon]'}></TableHead>
      <TableHead isTotal className={'w-[calc(var(--storage-column-head)*2)]'}>
        <Input className={'h-auto px-1 md:text-xs'} placeholder={'Поиск'}></Input>
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
    </TableRow>
  </>
);

const TableFilterRange = () => (
  <>
    <div className="inline-flex max-w-[150px] gap-1">
      <Input className={'h-auto px-1 md:text-xs'} placeholder={'От'} />
      <Input className={'h-auto px-1 md:text-xs'} placeholder={'До'} />
    </div>
  </>
);

const TableRowTotal = () => (
  <>
    <TableRow rowSpace={'0'}>
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
    <TableRow rowSpace={'xs'}>
      <TableCell className={'sticky top-[20px] w-[--storage-column-icon]'} level={1}>
        1
      </TableCell>
      <TableCell className={'sticky top-[20px] w-[--storage-column-head]'} level={1}>
        Футболка женская длинное название
      </TableCell>
      <TableCell className={'sticky top-[20px] w-[--storage-column-head]'} level={1}>
        36749595
      </TableCell>
      <TableCell className={'sticky top-[20px] w-[--storage-column-place]'} level={1}>
        П - 13
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        200
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-icon]'} level={1}>
        <Pencil strokeWidth={1} className={'inline-flex w-4'}></Pencil>
      </TableCell>
    </TableRow>
  </>
);

const TableRowSize = () => (
  <>
    <TableRow rowSpace={'xs'}>
      <TableCell className={'w-[--storage-column-icon]'} level={1}>
        1
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        Размер
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        200
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        П - 13
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        200
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-head]'} level={1}>
        -
      </TableCell>
      <TableCell className={'w-[--storage-column-icon]'} level={1}></TableCell>
    </TableRow>
  </>
);
