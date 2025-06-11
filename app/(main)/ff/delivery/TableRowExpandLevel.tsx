import { Row, Table as TTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow, TableRowExpand } from '@/components/ui/table';
import { type ColSizeList } from '@/lib/TableHelpers';
import React, { useMemo, useState, useEffect } from 'react';
import type { DataRow } from '@/lib/makeData';
import { useFFAccountDeliveriesGetDeliveryProducts } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveryProducts';
import { FFDeliveryProductDtoType } from '@/kubb-gen/types/FFDeliveryProductDtoType';
import { TableCardImgText, TableImgText } from '@/components/date-table/table-img-text';

interface SupplierData {
  id: string;
  name: string;
  products: FFDeliveryProductDtoType[];
  totalQuantity: number;
  totalCargoPlaces: number;
  totalVolume: number;
}

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
}

// Marketplace mapping based on addresses
const getMarketplaceName = (address: string): string => {
  const marketplaceMap: Record<string, string> = {
    'МКАД, 19-й километр, вл20с1': 'Южные ворота',
    'МКАД, 32-й километр, вл4': 'Лужайка', 
    'МКАД, 14-й километр, 2, стр. 63': 'Садовод',
    'Тихорецкий бул., 1, стр. 6': 'ТЯК «Москва»',
    'Калужское шоссе, 2, стр. 1': '«Славянский мир»',
    'Профсоюзная ул., 126, корп. 2': '«Коньково»'
  };
  
  return marketplaceMap[address] || address || 'Неизвестный рынок';
};

export function TableRowExpandLevel<TData extends DataRow>({
  table,
  row,
  colSizeList,
  wbCabinetInfo,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  wbCabinetInfo?: WbCabinetInfo | null;
} & ColSizeList) {
  const deliveryId = row.original.uuid;
  
  // Store the original delivery address before it gets modified
  const originalDeliveryAddress = useMemo(() => row.original.streetAddress, []);

  // Get WB store info from props instead of fetching
  const wbStoreInfo = useMemo(() => {
    if (wbCabinetInfo) {
      return {
        storeName: wbCabinetInfo.companyName || 'WB Store',
        contactPhone: wbCabinetInfo.contactPhone || 'Не указан',
        legalCompanyName: wbCabinetInfo.legalCompanyName || 'Юридическое название не указано'
      };
    }
    
    // Fallback to default values
    return {
      storeName: 'WB Store',
      contactPhone: 'Не указан',
      legalCompanyName: 'Юридическое название не указано'
    };
  }, [wbCabinetInfo]);

  // Fetch delivery products
  const { data: deliveryProducts, isLoading, error } = useFFAccountDeliveriesGetDeliveryProducts(deliveryId);

  // Extract supplier information
  const suppliers = React.useMemo<SupplierData[]>(() => {
    if (!deliveryProducts || deliveryProducts.length === 0) return [];
    
    // Group products by supplier
    const supplierMap = new Map<string, SupplierData>();
    deliveryProducts.forEach((product: FFDeliveryProductDtoType) => {
      if (!supplierMap.has(product.supplierId)) {
        supplierMap.set(product.supplierId, {
          id: product.supplierId,
          name: product.supplierName || "Солнышко",
          products: [],
          totalQuantity: 0,
          totalCargoPlaces: 0,
          totalVolume: 0
        });
      }
      
      const supplier = supplierMap.get(product.supplierId)!;
      supplier.products.push(product);
      supplier.totalQuantity += product.planQuantity;
    });
    
    // For cargo places and volume, use the actual values from the row data
    // since these represent the total for the entire store/delivery
    const totalCargoPlaces = row.original.number1to5 || 0;
    const totalVolume = row.original.number1to10 || 0;
    
    // If there are multiple suppliers, distribute the totals proportionally
    const totalQuantityAllSuppliers = Array.from(supplierMap.values()).reduce((sum, s) => sum + s.totalQuantity, 0);
    
    supplierMap.forEach((supplier) => {
      if (totalQuantityAllSuppliers > 0) {
        // Distribute cargo places and volume proportionally based on quantity
        const proportion = supplier.totalQuantity / totalQuantityAllSuppliers;
        supplier.totalCargoPlaces = Math.round(totalCargoPlaces * proportion);
        supplier.totalVolume = Math.round((totalVolume * proportion) * 100) / 100; // Round to 2 decimal places
      } else {
        supplier.totalCargoPlaces = totalCargoPlaces;
        supplier.totalVolume = totalVolume;
      }
    });
    
    return Array.from(supplierMap.values());
  }, [deliveryProducts, row.original.number1to5, row.original.number1to10]);
  
  return (
    <TableRowExpand colSpan={row.getVisibleCells().length}>
      <Table colSizeList={colSizeList}>
        <TableBody>
          {/* WB Delivery Header */}
          <TableRow rowSpace={false} className="bg-gray-50">
            <TableCell level={1} className="text-xs py-3 text-left">
              Номер поставки <br/> {row.original.description || 'Номер не указан'}
            </TableCell>
            <TableCell level={1} className="text-xs py-3 text-left">
              <div>
                <div>{row.original.contactPerson || 'Контактное лицо не указано'}</div>
                <div className="text-xs text-gray-600">{row.original.phone || 'Телефон не указан'}</div>
              </div>
            </TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
            <TableCell level={1}></TableCell>
          </TableRow>
          
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <React.Fragment key={supplier.id}>
                {/* Supplier header row */}
                <TableRow rowSpace={false}>
                  <TableCell level={1} colSpan={2}>
                    <TableCardImgText 
                      image={{ src: 'https://placehold.co/100x100?text=Market' }} 
                      title={getMarketplaceName(originalDeliveryAddress)} 
                    />
                  </TableCell>
                  <TableCell level={1}>{supplier.products.length}</TableCell>
                  <TableCell level={1}>{supplier.totalQuantity}</TableCell>
                  <TableCell level={1}>{supplier.totalCargoPlaces}</TableCell>
                  <TableCell level={1}>{supplier.totalVolume}</TableCell>
                  <TableCell level={1}></TableCell>
                  <TableCell level={1}></TableCell>
                  <TableCell level={1}></TableCell>
                </TableRow>
                
                {/* Supplier contact information row */}
                <TableRow rowSpace={false}>
                  <TableCell 
                    className="border-none align-top" 
                    colSpan={2} 
                    rowSpan={supplier.products.length + 2}
                    level={1}
                  >
                    <ul className="space-y-1">
                      <li className="text-red-500 font-medium">{supplier.name}</li>
                      <li>{originalDeliveryAddress || 'Адрес не указан'}</li>
                      <li>{row.original.contactPerson || 'Контактное лицо не указано'}</li>
                      <li>{row.original.phone || 'Телефон не указан'}</li>
                    </ul>
                  </TableCell>
                </TableRow>
                
                {/* Product rows */}
                {supplier.products.map((product, index) => (
                  <TableRow key={product.id} rowSpace={false}>
                    <TableCell level={1}>
                      <TableImgText
                        image={{ src: product.imageUrl || 'https://placehold.co/100x100?text=No+Image' }}
                        title={product.name}
                        text={`Арт: ${product.article}`}
                      />
                    </TableCell>
                    <TableCell level={1}>{product.planQuantity}</TableCell>
                    <TableCell level={1}>{product.factQuantity || 0}</TableCell>
                    <TableCell level={1}>{product.defects || 0}</TableCell>
                    <TableCell level={1}></TableCell>
                    <TableCell level={1}></TableCell>
                    <TableCell level={1}></TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))
          ) : isLoading ? (
            <TableRow rowSpace={false}>
              <TableCell level={1} colSpan={9} className="text-center py-4">
                Загрузка данных о поставке...
              </TableCell>
            </TableRow>
          ) : (
            <React.Fragment>
              {/* Fallback supplier row */}
              <TableRow rowSpace={false}>
                <TableCell level={1} colSpan={2}>
                  <TableCardImgText 
                    image={{ src: 'https://placehold.co/100x100?text=Market' }} 
                    title={getMarketplaceName(originalDeliveryAddress)} 
                  />
                </TableCell>
                <TableCell level={1}>0</TableCell>
                <TableCell level={1}>{row.original.number1to3 || 0}</TableCell>
                <TableCell level={1}>{row.original.number1to5 || 0}</TableCell>
                <TableCell level={1}>{row.original.number1to10 || 0}</TableCell>
                <TableCell level={1}></TableCell>
                <TableCell level={1}></TableCell>
                <TableCell level={1}></TableCell>
              </TableRow>
              
              {/* Fallback contact information row */}
              <TableRow rowSpace={false}>
                <TableCell 
                  className="border-none align-top" 
                  colSpan={2} 
                  rowSpan={2}
                  level={1}
                >
                  <ul className="space-y-1">
                    <li className="text-red-500 font-medium">{wbStoreInfo.storeName}</li>
                    <li>{wbStoreInfo.legalCompanyName}</li>
                    <li>{row.original.phone || 'Телефон не указан'}</li>
                    <li>{row.original.streetAddress || 'Адрес не указан'}</li>
                  </ul>
                </TableCell>
              </TableRow>
              
              {/* No products message */}
              <TableRow rowSpace={false}>
                <TableCell level={1} colSpan={7} className="text-center py-2 text-gray-500">
                  Данные о товарах недоступны
                </TableCell>
              </TableRow>
            </React.Fragment>
          )}
        </TableBody>
      </Table>
    </TableRowExpand>
  );
}

