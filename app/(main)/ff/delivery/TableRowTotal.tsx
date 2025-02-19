import { Table as TTable } from '@tanstack/react-table';
import { TableHead, TableRow } from '@/components/ui/table';
import { getTotalColumn } from '@/lib/TableHelpers';
import { Toggle } from '@/components/ui/toggle';
import React from 'react';

export function TableRowTotal<TData>({
  table,
  isAcceptance,
}: {
  table: TTable<TData>;
  isAcceptance?: boolean;
}) {
  console.log();
  return (
    <>
      <TableRow>
        <TableHead isTotal></TableHead>
        <TableHead isTotal></TableHead>

        <TableHead isTotal>{table.getColumn('groupPlace').getFacetedUniqueValues().size}</TableHead>
        <TableHead isTotal></TableHead>
        <TableHead isTotal>{getTotalColumn({ table, key: 'number1to3' })}</TableHead>
        <TableHead isTotal>
          {getTotalColumn({ table, key: 'number1to5' })}
          {' / '}
          {getTotalColumn({ table, key: 'number1to10' })}
        </TableHead>
        <TableHead isTotal></TableHead>
        <TableHead isTotal>
          {!isAcceptance && (
            <Toggle
              size={'xs'}
              onPressedChange={(val) => {
                if (val) {
                  table.setGrouping(['groupDate1']);
                } else {
                  table.setGrouping([]);
                }
              }}
              variant={'outline'}
              aria-label="Переключение группировки"
            >
              Группировка
            </Toggle>
          )}
        </TableHead>
        <TableHead isTotal></TableHead>
      </TableRow>
    </>
  );
}
