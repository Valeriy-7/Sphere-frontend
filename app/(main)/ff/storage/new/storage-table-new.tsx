import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowExpand,
} from '@/components/ui/table';
import * as React from 'react';

import { Pencil, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { ScrollArea } from '@/components/ui/scroll-area';
import { getColSizeList, TableProps } from '@/lib/TableHelpers';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment } from 'react';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { TableFilter } from '@/components/date-table/table-filter';
import { ProductsTable } from '@/app/(main)/ff/storage/new/products-table/products-table';

const columnIcon = 'w-[35px]';
const columnPlace = 'w-[55px]';

const { colSizeList } = getColSizeList([
  columnIcon,
  '',
  '',
  columnPlace,
  '',
  columnPlace,
  '',
  columnPlace,
  '',
  columnPlace,
  '',
  columnPlace,
  '',
  columnIcon,
]);

export function StorageTableNew<TData, TValue>({ columns, data }: TableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  const productsTableData = [
    {
      id: '1',
      number: 1,
      key2: 'Футболка женская',
      key3: '36749595',
      key4: 'П - 13',
      key5: 200,
      key14: 'edit',
      sizeList: [
        {
          id: '2',
          number: 1,
          key2: 'Размер',
          key3: 'S',
          key4: '',
          key5: 100,
          key14: 'edit',
        },
        {
          id: '3',
          number: 2,
          key2: 'Размер',
          key3: 'М',
          key4: '',
          key5: 100,
          key14: 'edit',
        },
      ],
    },
  ];

  return (
    <Table colSizeList={colSizeList} className={'relative w-full table-fixed text-center'}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <Fragment key={headerGroup.id + 'Fragment'}>
            <TableRow rowSpace={false} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.column.columnDef.meta?.colSpan}>
                    {header.isPlaceholder ? null : <TableHeaderSort header={header} />}
                  </TableHead>
                );
              })}
            </TableRow>
            <TableRow key={headerGroup.id + 'total'}>
              {headerGroup.headers.map((header) => {
                const totalComponent = header.column.columnDef.meta?.totalComponent;
                return (
                  <TableHead
                    isTotal
                    key={header.id + 'total'}
                    colSpan={header.column.columnDef.meta?.colSpan}
                  >
                    {header.column.getCanFilter() ? (
                      <TableFilter column={table.getColumn(header.id)}></TableFilter>
                    ) : null}
                    {flexRender(totalComponent, table)}
                  </TableHead>
                );
              })}
            </TableRow>
          </Fragment>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Fragment key={row.id}>
              <TableRow
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer' },
                }}
              >
                {/* first row is a normal row */}
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id} colSpan={cell.column.columnDef.meta?.colSpan}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
              {row.getIsExpanded() && (
                <TableRowExpand colSpan={row.getVisibleCells().length + 1}>
                  <ScrollArea className={'flex max-h-[500px] flex-col overflow-y-auto'}>
                    <ProductsTable colSizeList={colSizeList} initialData={productsTableData} />
                  </ScrollArea>
                </TableRowExpand>
              )}
            </Fragment>
          );
        })}
        <TableRowStore />
      </TableBody>
    </Table>
  );
}

const TableRowHeader = () => (
  <>
    <TableRow rowSpace={false}>
      <TableHead>№</TableHead>
      <TableHead colSpan={2}>Магазин</TableHead>
      <TableHead></TableHead>
      <TableHead>Продукт</TableHead>
      <TableHead></TableHead>
      <TableHead>Товар (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Брак (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Расходники (ед)</TableHead>
      <TableHead></TableHead>
      <TableHead>Возвраты с ПВЗ (ед)</TableHead>
      <TableHead> </TableHead>
    </TableRow>
  </>
);
const TableHeaderProduct = () => (
  <>
    <TableRow rowSpace={'xs'} className={'font-medium'}>
      <TableCell className={'sticky top-0'} level={1}>
        №
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Наименование
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Артиукл
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Место
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        Кол-во
      </TableCell>
      <TableCell className={'sticky top-0'} level={1}>
        <Pencil strokeWidth={1} className={'inline-flex w-4'}></Pencil>
      </TableCell>
    </TableRow>
  </>
);

const TableRowStore = () => (
  <>
    <TableRow>
      <TableCell>№</TableCell>
      <TableCell className={'w-[calc(var(--storage-column-head)*2)]'} colSpan={2}>
        <TableCardImgText
          image={{
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UE1dYBdrFfV1Dz09dGWXy7R8TasGsOk7zQ&s',
          }}
          title={'Logistik Company'}
          text={'ООО “Логистик”'}
        />
      </TableCell>
      <TableCell></TableCell>
      <TableCell>1000</TableCell>
      <TableCell></TableCell>
      <TableCell>2000</TableCell>
      <TableCell></TableCell>
      <TableCell>3000</TableCell>
      <TableCell></TableCell>
      <TableCell>5000</TableCell>
      <TableCell></TableCell>
      <TableCell>6000</TableCell>
      <TableCell>1</TableCell>
    </TableRow>
  </>
);

const TableRowFilter = () => (
  <>
    <TableRow rowSpace={'md'}>
      <TableHead isTotal></TableHead>
      <TableHead isTotal colSpan={2}>
        <Input className={'h-auto px-1 md:text-xs'} placeholder={'Поиск'}></Input>
      </TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal></TableHead>
      <TableHead isTotal>
        <TableFilterRange />
      </TableHead>
      <TableHead isTotal></TableHead>
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
    <TableRow rowSpace={false}>
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
      <TableCell level={1}>1</TableCell>
      <TableCell level={1}>Футболка женская длинное название</TableCell>
      <TableCell level={1}>36749595</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}>П - 13</TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  </>
);

const TableRowSize = () => (
  <>
    <TableRow rowSpace={'xs'}>
      <TableCell level={1}></TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>S</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>200</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}></TableCell>
      <TableCell level={1}>-</TableCell>
      <TableCell level={1}></TableCell>
    </TableRow>
  </>
);
