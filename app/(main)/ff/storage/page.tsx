'use client';

import { DataTableTotal } from '@/components/date-table/data-table-total';
import { StorageTable } from '@/app/(main)/ff/storage/storage-table';
import { useStorageData } from '@/hooks/useStorageData';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoragePage() {
  const { data, loading, error, refetch } = useStorageData();

  // Create default empty data structure
  const defaultSummary = {
    currentStock: { products: 0, items: 0, defects: 0, returnsFromPickup: 0, totalProdukts: 0, totalTovars: 0 },
    consumables: { ff: 0, stores: 0 },
    received: { items: 0, defects: 0, consumables: 0 },
    shipped: { toWB: 0, otherMarketplaces: 0, defects: 0 },
  };

  const summary = data?.summary || defaultSummary;
  const suppliers = data?.suppliers || [];

  // Only show error message for real API errors (not "no data found")
  const showErrorMessage = error && !error.includes('Not Found') && !error.includes('not found');

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid-cols-0 grid gap-2 sm:grid-cols-6 xl:grid-cols-12">
          <div className="col-span-4">
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="col-span-3">
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-auto">
      {showErrorMessage && (
        <div className="mb-4">
          <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-red-800">Ошибка загрузки данных склада: {error}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={refetch}
                className="ml-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Повторить
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className={'grid-cols-0 grid gap-2 sm:grid-cols-6 xl:grid-cols-12'}>
        <div className={'col-span-4'}>
          <DataTableTotal
            caption={'Сейчас на складе (ед)'}
            data={[
              { title: 'Продукты', value: summary.currentStock.totalProdukts },
              { title: 'Товары', value: summary.currentStock.totalTovars },
              { title: 'Брак', value: summary.currentStock.defects },
              { title: 'Возвраты с ПВЗ', value: summary.currentStock.returnsFromPickup },
            ]}
          />
        </div>
        <div className={'col-span-2'}>
          <DataTableTotal
            caption={'Расходники (ед)'}
            data={[
              { title: 'ФФ', value: summary.consumables.ff },
              { title: 'Магазинов', value: summary.consumables.stores },
            ]}
          />
        </div>
        <div className={'col-span-3'}>
          <DataTableTotal
            caption={'Принято (ед)'}
            data={[
              { title: 'Товары', value: summary.received.items },
              { title: 'Брак', value: summary.received.defects },
              { title: 'Расходники', value: summary.received.consumables },
            ]}
          />
        </div>
        <div className={'col-span-3'}>
          <DataTableTotal
            caption={'Отправлено (ед)'}
            data={[
              { title: 'На WB', value: summary.shipped.toWB },
              { title: 'Другие МП', value: summary.shipped.otherMarketplaces },
              { title: 'Брак', value: summary.shipped.defects },
            ]}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <StorageTable suppliers={suppliers} onRefetch={refetch} />
      </div>
    </div>
  );
}
