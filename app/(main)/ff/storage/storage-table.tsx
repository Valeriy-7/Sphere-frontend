'use client';

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
} from '@/components/ui/table';
import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Pencil, Filter, ChevronDown, ChevronRight, ArrowUp, ArrowDown, Edit3, Check, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StorageSupplier, StorageProduct, StorageProductSize } from '@/types/storage';
import { useUpdateStorageLocation } from '@/hooks/useStorageData';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useFFStorageUpdateProductStorageLocation } from '@/kubb-gen/hooks/ff-account/useFFStorageUpdateProductStorageLocation';
import client from '@/modules/auth/axios-client';

// Number formatting function - adds spaces every 3 digits
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

type StorageTableProps = {
  suppliers: StorageSupplier[];
  onRefetch?: () => void;
} & React.HTMLAttributes<HTMLTableElement>;

export function StorageTable({ suppliers = [], onRefetch, ...props }: StorageTableProps) {
  const [expandedSuppliers, setExpandedSuppliers] = React.useState<Record<string, boolean>>({});
  const [expandedProducts, setExpandedProducts] = React.useState<Record<string, boolean>>({});
  const [editingProducts, setEditingProducts] = useState<Record<string, boolean>>({});

  // Filter states
  const [searchFilter, setSearchFilter] = useState('');
  const [filters, setFilters] = useState({
    product: { from: '', to: '' },
    goods: { from: '', to: '' }, 
    defects: { from: '', to: '' },
    consumables: { from: '', to: '' },
    returns: { from: '', to: '' }
  });

  // Function to handle quantity changes and update totals
  const handleQuantityChange = React.useCallback((supplierId: string, productId: string, sizeId: string, oldQuantity: number, newQuantity: number, oldDefects: number, newDefects: number) => {
    // Find the supplier and product to update
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const product = supplier.products.find(p => p.id === productId);
    if (!product) return;

    // Find the size to determine preparation status
    const size = product.sizes.find(s => s.id === sizeId);
    if (!size) return;

    // Calculate the differences
    const quantityDiff = newQuantity - oldQuantity;
    const defectsDiff = newDefects - oldDefects;

    // Update product totals based on preparation status
    if (size.preparationStatus === 'completed') {
      // This is a produktQuantity change
      product.totalProdukts = (product.totalProdukts || 0) + quantityDiff;
      supplier.totalProdukts = (supplier.totalProdukts || 0) + quantityDiff;
    } else {
      // This is a tovarQuantity change
      product.totalTovars = (product.totalTovars || 0) + quantityDiff;
      supplier.totalTovars = (supplier.totalTovars || 0) + quantityDiff;
    }

    // Update defects (always applies)
    product.totalDefects = (product.totalDefects || 0) + defectsDiff;
    supplier.totalDefects = (supplier.totalDefects || 0) + defectsDiff;

    // Update legacy fields for backward compatibility
    product.totalQuantity = (product.totalQuantity || 0) + quantityDiff;
    product.totalGoods = product.totalQuantity - (product.totalDefects || 0);
    supplier.totalItems = (supplier.totalItems || 0) + quantityDiff;

    // Note: Daily changes are calculated by the backend based on storage adjustments
    // No need to update them here as they will be refreshed from the API

    // Force re-render by triggering a state update
    // This is a hack to force React to re-render with the mutated data
    setExpandedSuppliers(prev => ({ ...prev }));
  }, [suppliers]);

  // Calculate total daily changes by summing all supplier daily changes
  const totalDailyChanges = React.useMemo(() => {
    return suppliers.reduce((totals, supplier) => {
      const changes = supplier.dailyChanges || { 
        products: { gained: 0, lost: 0 }, 
        items: { gained: 0, lost: 0 }, 
        defects: { gained: 0, lost: 0 }, 
        consumables: { gained: 0, lost: 0 }, 
        returns: { gained: 0, lost: 0 } 
      };
      
      return {
        products: { 
          gained: totals.products.gained + (changes.products?.gained || 0), 
          lost: totals.products.lost + (changes.products?.lost || 0) 
        },
        items: { 
          gained: totals.items.gained + (changes.items?.gained || 0), 
          lost: totals.items.lost + (changes.items?.lost || 0) 
        },
        defects: { 
          gained: totals.defects.gained + (changes.defects?.gained || 0), 
          lost: totals.defects.lost + (changes.defects?.lost || 0) 
        },
        consumables: { 
          gained: totals.consumables.gained + (changes.consumables?.gained || 0), 
          lost: totals.consumables.lost + (changes.consumables?.lost || 0) 
        },
        returns: { 
          gained: totals.returns.gained + (changes.returns?.gained || 0), 
          lost: totals.returns.lost + (changes.returns?.lost || 0) 
        },
      };
    }, { 
      products: { gained: 0, lost: 0 }, 
      items: { gained: 0, lost: 0 }, 
      defects: { gained: 0, lost: 0 }, 
      consumables: { gained: 0, lost: 0 }, 
      returns: { gained: 0, lost: 0 } 
    });
  }, [suppliers, expandedSuppliers]); // Add expandedSuppliers to force recalculation when data changes

  const toggleSupplier = (supplierId: string) => {
    setExpandedSuppliers(prev => ({
      ...prev,
      [supplierId]: !prev[supplierId]
    }));
  };

  const toggleProduct = (productId: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const toggleEditMode = (productId: string) => {
    setEditingProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
    // Also expand the product when editing
    if (!expandedProducts[productId]) {
      toggleProduct(productId);
    }
  };

  // Filter suppliers based on search and range filters
  const filteredSuppliers = React.useMemo(() => {
    return suppliers.filter(supplier => {
      // Search filter
      if (searchFilter && !supplier.name.toLowerCase().includes(searchFilter.toLowerCase())) {
        return false;
      }

      // Range filters
      const productCount = (supplier.totalItems || 0) - (supplier.totalDefects || 0);
      const goodsCount = supplier.totalItems || 0;
      const defectsCount = supplier.totalDefects || 0;
      const consumablesCount = supplier.totalConsumables || 0;
      const returnsCount = supplier.totalReturns || 0;

      // Product filter
      if (filters.product.from && productCount < parseInt(filters.product.from)) return false;
      if (filters.product.to && productCount > parseInt(filters.product.to)) return false;

      // Goods filter  
      if (filters.goods.from && goodsCount < parseInt(filters.goods.from)) return false;
      if (filters.goods.to && goodsCount > parseInt(filters.goods.to)) return false;

      // Defects filter
      if (filters.defects.from && defectsCount < parseInt(filters.defects.from)) return false;
      if (filters.defects.to && defectsCount > parseInt(filters.defects.to)) return false;

      // Consumables filter
      if (filters.consumables.from && consumablesCount < parseInt(filters.consumables.from)) return false;
      if (filters.consumables.to && consumablesCount > parseInt(filters.consumables.to)) return false;

      // Returns filter
      if (filters.returns.from && returnsCount < parseInt(filters.returns.from)) return false;
      if (filters.returns.to && returnsCount > parseInt(filters.returns.to)) return false;

      return true;
    });
  }, [suppliers, searchFilter, filters]);

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
          <TableRowFilter 
            searchFilter={searchFilter}
            onSearchChange={setSearchFilter}
            filters={filters}
            onFiltersChange={setFilters}
          />
          <TableRowDailyChanges 
            dailyChanges={totalDailyChanges} 
            currentTotals={{
              products: filteredSuppliers.reduce((sum, s) => sum + (s.totalProdukts || 0), 0),
              items: filteredSuppliers.reduce((sum, s) => sum + (s.totalTovars || 0), 0),
              defects: filteredSuppliers.reduce((sum, s) => sum + (s.totalDefects || 0), 0),
              consumables: filteredSuppliers.reduce((sum, s) => sum + (s.totalConsumables || 0), 0),
              returns: filteredSuppliers.reduce((sum, s) => sum + (s.totalReturns || 0), 0),
            }}
          />
        </TableHeader>
        <TableBody>
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier, supplierIndex) => (
              <React.Fragment key={supplier.id}>
                {/* Supplier Row */}
                <TableRowStore 
                  supplier={supplier}
                  index={supplierIndex}
                  isExpanded={expandedSuppliers[supplier.id]}
                  onToggle={() => toggleSupplier(supplier.id)}
                />
                
                {/* Expanded Products */}
                {expandedSuppliers[supplier.id] && (
                  <TableRowExpand colSpan={13}>
                    <div className="p-4 bg-gray-50">
                      {/* Level 2: Product Summary Headers */}
                     
                      {/* Level 2: Column headers and product data */}
                      <ScrollArea className={'flex flex-col overflow-y-auto'}>
                        <Table className={'table-fixed'}>
                          <TableHeader>
                            <TableHeaderProduct />
                          </TableHeader>
                          <TableBody>
                            {supplier.products.map((product, productIndex) => (
                              <React.Fragment key={product.id}>
                                <TableRowProduct 
                                  key={`${supplier.id}-${product.id}`}
                                  product={product} 
                                  index={productIndex}
                                  isExpanded={expandedProducts[product.id] || false}
                                  onToggle={() => toggleProduct(product.id)}
                                  onRefetch={onRefetch}
                                  isEditMode={editingProducts[product.id]}
                                  onToggleEdit={() => toggleEditMode(product.id)}
                                  onQuantityChange={(sizeId, oldQuantity, newQuantity, oldDefects, newDefects) => {
                                    handleQuantityChange(supplier.id, product.id, sizeId, oldQuantity, newQuantity, oldDefects, newDefects);
                                  }}
                                />
                                {/* Level 3: Individual sizes */}
                                {expandedProducts[product.id] && (
                                  <tr>
                                    <td colSpan={14} className="p-2 bg-gray-25">
                                      <div className="text-xs text-gray-600 mb-2">Данные третьего уровня:</div>
                                      <Table className="table-fixed">
                                        <TableBody>
                                          {product.sizes.map((size, sizeIndex) => (
                                            <TableRowSize 
                                              key={`${product.id}-${size.id}`} 
                                              size={size} 
                                              product={product}
                                              isLast={sizeIndex === product.sizes.length - 1}
                                              isEditMode={editingProducts[product.id]}
                                              onQuantityChange={(sizeId, oldQuantity, newQuantity, oldDefects, newDefects) => {
                                                handleQuantityChange(supplier.id, product.id, sizeId, oldQuantity, newQuantity, oldDefects, newDefects);
                                              }}
                                              onRefetch={onRefetch}
                                            />
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </div>
                  </TableRowExpand>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={13} className="text-center text-gray-500 py-8">
                {suppliers.length === 0 
                  ? "Нет данных о товарах на складе. Проверьте подключение к API или наличие поставок."
                  : "Нет результатов по выбранным фильтрам. Попробуйте изменить параметры поиска."
                }
              </TableCell>
            </TableRow>
          )}
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

const TableRowStore = ({ 
  supplier,
  index,
  isExpanded,
  onToggle 
}: { 
  supplier: StorageSupplier;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  // Calculate current values based on new data structure with separate tovar/produkt quantities
  const factQuantityCount = supplier.totalItems || 0; // total factQuantity
  const produktCount = supplier.totalProdukts || 0; // sum of produktQuantity
  const tovarCount = supplier.totalTovars || 0; // sum of tovarQuantity
  const defectsCount = supplier.totalDefects || 0; // defects
  const consumablesCount = supplier.totalConsumables || 0;
  const returnsCount = supplier.totalReturns || 0;

  return (
    <TableRow 
      className="cursor-pointer hover:bg-gray-50"
      onClick={onToggle}
    >
      <TableCell className={'w-[--storage-column-icon]'}>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </TableCell>
      <TableCell className={'w-[calc(var(--storage-column-head)*2)]'}>
        <Card className={'inline-flex max-w-[165px] items-center gap-2 p-1'}>
          {supplier.imageUrl ? (
            <img
              className={'h-[30px] w-[60px] rounded-lg'}
              src={supplier.imageUrl}
              alt={supplier.name}
            />
          ) : (
            <div className={'h-[30px] w-[60px] bg-gray-200 rounded-lg flex items-center justify-center'}>
              <span className="text-xs text-gray-500">ФФ</span>
            </div>
          )}
          <div className={'text-min font-medium'}>
            {supplier.name} <br />
            {supplier.address || 'Адрес не указан'}
          </div>
        </Card>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        <span className="font-medium">{formatNumber(produktCount)}</span>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        <span className="font-medium">{formatNumber(tovarCount)}</span>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        <span className="font-medium">{formatNumber(defectsCount)}</span>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        <span className="font-medium">{formatNumber(consumablesCount)}</span>
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        <span className="font-medium">{formatNumber(returnsCount)}</span>
      </TableCell>
      <TableCell className={'w-[--storage-column-icon]'}>{index + 1}</TableCell>
    </TableRow>
  );
};

const TableRowFilter = ({ 
  searchFilter, 
  onSearchChange, 
  filters, 
  onFiltersChange 
}: {
  searchFilter: string;
  onSearchChange: (value: string) => void;
  filters: {
    product: { from: string; to: string };
    goods: { from: string; to: string };
    defects: { from: string; to: string };
    consumables: { from: string; to: string };
    returns: { from: string; to: string };
  };
  onFiltersChange: (filters: any) => void;
}) => (
  <>
    <TableRow rowSpace={'md'}>
      <TableHead isTotal className={'w-[--storage-column-icon]'}></TableHead>
      <TableHead isTotal className={'w-[calc(var(--storage-column-head)*2)]'}>
        <Input 
          className={'h-auto px-1 md:text-xs'} 
          placeholder={'Поиск'}
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange 
          filterKey="product"
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange 
          filterKey="goods"
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange 
          filterKey="defects"
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange 
          filterKey="consumables"
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
      <TableHead isTotal className={'w-[--storage-column-head]'}>
        <TableFilterRange 
          filterKey="returns"
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      </TableHead>
      <TableHead isTotal className={'w-[--storage-column-place]'}></TableHead>
    </TableRow>
  </>
);

const TableFilterRange = ({ 
  filterKey, 
  filters, 
  onFiltersChange 
}: {
  filterKey: 'product' | 'goods' | 'defects' | 'consumables' | 'returns';
  filters: any;
  onFiltersChange: (filters: any) => void;
}) => {
  const handleFromChange = (value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: {
        ...filters[filterKey],
        from: value
      }
    });
  };

  const handleToChange = (value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: {
        ...filters[filterKey],
        to: value
      }
    });
  };

  return (
    <div className="inline-flex max-w-[150px] gap-1">
      <Input 
        className={'h-auto px-1 md:text-xs'} 
        placeholder={'От'} 
        type="number"
        value={filters[filterKey].from}
        onChange={(e) => handleFromChange(e.target.value)}
      />
      <Input 
        className={'h-auto px-1 md:text-xs'} 
        placeholder={'До'} 
        type="number"
        value={filters[filterKey].to}
        onChange={(e) => handleToChange(e.target.value)}
      />
    </div>
  );
};

const TableRowTotal = () => (
  <>
    <TableRow rowSpace={false}>
      <TableCell className={'w-[--storage-column-icon]'}>№</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>Итого</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-place]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>1000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>2000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>3000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>5000</TableCell>
      <TableCell className={'w-[--storage-column-place]'}>-</TableCell>
      <TableCell className={'w-[--storage-column-head]'}>6000</TableCell>
      <TableCell className={'w-[--storage-column-icon]'}>1</TableCell>
    </TableRow>
  </>
);

const TableRowProduct = ({ 
  product, 
  index, 
  isExpanded, 
  onToggle,
  onRefetch,
  isEditMode,
  onToggleEdit,
  onQuantityChange
}: { 
  product: any; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onRefetch?: () => void;
  isEditMode: boolean;
  onToggleEdit: () => void;
  onQuantityChange: (sizeId: string, oldQuantity: number, newQuantity: number, oldDefects: number, newDefects: number) => void;
}) => {
  const updateProductStorageLocationMutation = useFFStorageUpdateProductStorageLocation();
  const [newStorageLocation, setNewStorageLocation] = useState(product.storageLocation || '');

  const handleSave = async () => {
    if (newStorageLocation.trim() === (product.storageLocation || '').trim()) {
      return;
    }

    try {
      await updateProductStorageLocationMutation.mutateAsync({
        productId: product.id || product.productId,
        data: { storageLocation: newStorageLocation.trim() }
      });
      
      // Update local data optimistically - no need to refetch
      product.storageLocation = newStorageLocation.trim();
    } catch (error) {
      console.error('Error updating storage location:', error);
      // Reset to original value on error
      setNewStorageLocation(product.storageLocation || '');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setNewStorageLocation(product.storageLocation || '');
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleEdit();
  };

  return (
    <>
      <TableRow 
        rowSpace={'xs'} 
        className="cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <TableCell className={'sticky top-[20px] w-[--storage-column-icon]'} level={1}>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </TableCell>
        <TableCell className={'sticky top-[20px] w-[--storage-column-head]'} level={1}>
          <Card className={'inline-flex max-w-[200px] items-center gap-2 p-1'}>
            {product.imageUrl ? (
              <img
                className={'h-[30px] w-[30px] rounded-lg object-cover'}
                src={product.imageUrl}
                alt={product.name}
              />
            ) : (
              <div className={'h-[30px] w-[30px] bg-gray-200 rounded-lg flex items-center justify-center'}>
                <span className="text-xs text-gray-500">Нет</span>
              </div>
            )}
            <div className={'text-min font-medium'}>
              {product.name || 'Неизвестный товар'}
            </div>
          </Card>
        </TableCell>
        <TableCell className={'sticky top-[20px] w-[--storage-column-head]'} level={1}>
          {product.article || 'Артикул не указан'}
        </TableCell>
        <TableCell 
          className={'sticky top-[20px] w-[--storage-column-place]'} 
          level={1}
          onClick={(e) => e.stopPropagation()} // Prevent row expansion when clicking on storage location
        >
          {isEditMode ? (
            <Input
              value={newStorageLocation}
              onChange={(e) => setNewStorageLocation(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyPress}
              disabled={updateProductStorageLocationMutation.isPending}
              placeholder="Место"
              className="w-full text-xs"
              autoFocus
            />
          ) : (
            <div 
              className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
              onClick={() => onToggleEdit()}
              title="Нажмите для редактирования"
            >
              {newStorageLocation || 'П - 13'}
            </div>
          )}
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {formatNumber(product.totalProdukts || 0)}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {formatNumber(product.totalTovars || 0)}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {formatNumber(product.totalDefects || 0)}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          0
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          0
        </TableCell>
        <TableCell className={'w-[--storage-column-icon]'} level={1}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditClick}
            disabled={updateProductStorageLocationMutation.isPending}
            className="w-6 h-6 p-0"
            title="Редактировать товар и размеры"
          >
            <Pencil className="w-3 h-3" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

const TableRowSize = ({
  size,
  product,
  isEditMode,
  isLast,
  onQuantityChange,
  onRefetch,
}: {
  size: StorageProductSize;
  product: StorageProduct;
  isEditMode: boolean;
  isLast: boolean;
  onQuantityChange?: (sizeId: string, oldQuantity: number, newQuantity: number, oldDefects: number, newDefects: number) => void;
  onRefetch?: () => void;
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [localStorageLocation, setLocalStorageLocation] = useState(size.storageLocation || '');
  const [localFactQuantity, setLocalFactQuantity] = useState(size.factQuantity || 0);
  const [localDefects, setLocalDefects] = useState(size.defects || 0);

  // Check if this is a temporary size (from WB delivery data)
  const isWbTemporarySize = size.id.startsWith('wb-size-');
  const isDeliveryTemporarySize = size.id.startsWith('size-') && !size.id.startsWith('size-default-');
  const isDefaultSize = size.id.startsWith('size-default-');
  const isTemporarySize = isWbTemporarySize || isDeliveryTemporarySize;
  // Both temporary sizes and real FF product sizes can be edited
  const canEdit = true; // Allow editing for all sizes now

  const handleSave = async () => {
    if (!canEdit) return;
    
    const originalQuantity = size.factQuantity || 0;
    const originalDefects = size.defects || 0;
    
    // Only proceed if there are actual changes
    if (localFactQuantity === originalQuantity && localDefects === originalDefects) {
      setIsEditing(false);
      return;
    }
    
    setIsUpdating(true);
    
    try {
      console.log('Size ID:', size.id, 'isWbTemporarySize:', isWbTemporarySize, 'isDeliveryTemporarySize:', isDeliveryTemporarySize, 'isDefaultSize:', isDefaultSize);
      
      if (isWbTemporarySize) {
        // For WB temporary sizes (wb-size-X), use the delivery-sizes endpoint
        const sizeIndex = parseInt(size.id.replace('wb-size-', ''), 10);
        console.log('Parsed WB sizeIndex:', sizeIndex, 'from ID:', size.id);
        if (isNaN(sizeIndex)) {
          console.error('Failed to parse WB size index from ID:', size.id);
          throw new Error('Invalid WB size ID format');
        }

        const url = `/ff-account/storage/delivery-sizes/${product.id}/${sizeIndex}`;
        
        // Build request body only with changes
        const requestBody: any = {};
        
        if (localFactQuantity !== originalQuantity) {
          requestBody.factQuantity = localFactQuantity;
        }
        
        if (localDefects !== originalDefects) {
          requestBody.defects = localDefects;
        }

        // Only make request if there are changes
        if (Object.keys(requestBody).length > 0) {
          await client({
            method: 'PATCH',
            url: url,
            data: requestBody,
          });

          // Update local data optimistically
          if (requestBody.factQuantity !== undefined) {
            size.factQuantity = localFactQuantity;
            // Also update the appropriate quantity field based on preparation status
            if (size.preparationStatus === 'completed') {
              size.produktQuantity = localFactQuantity;
            } else {
              size.tovarQuantity = localFactQuantity;
            }
          }
          if (requestBody.defects !== undefined) {
            size.defects = localDefects;
          }
          // Update calculated goods
          size.goods = (size.factQuantity || 0) - (size.defects || 0);

          // Propagate changes up to product and supplier levels
          if (onQuantityChange) {
            onQuantityChange(size.id, originalQuantity, localFactQuantity, originalDefects, localDefects);
          }

          toast({
            title: 'Успешно обновлено',
            description: 'Количество товара и брак размера обновлены',
          });

          // Refresh data to get updated daily changes from backend
          if (onRefetch) {
            setTimeout(() => onRefetch(), 500); // Small delay to ensure backend processing is complete
          }
        }
      } else if (isDeliveryTemporarySize) {
        // For delivery temporary sizes (size-X), use the delivery-sizes endpoint
        const sizeIndex = parseInt(size.id.replace('size-', ''), 10);
        console.log('Parsed delivery sizeIndex:', sizeIndex, 'from ID:', size.id);
        if (isNaN(sizeIndex)) {
          console.error('Failed to parse delivery size index from ID:', size.id);
          throw new Error('Invalid delivery size ID format');
        }

        const url = `/ff-account/storage/delivery-sizes/${product.id}/${sizeIndex}`;
        
        // Build request body only with changes
        const requestBody: any = {};
        
        if (localFactQuantity !== originalQuantity) {
          requestBody.factQuantity = localFactQuantity;
        }
        
        if (localDefects !== originalDefects) {
          requestBody.defects = localDefects;
        }

        // Only make request if there are changes
        if (Object.keys(requestBody).length > 0) {
          await client({
            method: 'PATCH',
            url: url,
            data: requestBody,
          });

          // Update local data optimistically
          if (requestBody.factQuantity !== undefined) {
            size.factQuantity = localFactQuantity;
            // Also update the appropriate quantity field based on preparation status
            if (size.preparationStatus === 'completed') {
              size.produktQuantity = localFactQuantity;
            } else {
              size.tovarQuantity = localFactQuantity;
            }
          }
          if (requestBody.defects !== undefined) {
            size.defects = localDefects;
          }
          // Update calculated goods
          size.goods = (size.factQuantity || 0) - (size.defects || 0);

          // Propagate changes up to product and supplier levels
          if (onQuantityChange) {
            onQuantityChange(size.id, originalQuantity, localFactQuantity, originalDefects, localDefects);
          }

          toast({
            title: 'Успешно обновлено',
            description: 'Количество товара и брак размера обновлены',
          });

          // Refresh data to get updated daily changes from backend
          if (onRefetch) {
            setTimeout(() => onRefetch(), 500); // Small delay to ensure backend processing is complete
          }
        }
      } else if (isDefaultSize) {
        // For default sizes (products without size breakdown), we need to find the corresponding FF product
        // The size-default-{deliveryProductId} represents a delivery product, but we need to update the FF product
        const deliveryProductId = size.id.replace('size-default-', '');
        
        // For size-default products, we need to find the corresponding FF product ID
        // We'll use a special endpoint that can map from delivery product to FF product
        const url = `/ff-account/storage/delivery-products/${deliveryProductId}/quantities`;
        
        // Build request body for FF product update via delivery product mapping
        const requestBody: any = {};
        
        if (localFactQuantity !== originalQuantity) {
          requestBody.factQuantity = localFactQuantity;
        }
        
        if (localDefects !== originalDefects) {
          requestBody.defects = localDefects;
        }

        // Only make request if there are changes
        if (Object.keys(requestBody).length > 0) {
          console.log('Updating FF product via delivery product mapping:', deliveryProductId, requestBody);
          
          await client({
            method: 'PATCH',
            url: url,
            data: requestBody,
          });

          // Update local data optimistically
          if (requestBody.factQuantity !== undefined) {
            size.factQuantity = localFactQuantity;
            // Also update the appropriate quantity field based on preparation status
            if (size.preparationStatus === 'completed') {
              size.produktQuantity = localFactQuantity;
            } else {
              size.tovarQuantity = localFactQuantity;
            }
          }
          if (requestBody.defects !== undefined) {
            size.defects = localDefects;
          }
          // Update calculated goods
          size.goods = (size.factQuantity || 0) - (size.defects || 0);

          // Propagate changes up to product and supplier levels
          if (onQuantityChange) {
            onQuantityChange(size.id, originalQuantity, localFactQuantity, originalDefects, localDefects);
          }

          toast({
            title: 'Успешно обновлено',
            description: 'Количество товара и брак размера обновлены',
          });

          // Refresh data to get updated daily changes from backend
          if (onRefetch) {
            setTimeout(() => onRefetch(), 500); // Small delay to ensure backend processing is complete
          }
        }
      } else {
        // For real UUID sizes (FF product sizes), use the sizes endpoint
        const url = `/ff-account/storage/sizes/${size.id}`;
        
        // Build request body only with changes
        const requestBody: any = {
          sizeId: size.id, // Include the actual UUID as required by the DTO
        };
        
        if (localFactQuantity !== originalQuantity) {
          requestBody.factQuantity = localFactQuantity;
        }
        
        if (localDefects !== originalDefects) {
          requestBody.defects = localDefects;
        }

        // Only make request if there are actual changes (beyond just sizeId)
        if (Object.keys(requestBody).length > 1) {
          await client({
            method: 'PATCH',
            url: url,
            data: requestBody,
          });

          // Update local data optimistically
          if (requestBody.factQuantity !== undefined) {
            size.factQuantity = localFactQuantity;
            // Also update the appropriate quantity field based on preparation status
            if (size.preparationStatus === 'completed') {
              size.produktQuantity = localFactQuantity;
            } else {
              size.tovarQuantity = localFactQuantity;
            }
          }
          if (requestBody.defects !== undefined) {
            size.defects = localDefects;
          }
          // Update calculated goods
          size.goods = (size.factQuantity || 0) - (size.defects || 0);

          // Propagate changes up to product and supplier levels
          if (onQuantityChange) {
            onQuantityChange(size.id, originalQuantity, localFactQuantity, originalDefects, localDefects);
          }

          toast({
            title: 'Успешно обновлено',
            description: 'Количество товара и брак размера обновлены',
          });

          // Refresh data to get updated daily changes from backend
          if (onRefetch) {
            setTimeout(() => onRefetch(), 500); // Small delay to ensure backend processing is complete
          }
        }
      }
    } catch (error: any) {
      console.error('Error updating size:', error);
      
      // Reset local state to original values on error
      setLocalFactQuantity(originalQuantity);
      setLocalDefects(originalDefects);
      
      toast({
        title: 'Ошибка',
        description: `Не удалось обновить размер: ${error.response?.data?.message || error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setLocalStorageLocation(size.storageLocation || '');
      setLocalFactQuantity(size.factQuantity || 0);
      setLocalDefects(size.defects || 0);
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    if (!canEdit) {
      toast({
        title: 'Редактирование недоступно',
        description: 'Размеры недоступны для редактирования',
        variant: 'destructive',
      });
      return;
    }
    setIsEditing(true);
  };

  // Reset local state when size data changes
  React.useEffect(() => {
    setLocalStorageLocation(size.storageLocation || '');
    setLocalFactQuantity(size.factQuantity || 0);
    setLocalDefects(size.defects || 0);
  }, [size.storageLocation, size.factQuantity, size.defects]);

  return (
    <>
      <TableRow rowSpace={'xs'}>
        <TableCell className={'w-[--storage-column-icon]'} level={1}>
          1
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          Размер
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {size.sizeDisplay || size.sizeKey || 'Размер'}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {/* Show editable Продукт field when preparation is completed (produktQuantity > 0) */}
          {size.preparationStatus === 'completed' ? (
            (isEditMode || isEditing) && canEdit ? (
              <Input
                type="number"
                value={localFactQuantity}
                onChange={(e) => setLocalFactQuantity(Number(e.target.value) || 0)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                disabled={isUpdating}
                placeholder="Продукт"
                className="w-full text-xs"
                min="0"
              />
            ) : (
              <div 
                className={`px-2 py-1 rounded ${canEdit ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed'}`}
                onClick={canEdit ? handleEditClick : undefined}
                title={canEdit ? "Нажмите для редактирования" : "Размеры недоступны для редактирования"}
              >
          {formatNumber(size.produktQuantity || 0)}
              </div>
            )
          ) : (
            formatNumber(size.produktQuantity || 0)
          )}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {/* Show editable Товар field when preparation is pending (tovarQuantity > 0) */}
          {size.preparationStatus === 'pending' ? (
            (isEditMode || isEditing) && canEdit ? (
              <Input
                type="number"
                value={localFactQuantity}
                onChange={(e) => setLocalFactQuantity(Number(e.target.value) || 0)}
                onBlur={handleSave}
                onKeyDown={handleKeyPress}
                disabled={isUpdating}
                placeholder="Товар"
                className="w-full text-xs"
                min="0"
              />
            ) : (
              <div 
                className={`px-2 py-1 rounded ${canEdit ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed'}`}
                onClick={canEdit ? handleEditClick : undefined}
                title={canEdit ? "Нажмите для редактирования" : "Размеры недоступны для редактирования"}
              >
          {formatNumber(size.tovarQuantity || 0)}
              </div>
            )
          ) : (
            formatNumber(size.tovarQuantity || 0)
          )}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          {(isEditMode || isEditing) && canEdit ? (
            <Input
              type="number"
              value={localDefects}
              onChange={(e) => setLocalDefects(Number(e.target.value) || 0)}
              onBlur={handleSave}
              onKeyDown={handleKeyPress}
              disabled={isUpdating}
              placeholder="Брак"
              className="w-full text-xs"
              min="0"
            />
          ) : (
            <div 
              className={`px-2 py-1 rounded ${canEdit ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed'}`}
              onClick={canEdit ? handleEditClick : undefined}
              title={canEdit ? "Нажмите для редактирования" : "Размеры недоступны для редактирования"}
            >
              {formatNumber(size.defects || 0)}
            </div>
          )}
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          0
        </TableCell>
        <TableCell className={'w-[--storage-column-place]'} level={1}>
          -
        </TableCell>
        <TableCell className={'w-[--storage-column-head]'} level={1}>
          0
        </TableCell>
        <TableCell className={'w-[--storage-column-icon]'} level={1}>
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditClick}
              disabled={isUpdating}
              className="h-6 w-6 p-0"
            >
              {isUpdating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : isEditing ? (
                <Check className="w-3 h-3" />
              ) : (
                <Edit3 className="w-3 h-3" />
              )}
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

const TableRowDailyChanges = ({ 
  dailyChanges, 
  currentTotals 
}: { 
  dailyChanges: { 
    products: { gained: number; lost: number; }; 
    items: { gained: number; lost: number; }; 
    defects: { gained: number; lost: number; }; 
    consumables: { gained: number; lost: number; }; 
    returns: { gained: number; lost: number; }; 
  };
  currentTotals: {
    products: number;
    items: number;
    defects: number;
    consumables: number;
    returns: number;
  };
}) => {
  const renderTotalWithChanges = (total: number, changes: { gained: number; lost: number; }) => {
    const hasGains = changes.gained > 0;
    const hasLosses = changes.lost > 0;
    
    return (
      <div className="flex items-center gap-3">
        {/* Center - Current Total with smaller font */}
        <div className="text-xs font-bold">
          {formatNumber(total)}
        </div>
        
        {/* Right side - Changes stacked vertically */}
        {(hasGains || hasLosses) && (
          <div className="flex flex-col gap-1">
            {hasGains && (
              <div className="flex items-center gap-1 text-xs" style={{ color: '#3AD213' }}>
                <ArrowUp className="w-3 h-3" />
                <span>{formatNumber(changes.gained)}</span>
              </div>
            )}
            {hasLosses && (
              <div className="flex items-center gap-1 text-xs" style={{ color: '#EA0D11' }}>
                <ArrowDown className="w-3 h-3" />
                <span>{formatNumber(changes.lost)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <TableRow className="bg-blue-50 border-t-2 border-blue-200">
      <TableCell className={'w-[--storage-column-icon]'}></TableCell>
      <TableCell className={'w-[calc(var(--storage-column-head)*2)] font-medium'}>
        Итого за сегодня
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        {renderTotalWithChanges(currentTotals.products, dailyChanges.products)}
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        {renderTotalWithChanges(currentTotals.items, dailyChanges.items)}
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        {renderTotalWithChanges(currentTotals.defects, dailyChanges.defects)}
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        {renderTotalWithChanges(currentTotals.consumables, dailyChanges.consumables)}
      </TableCell>
      <TableCell className={'w-[--storage-column-place]'}></TableCell>
      <TableCell className={'w-[--storage-column-head]'}>
        {renderTotalWithChanges(currentTotals.returns, dailyChanges.returns)}
      </TableCell>
      <TableCell className={'w-[--storage-column-icon]'}></TableCell>
    </TableRow>
  );
};