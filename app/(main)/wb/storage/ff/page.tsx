'use client';
import { StorageFfTable } from './storage-ff-table';
import { columns } from './columns';
import React, { useMemo } from 'react';
import { useWbStorageDataDirect as useWbStorageData } from '@/hooks/useWbStorageDataDirect';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataRow } from '@/lib/makeData';

export default function StorageFfPage() {
  const { data, loading, error, refetch } = useWbStorageData();

  // Convert WB storage data to the format expected by the table
  const tableData = useMemo<DataRow[]>(() => {
    if (!data || !data.stores || data.stores.length === 0) {
      return [];
    }

    const tableRows: DataRow[] = [];

    // Create a default DataRow template with all required fields
    const createDataRow = (overrides: Partial<DataRow>): DataRow => ({
      date1: new Date(),
      date2: new Date(),
      groupDate1: new Date(),
      groupPlace: 'WB Storage',
      groupStoreName: 'WB Store',
      group1: 1,
      group2: 1,
      uuid: '',
      number1to3: 1,
      number1to5: 1,
      number1to10: 1,
      number: 0,
      number1: 0,
      number2: 0,
      number3: 0,
      number4: 0,
      number5: 0,
      number6: 0,
      number7: 0,
      number8: 0,
      number9: 0,
      number10: 0,
      size: '',
      title: '',
      art: 0,
      description: '',
      image: '',
      city: '',
      streetAddress: '',
      phone: '',
      contactPerson: '',
      status: 'new',
      acceptedAt: new Date(),
      subRows: [],
      ...overrides
    });

    // Iterate through each store
    data.stores.forEach(store => {
      // For each product in the store
      store.products.forEach(product => {
        const mainRow = createDataRow({
          uuid: product.id,
          number4: product.totalProducts, // Products (completed deliveries)
          number5: product.totalTovars, // Tovars (non-completed deliveries)  
          number6: product.totalDefects, // Defects for this product
          number7: store.totals.consumables, // Consumables (store level)
          number8: store.totals.returnsFromPickup, // Returns from pickup (store level)
          title: product.name,
          art: parseInt(product.article) || 0,
          image: product.imageUrl || '',
          subRows: []
        });

        // Add size sub-rows
        if (product.sizes && product.sizes.length > 0) {
          const totalFactQuantity = product.sizes.reduce((sum, size) => sum + size.factQuantity, 0);
          const productRatio = totalFactQuantity > 0 ? product.totalProducts / totalFactQuantity : 0;
          const tovarRatio = totalFactQuantity > 0 ? product.totalTovars / totalFactQuantity : 0;
          
          mainRow.subRows = product.sizes.map(size => {
            const sizeProducts = Math.round(size.factQuantity * productRatio);
            const sizeTovars = Math.round(size.factQuantity * tovarRatio);
            
            return createDataRow({
            uuid: size.id,
              number4: sizeProducts, // Size-level products (proportional)
              number5: sizeTovars, // Size-level tovars (proportional)
            number6: size.defects, // Size defects
            number7: 0, // Consumables not tracked at size level
            number8: 0, // Returns not tracked at size level
            title: size.sizeDisplay,
            art: parseInt(product.article) || 0,
            image: product.imageUrl || '',
            size: size.sizeDisplay
            });
          });
        }

        tableRows.push(mainRow);
      });
    });

    return tableRows;
  }, [data]);

  // Only show error message for real API errors (not "no data found")
  const showErrorMessage = error && !error.includes('Not Found') && !error.includes('not found');

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1>Склад ФФ</h1>
          {(showErrorMessage || tableData.length === 0) && (
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
          )}
        </div>

        {showErrorMessage && (
          <div className="mb-4">
            <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-red-800">Ошибка загрузки данных склада: {error}</span>
              </div>
            </div>
          </div>
        )}

        {!showErrorMessage && tableData.length === 0 && (
          <div className="mb-4">
            <div className="border border-gray-200 bg-gray-50 p-4 rounded-lg">
              <span className="text-gray-800">Нет данных о товарах на складе. Данные могут отсутствовать если товары не синхронизированы или кабинет пустой.</span>
            </div>
          </div>
        )}

        <StorageFfTable data={tableData} columns={columns} />
      </div>
    </>
  );
}
