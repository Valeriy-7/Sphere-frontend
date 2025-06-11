'use client';

import { columns } from './columns';
import React, { Fragment, useMemo } from 'react';
import { DataRow } from '@/lib/makeData';
import { TableHead, TableHeader, TableRow, Table, TableBody } from '@/components/ui/table';
import { TableHeaderSort } from '@/components/date-table/table-header-sort';
import { useFFAccountDeliveriesGetDeliveries } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveries';
import { useWbCabinetInfo } from '../../delivery/hooks/useWbCabinetInfo';

import { colSizeList } from '../common';
import { getCoreRowModel, getExpandedRowModel, useReactTable, getPaginationRowModel, PaginationState } from '@tanstack/react-table';
import { TableRowNoGroup } from '../TableRowNoGroup';
import { TableRowExpandLevel } from '../TableRowExpandLevel';
import { fuzzyFilter } from '@/lib/TableHelpers';
import { AppSpinner } from '@/components/app-spinner';
import { DataTablePagination } from '@/components/date-table/data-table-pagination';
import { getResponsiblePersonsDisplayNames } from '../utils/parseResponsiblePersons';

export default function PrepareNewPage() {
  // Fetch WB cabinet information
  const { wbCabinetInfo } = useWbCabinetInfo();

  // Fetch deliveries with ACCEPTED status
  const { data: deliveriesData, isLoading } = useFFAccountDeliveriesGetDeliveries({
    status: 'ACCEPTED',
    limit: 100,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Format delivery data to match DataRow structure
  const data = useMemo((): DataRow[] => {
    if (!deliveriesData?.items) return [];

    return deliveriesData.items.map((delivery) => ({
      uuid: delivery.id,
      date1: delivery.acceptedAt ? new Date(delivery.acceptedAt) : new Date(),
      date2: delivery.acceptedAt ? new Date(delivery.acceptedAt) : new Date(),
      number: delivery.number,
      number1to3: delivery.planQuantity || 0,
      number1to5: delivery.cargoPlaces || 0,
      number1to10: 0,
      status: new Date(delivery.deliveryDate).toLocaleDateString('ru-RU'),
      title: wbCabinetInfo?.companyName || 'WB Store',
      group1: 1,
      group2: 1,
      groupDate1: delivery.acceptedAt ? new Date(delivery.acceptedAt) : new Date(),
      groupStoreName: wbCabinetInfo?.companyName || 'WB Store',
      groupPlace: delivery.routes?.[0]?.address || '',
      number1: delivery.planQuantity || 0,
      number2: delivery.factQuantity || 0,
      number3: delivery.defects || 0,
      number4: 0,
      number5: 0,
      number6: 0,
      number7: typeof delivery.logisticsProviderId === 'string' ? parseInt(delivery.logisticsProviderId) || 0 : delivery.logisticsProviderId || 0,
      number8: 0,
      number9: 0,
      number10: 0,
      size: 'm',
      art: delivery.number,
      image: wbCabinetInfo?.avatarUrl || 'https://placehold.co/32x32?text=WB',
      description: delivery.deliveryNumber || `Поставка ${delivery.number}`,
      streetAddress: delivery.routes?.[0]?.address || 'Адрес не указан',
      city: getResponsiblePersonsDisplayNames(delivery.responsiblePersons, delivery.responsiblePerson),
      phone: '',
      contactPerson: getResponsiblePersonsDisplayNames(delivery.responsiblePersons, delivery.responsiblePerson),
      responsiblePerson: getResponsiblePersonsDisplayNames(delivery.responsiblePersons, delivery.responsiblePerson),
      // Additional fields for accepted deliveries
      acceptedAt: delivery.acceptedAt,
      deliveryNumber: delivery.deliveryNumber,
      deliveryDate: delivery.deliveryDate,
      totalPrice: delivery.totalPrice,
      cargoVolume: delivery.cargoVolume,
      routes: delivery.routes,
      responsiblePersons: delivery.responsiblePersons || [],
    }));
  }, [deliveriesData, wbCabinetInfo]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getRowId: (row) => row.uuid,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <AppSpinner />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl">Новые задачи</h2>
        <p className="text-gray-500 mt-2">В настоящее время нет новых задач</p>
      </div>
    );
  }

  return (
    <>
      <Table colSizeList={colSizeList}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <Fragment key={headerGroup.id + 'Fragment'}>
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className}
                    >
                      {header.isPlaceholder ? null : <TableHeaderSort header={header} />}
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
                <TableRowNoGroup
                  {...{
                    table: table,
                    row: row,
                    onClick: row.getToggleExpandedHandler(),
                    className: 'cursor-pointer',
                    context: 'new',
                  }}
                />
                {row.getIsExpanded() && (
                  <TableRowExpandLevel colSizeList={colSizeList} row={row} table={table} />
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}


