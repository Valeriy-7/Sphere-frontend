import { Row, Table as TTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow, TableRowExpand, TableHead, TableHeader } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { type ColSizeList } from '@/lib/TableHelpers';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { DataRow } from '@/lib/makeData';
import { DeliveryStatusProps } from './common';
import { formatDate } from '@/lib/utils/formatDate';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useFFAccountDeliveriesGetDeliveryProducts } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveryProducts';
import { useJWTAuthUser } from '@/modules/auth';
import { useToast } from '@/components/hooks/use-toast';
import { FFDeliveryProductDtoType, DeliveryProductSizeDto } from '@/kubb-gen/types/FFDeliveryProductDtoType';
import client from '@/modules/auth/axios-client';

// Type definitions to match the component's data structure
type SizeObject = {
  wbSize?: string;
  techSize?: string;
  sizeKey?: string;
  sizeDisplay?: string;
};

type SizeVolumeData = {
  key: string;
  display: string;
  product: FFDeliveryProductDtoType;
  sizeQuantity?: DeliveryProductSizeDto; // Add reference to the actual size quantity data
};

export function TableRowExpandLevel<TData>({
  row,
  colSizeList,
  table,
}: { row: Row<TData>; table: TTable<TData> } & ColSizeList) {
  const delivery = row.original as DataRow;
  const { cabinetId } = useJWTAuthUser();
  const { toast } = useToast();
  
  // Fetch delivery products (now includes enriched WB product data)
  const { data: deliveryProducts = [], isLoading } = useFFAccountDeliveriesGetDeliveryProducts(delivery.uuid);
  
  // State for warehouse place
  const [warehousePlace, setWarehousePlace] = useState('');

  // State for fact/defect quantities by size
  const [factValues, setFactValues] = useState<Record<string, number>>({});
  const [defectValues, setDefectValues] = useState<Record<string, number>>({});
  
  // State for size data (used for rendering)
  const [sizeVolumeData, setSizeVolumeData] = useState<SizeVolumeData[]>([]);
  
  // State for editable totals
  const [totalFactQuantity, setTotalFactQuantity] = useState(0);
  const [totalDefects, setTotalDefects] = useState(0);
  
  // Get the first product for display (main product info)
  const mainProduct = useMemo(() => deliveryProducts[0], [deliveryProducts]);
  
  // Initialize size data and quantities when delivery products change
  useEffect(() => {
    if (deliveryProducts.length > 0) {
      const mainProduct = deliveryProducts[0];
      
      // Set the warehouse place if it exists in the delivery data
      if ((delivery as any).warehouse && typeof (delivery as any).warehouse === 'object') {
        setWarehousePlace(
          ((delivery as any).warehouse as any).name || 
          (delivery as any).warehouse || 
          ''
        );
      }
      
      // Initialize totals from the first product
      setTotalFactQuantity(mainProduct.factQuantity ?? 0);
      setTotalDefects(mainProduct.defects ?? 0);
      
      console.log('=== INITIALIZING TOTALS FROM API ===');
      console.log('Main product factQuantity:', mainProduct.factQuantity);
      console.log('Main product defects:', mainProduct.defects);
      console.log('Setting totalFactQuantity to:', mainProduct.factQuantity ?? 0);
      console.log('Setting totalDefects to:', mainProduct.defects ?? 0);
    }
  }, [delivery.uuid, deliveryProducts]);

  // Calculate totals
  const factTotal = useMemo(() => 
    Object.values(factValues).reduce((sum, val) => sum + val, 0), 
    [factValues]
  );
  
  const defectTotal = useMemo(() => 
    Object.values(defectValues).reduce((sum, val) => sum + val, 0), 
    [defectValues]
  );
  
  const planTotal = useMemo(() => 
    deliveryProducts.reduce((sum, product) => sum + (product.planQuantity || 0), 0),
    [deliveryProducts]
  );
  
  // Calculate services total
  const servicesTotal = useMemo(() => {
    return deliveryProducts.reduce((sum, product) => {
      return sum + (product.logisticsPrice * (product.planQuantity || 0));
    }, 0);
  }, [deliveryProducts]);
  
  // Calculate FF consumables total
  const ffConsumablesTotal = useMemo(() => {
    return deliveryProducts.reduce((sum, product) => {
      return sum + (product.consumablesPrice * (product.planQuantity || 0));
    }, 0);
  }, [deliveryProducts]);

  // Prepare size/volume data based on enriched product info
  const sizeVolumeDataMemo = useMemo(() => {
    if (!deliveryProducts.length) return [];

    const mainProduct = deliveryProducts[0];
    
    // Create a map of sizeQuantities for quick lookup
    const sizeQuantitiesMap = new Map<string, DeliveryProductSizeDto>();
    if (mainProduct.sizeQuantities && mainProduct.sizeQuantities.length > 0) {
      console.log('=== sizeVolumeDataMemo: Available sizeQuantities ===', mainProduct.sizeQuantities);
      mainProduct.sizeQuantities.forEach(sizeQty => {
        // Try multiple keys for lookup (sizeKey, sizeDisplay, wbSize, techSize)
        if (sizeQty.sizeKey) sizeQuantitiesMap.set(sizeQty.sizeKey, sizeQty);
        if (sizeQty.sizeDisplay) sizeQuantitiesMap.set(sizeQty.sizeDisplay, sizeQty);
        if (sizeQty.wbSize) sizeQuantitiesMap.set(sizeQty.wbSize, sizeQty);
        if (sizeQty.techSize) sizeQuantitiesMap.set(sizeQty.techSize, sizeQty);
      });
    }

    // Primary approach: Use ALL sizes from WB data and merge in sizeQuantities
    if (mainProduct.sizes && mainProduct.sizes.length > 0) {
      console.log('=== sizeVolumeDataMemo: Processing all sizes from WB data ===', mainProduct.sizes);
      
      return mainProduct.sizes.map((size: any, index: number) => {
        // Create size key and display from WB size data
        const wbSize = size.wbSize || size.techSize;
        const techSize = size.techSize || size.wbSize;
        
        let sizeDisplay: string;
        if (wbSize && techSize && wbSize !== techSize) {
          sizeDisplay = `${wbSize} (${techSize})`;
        } else {
          sizeDisplay = wbSize || techSize || `Размер ${index + 1}`;
        }
        
        const sizeKey = `${sizeDisplay}_${index}`;
        
        // Look for existing quantities for this size
        let matchingSizeQty: DeliveryProductSizeDto | undefined;
        
        // Try to find matching sizeQuantity using various keys
        matchingSizeQty = 
          sizeQuantitiesMap.get(sizeKey) ||
          sizeQuantitiesMap.get(sizeDisplay) ||
          sizeQuantitiesMap.get(wbSize || '') ||
          sizeQuantitiesMap.get(techSize || '') ||
          sizeQuantitiesMap.get(`${wbSize}_${index}`) ||
          sizeQuantitiesMap.get(`${techSize}_${index}`);
        
        // Add volume info if available
        const display = mainProduct.volume && mainProduct.volumeUnit
          ? `${sizeDisplay} / ${mainProduct.volume}${mainProduct.volumeUnit}`
          : sizeDisplay;
        
        console.log(`=== sizeVolumeDataMemo: Size ${sizeDisplay} ===`, {
          sizeKey,
          display,
          matchingSizeQty: !!matchingSizeQty,
          quantities: matchingSizeQty ? { fact: matchingSizeQty.factQuantity, defects: matchingSizeQty.defects } : null
        });
        
        return {
          key: sizeKey,
          display: display,
          product: mainProduct,
          sizeQuantity: matchingSizeQty
        };
      });
    } 
    
    // Fallback: Use sizeQuantities when no sizes array is available
    else if (mainProduct.sizeQuantities && mainProduct.sizeQuantities.length > 0) {
      console.log('=== sizeVolumeDataMemo: Using sizeQuantities only (no sizes array) ===');
      
      return mainProduct.sizeQuantities.map((sizeQty, index) => {
        const sizeKey = sizeQty.sizeKey || `size_${index}`;
        const sizeDisplay = sizeQty.sizeDisplay || sizeQty.sizeKey || `Размер ${index + 1}`;
        
        const display = mainProduct.volume && mainProduct.volumeUnit
          ? `${sizeDisplay} / ${mainProduct.volume}${mainProduct.volumeUnit}`
          : sizeDisplay;
          
        console.log({
          key: sizeKey,
          display: display,
          productId: mainProduct.id,
          productName: mainProduct.name,
          sizeQuantity: sizeQty
        });
        
        return {
          display,
          key: sizeKey,
          product: mainProduct,
          sizeQuantity: sizeQty
        };
      });
    }
    
    // Last resort: Create single default size
    else {
      console.log('=== sizeVolumeDataMemo: No size data, creating default ===');
      return [{
        key: 'default_size',
        display: 'Единый размер',
        product: mainProduct,
        sizeQuantity: undefined
      }];
    }
  }, [deliveryProducts]);
  
  // Update fact and defect values when sizeVolumeDataMemo changes
  useEffect(() => {
    let initialFactValues: Record<string, number> = {};
    let initialDefectValues: Record<string, number> = {};
    
    sizeVolumeDataMemo.forEach(sizeData => {
      if (sizeData.sizeQuantity) {
        // Use quantities from sizeQuantity if available
        initialFactValues[sizeData.key] = sizeData.sizeQuantity.factQuantity || 0;
        initialDefectValues[sizeData.key] = sizeData.sizeQuantity.defects || 0;
      } else {
        // Default to 0 for sizes without quantities
        initialFactValues[sizeData.key] = 0;
        initialDefectValues[sizeData.key] = 0;
      }
    });
    
    setFactValues(initialFactValues);
    setDefectValues(initialDefectValues);
    
    console.log('=== Updated fact/defect values based on sizeVolumeDataMemo ===');
    console.log('sizeVolumeDataMemo:', sizeVolumeDataMemo);
    console.log('Initial fact values:', initialFactValues);
    console.log('Initial defect values:', initialDefectValues);
  }, [sizeVolumeDataMemo]);
  
  const handleFactEdit = async (sizeKey: string, value: number, product: FFDeliveryProductDtoType) => {
    // Update local state
    const newFactValues = { ...factValues, [sizeKey]: value };
    setFactValues(newFactValues);
    const calculatedTotal = Object.values(newFactValues).reduce((sum, val) => sum + val, 0);
    setTotalFactQuantity(calculatedTotal);
    
    // Call our simplified test function with the specific size data
    await updateSizeQuantities(sizeKey, value, defectValues[sizeKey] || 0);
  };
  
  // Helper function to update size quantities using the simplified approach
  const updateSizeQuantities = async (sizeKey: string, factValue: number, defectValue: number) => {
    if (deliveryProducts.length === 0) {
      console.error('No products available for update');
      toast({
        title: "Ошибка",
        description: "Не найдены товары для обновления",
        variant: "destructive"
      });
      return;
    }

    // Extra debug logging
    console.log('=== DEBUG: updateSizeQuantities ===');
    console.log('Delivery UUID:', delivery.uuid);
    console.log('All product IDs in deliveryProducts:', deliveryProducts.map(p => p.id));

    // Use sizeVolumeDataMemo for lookup!
    const sizeInfo = sizeVolumeDataMemo.find(item => item.key === sizeKey);
    const productForSize = sizeInfo?.product || deliveryProducts[0];
    
    // Use stored sizeQuantity data if available, otherwise construct from display name
    let sizeDisplay: string;
    let wbSize: string | undefined = undefined;
    let techSize: string | undefined = undefined;
    
    if (sizeInfo?.sizeQuantity) {
      // Use data from the actual sizeQuantity object
      sizeDisplay = sizeInfo.sizeQuantity.sizeDisplay;
      wbSize = sizeInfo.sizeQuantity.wbSize;
      techSize = sizeInfo.sizeQuantity.techSize;
    } else {
      // Fallback to parsing the display name
      sizeDisplay = sizeInfo?.display || sizeKey;
      
      // Try to extract wbSize and techSize from the display name
      if (sizeInfo) {
        const match = sizeInfo.display.match(/^([^(]+)\s*\(([^)]+)\)/);
        if (match) {
          wbSize = match[1].trim();
          techSize = match[2].trim();
        } else {
          wbSize = sizeInfo.display.split('/')[0].trim();
        }
      } else {
        wbSize = sizeKey;
      }
    }

    const sizeData = [
      {
        sizeKey: sizeKey,
        sizeDisplay: sizeDisplay,
        wbSize: wbSize,
        techSize: techSize,
        factQuantity: factValue,
        defects: defectValue
      }
    ];

    try {
      console.log('=== DEBUG: Updating size quantities ===');
      console.log('Delivery UUID:', delivery.uuid);
      console.log('Target product ID:', productForSize.id);
      console.log('All product IDs in deliveryProducts:', deliveryProducts.map(p => p.id));
      console.log('Size data:', sizeData);

      const url = `/ff-account/deliveries/${delivery.uuid}/products/${productForSize.id}/size-quantities`;
      console.log('Request URL:', url);

      const response = await client({
        method: 'PATCH',
        url: url,
        data: { 
          sizes: sizeData
        }
      });

      console.log('API response:', response.data);

      toast({
        title: "Успешно",
        description: "Размеры обновлены",
      });
      return true;
    } catch (error: any) {
      console.error('Error updating size quantities:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить количество по размерам",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleDefectEdit = async (sizeKey: string, value: number, product: FFDeliveryProductDtoType) => {
    // Update local state
    const newDefectValues = { ...defectValues, [sizeKey]: value };
    setDefectValues(newDefectValues);
    const calculatedTotal = Object.values(newDefectValues).reduce((sum, val) => sum + val, 0);
    setTotalDefects(calculatedTotal);
    
    // Call our simplified test function with the specific size data
    await updateSizeQuantities(sizeKey, factValues[sizeKey] || 0, value);
  };

  // Update warehouse place handler
  const updateWarehousePlace = useCallback(async (newWarehousePlace: string) => {
    try {
      await client({
        method: 'POST',
        url: `/ff-account/deliveries/${delivery.uuid}/warehouse-place`,
        data: { warehousePlace: newWarehousePlace }
      })
      
      toast({
        title: "Успешно",
        description: "Место склада обновлено",
      })
    } catch (error) {
      console.error('Error updating warehouse place:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить место склада",
        variant: "destructive",
      })
    }
  }, [delivery.uuid, toast])

  // Update total quantities for the delivery
  const updateTotalQuantities = async (fact: number, defect: number) => {
    if (deliveryProducts.length === 0) {
      console.error('No products available for update');
      return;
    }
    
    const targetProduct = deliveryProducts[0];
    console.log('Using target product for totals update:', targetProduct);
    
    try {
      // Log for debugging
      console.log('=== DEBUG: Updating total quantities ===');
      console.log('Delivery UUID:', delivery.uuid);
      console.log('Target product ID:', targetProduct.id);
      console.log('Total fact:', fact);
      console.log('Total defect:', defect);
      
      // Use the quantities endpoint with the first product's ID
      const url = `/ff-account/deliveries/${delivery.uuid}/products/${targetProduct.id}/quantities`;
      console.log('Request URL:', url);
      
      // Prepare size data for all sizes
      const sizeDataArray = sizeVolumeData.map(item => {
        // Extract wbSize and techSize from the display name
        let wbSize: string | undefined;
        let techSize: string | undefined;
        
        const sizeMatch = item.display.match(/^([^(]+)\s*\(([^)]+)\)/);
        if (sizeMatch) {
          wbSize = sizeMatch[1].trim();
          techSize = sizeMatch[2].trim();
        } else {
          // If no parentheses, use the whole display as wbSize
          wbSize = item.display.split('/')[0].trim();
        }
        
        return {
          sizeKey: item.key,
          sizeDisplay: item.display,
          wbSize: wbSize,
          techSize: techSize,
          factQuantity: factValues[item.key] || 0,
          defects: defectValues[item.key] || 0
        };
      });
      
      const response = await client({
        method: 'PATCH',
        url: url,
        data: { 
          factQuantity: fact,
          defects: defect,
          // Also include the structured size data
          sizes: sizeDataArray
        }
      });
      
      console.log('API response:', response.data);
      
      toast({
        title: "Успешно",
        description: "Количество обновлено",
      });
    } catch (error: any) {
      console.error('Error updating total quantities:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить общее количество",
        variant: "destructive"
      });
    }
  };

  // Debounce warehouse place updates
  useEffect(() => {
    if (warehousePlace && deliveryProducts.length > 0) {
      const timeoutId = setTimeout(() => {
        updateWarehousePlace(warehousePlace);
      }, 1000); // 1 second debounce

      return () => clearTimeout(timeoutId);
    }
  }, [warehousePlace, deliveryProducts.length, updateWarehousePlace]);

  // Debounce total quantities updates
  /* DISABLED: Automatic updates cause unwanted POST requests on load
  useEffect(() => {
    if (deliveryProducts.length > 0) {
      const timeoutId = setTimeout(() => {
        updateTotalQuantities(totalFactQuantity, totalDefects);
      }, 1000); // 1 second debounce

      return () => clearTimeout(timeoutId);
    }
  }, [totalFactQuantity, totalDefects, deliveryProducts.length, updateTotalQuantities]);
  */
  
  if (isLoading) {
  return (
    <TableRowExpand colSpan={row.getVisibleCells().length}>
        <div className="p-4 text-center">Загрузка...</div>
    </TableRowExpand>
  );
}

  if (!mainProduct) {
    return (
      <TableRowExpand colSpan={row.getVisibleCells().length}>
        <div className="p-4 text-center">Нет данных о продуктах</div>
      </TableRowExpand>
    );
  }

  return (
    <TableRowExpand colSpan={row.getVisibleCells().length}>
      <div className="p-4 bg-gray-50">
        {/* Main Content Grid */}
        <div className="grid grid-cols-[240px_repeat(7,1fr)] gap-4 items-start">
          
          {/* Product Image and Data + Mesto - Left Column */}
          <div className="space-y-1">
            {/* Product Image and Data Section - Side by Side */}
            <div className="flex gap-2">
              {/* Product Image */}
              <div className="w-24 h-40 flex-shrink-0">
                <img 
                  src={mainProduct.imageUrl || 'https://placehold.co/96x160?text=Фото'} 
                  alt={mainProduct.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Data Section */}
              <div className="flex-1 space-y-1">
                <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
                  Данные
                </Card>
                <div className="bg-gray-100 rounded px-2 py-2 space-y-1">
                  <div className="font-medium text-xs text-purple-600">{mainProduct.name}</div>
                  <div className="text-xs text-gray-700">Арт: {mainProduct.article}</div>
                  <div className="text-xs text-gray-700">Цвет: {mainProduct.color || 'Не указан'}</div>
                  <div className="text-xs text-gray-700">Категория: {mainProduct.category || 'Не указана'}</div>
                </div>
            
              <Card className="bg-purple-400 text-white  w-full justify-center text-xs py-1">
                Место
              </Card>
              <div className="bg-gray-200 rounded px-2 py-1 text-center">
                <Input
                  value={warehousePlace}
                  onChange={(e) => setWarehousePlace(e.target.value)}
                  className="h-5 text-center text-xs bg-transparent border-0 p-0 focus:bg-white focus:border"
                  placeholder="Место хранения"
                />
              </div>
            </div>
            </div>
          </div>

          {/* Plan + Fact + Brak Column */}
          <div className="space-y-1">
            {/* Plan Section */}
            <div className="space-y-1">
              <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
                План (ед)
              </Card>
              <div className="bg-gray-200 rounded px-2 py-1 text-center font-medium text-xs">
                {planTotal.toLocaleString('ru-RU')}
              </div>
            </div>

            {/* Fact Section */}
            <div className="space-y-1">
              <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
                Факт (ед)
              </Card>
              <div className="bg-gray-200 rounded px-2 py-1 text-center">
                <Input
                  type="number"
                  min="0"
                  value={totalFactQuantity}
                  onChange={(e) => setTotalFactQuantity(parseInt(e.target.value) || 0)}
                  onBlur={() => updateTotalQuantities(totalFactQuantity, totalDefects)}
                  className="h-5 text-center text-xs bg-transparent border-0 p-0 focus:bg-white focus:border font-medium"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Brak Section */}
            <div className="space-y-1">
              <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
                Брак (ед)
              </Card>
              <div className="bg-gray-200 rounded px-2 py-1 text-center">
                <Input
                  type="number"
                  min="0"
                  value={totalDefects}
                  onChange={(e) => setTotalDefects(parseInt(e.target.value) || 0)}
                  onBlur={() => updateTotalQuantities(totalFactQuantity, totalDefects)}
                  className="h-5 text-center text-xs bg-transparent border-0 p-0 focus:bg-white focus:border font-medium"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Sizes Column */}
          <div className="space-y-1">
            <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
              Размер / Объём
            </Card>
            <div className="space-y-0.5">
              {sizeVolumeDataMemo.map((item, index) => (
                <div key={index} className="bg-gray-200 rounded px-2 py-1 text-center text-xs">
                  {item.display}
                </div>
              ))}
            </div>
          </div>

          {/* Fact Column */}
          <div className="space-y-1">
            <Card className="bg-green-500 text-white w-full justify-center text-xs py-1">
              Факт
            </Card>
            <div className="space-y-0.5">
              {sizeVolumeDataMemo.map((item, index) => (
                <div key={index}>
                  <Input
                    type="number"
                    min="0"
                    value={factValues[item.key] || ''}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                      setFactValues(prev => ({ ...prev, [item.key]: value }));
                    }}
                    onBlur={() => {
                      const value = factValues[item.key] || 0;
                      handleFactEdit(item.key, value, item.product);
                    }}
                    className="h-5 text-center text-xs bg-gray-100 border focus:bg-white"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Defect Column */}
          <div className="space-y-1">
            <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
              Брак
            </Card>
            <div className="space-y-0.5">
              {sizeVolumeDataMemo.map((item, index) => (
                <div key={index}>
                  <Input
                    type="number"
                    min="0"
                    value={defectValues[item.key] || ''}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseInt(e.target.value) || 0;
                      setDefectValues(prev => ({ ...prev, [item.key]: value }));
                    }}
                    onBlur={() => {
                      const value = defectValues[item.key] || 0;
                      handleDefectEdit(item.key, value, item.product);
                    }}
                    className="h-5 text-center text-xs bg-gray-100 border focus:bg-white"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-1">
            <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
              Услуги
            </Card>
            <div className="bg-gray-200 rounded px-2 py-1 text-center font-medium text-xs">
              {servicesTotal.toLocaleString('ru-RU')} руб
            </div>
          </div>

          {/* Plan Cost Column */}
          <div className="space-y-1">
            <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
              Плановая стоимость
            </Card>
            <div className="bg-gray-200 rounded px-2 py-1 text-center font-medium text-xs">
              {(planTotal * (mainProduct.price || 0)).toLocaleString('ru-RU')} руб
            </div>
          </div>

          {/* Store Consumables Column */}
          <div className="space-y-1">
            <Card className="bg-purple-400 text-white w-full justify-center text-xs py-1">
              Расходники магазина
            </Card>
            <div className="bg-gray-200 rounded px-2 py-1 text-center font-medium text-xs">
              2-й этап
            </div>
          </div>
        </div>
      </div>
    </TableRowExpand>
  );
}


