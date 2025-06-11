import { Table as TTable } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { getTotalColumn } from '@/lib/TableHelpers';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function TableRowTotal<TData>({
  table,
  isAcceptance,
  isAccepted,
  defaultGrouped,
  searchQuery,
  setSearchQuery,
}: {
  table: TTable<TData>;
  isAcceptance?: boolean;
  isAccepted?: boolean;
  defaultGrouped?: boolean;
  searchQuery?: string;
  setSearchQuery?: (value: string) => void;
}) {
  const groupingState = table.getState().grouping;
  const isGrouped = groupingState.length > 0;

  return (
    <TableRow rowSpace={false} className="bg-gray-50">
      {/* Column 1: № */}
      <TableCell className="text-xs py-3 text-left">
        <div className="flex items-center">
          <span className="text-gray-500">№</span>
        </div>
      </TableCell>
      
      {/* Column 2: Дата поставки */}
      <TableCell className="text-xs py-3 text-left">
        <div className="flex items-center">
          <span className="text-gray-500">Дата поставки</span>
        </div>
      </TableCell>
      
      {/* Column 3: Магазин - Contains search input */}
      <TableCell className="text-xs py-3 text-left">
        {setSearchQuery && (
          <Input
            placeholder="Поиск по номеру поставки..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 text-xs"
          />
        )}
      </TableCell>
      
      {/* Column 4: Кол-во товаров */}
      <TableCell className="text-xs py-3 text-center">
        <span className="text-gray-500">Кол-во</span>
      </TableCell>
      
      {/* Column 5: Гр. мест */}
      <TableCell className="text-xs py-3 text-center">
        <span className="text-gray-500">Гр. мест</span>
      </TableCell>
      
      {/* Column 6: Объём */}
      <TableCell className="text-xs py-3 text-center">
        <span className="text-gray-500">Объём</span>
      </TableCell>
      
      {/* Column 7: Ответственный */}
      <TableCell className="text-xs py-3 text-center">
        <span className="text-gray-500">Ответственный</span>
      </TableCell>
      
      {/* Column 8: Тип логистики - Contains grouping toggle */}
      <TableCell>
        {(!isAcceptance || defaultGrouped) && !isAccepted && (
          <div className="flex justify-end">
            <Button 
              variant={isGrouped ? "default" : "outline"}
              size="xs"
              className={isGrouped ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}
              onClick={() => {
                if (isGrouped) {
                  table.setGrouping([]);
                } else {
                  table.setGrouping(['groupDate1']);
                }
              }}
            >
              Группировка
            </Button>
          </div>
        )}
      </TableCell>
      
      {/* Column 9: Статус */}
      <TableCell></TableCell>
    </TableRow>
  );
}
