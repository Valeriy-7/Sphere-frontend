import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import React, { useState, useEffect, useCallback } from 'react';
import { DataRow } from '@/lib/makeData';
import { Button } from '@/components/ui/button';
import { useFFAccountDeliveriesCompleteReception } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesCompleteReception';
import { useFFAccountDeliveriesGetDeliveryProducts } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveryProducts';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import client from '@/modules/auth/axios-client';
import { getResponsiblePersonsDisplayNames } from '../prepare/utils/parseResponsiblePersons';

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
}

/**
 * TableRowAcceptance - A specialized row component for deliveries in the "Приёмка" stage
 * This component displays responsible person and logistics type as text
 */
export function TableRowAcceptance<TData extends DataRow>({
  table,
  row,
  onClick,
  className,
  wbCabinetInfo,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  onClick: () => void;
  className?: string;
  wbCabinetInfo?: WbCabinetInfo | null;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPlace, setIsUpdatingPlace] = useState(false);
  const [placeValue, setPlaceValue] = useState('');
  const { toast } = useToast();
  
  // Get delivery products to get warehouse place info
  const { data: deliveryProducts = [] } = useFFAccountDeliveriesGetDeliveryProducts(row.original.uuid);
  
  // Initialize warehouse place from delivery products
  useEffect(() => {
    if (deliveryProducts.length > 0 && deliveryProducts[0]?.warehousePlace) {
      setPlaceValue(deliveryProducts[0].warehousePlace);
    }
  }, [deliveryProducts]);
  
  // Update warehouse place handler
  const updateWarehousePlace = useCallback(async (newWarehousePlace: string) => {
    try {
      await client({
        method: 'POST',
        url: `/ff-account/deliveries/${row.original.uuid}/warehouse-place`,
        data: { warehousePlace: newWarehousePlace }
      })
      
      toast({
        title: "Место обновлено",
        description: `Место склада "${newWarehousePlace}" обновлено`,
      })
    } catch (error) {
      console.error('Error updating warehouse place:', error)
      toast({
        title: "Ошибка",
        description: "Не удалось обновить место склада",
        variant: "destructive",
      })
    }
  }, [row.original.uuid, toast])

  // Debounce warehouse place updates
  useEffect(() => {
    if (placeValue && deliveryProducts.length > 0) {
      const timeoutId = setTimeout(() => {
        handlePlaceChange(placeValue);
      }, 1000); // 1 second debounce

      return () => clearTimeout(timeoutId);
    }
  }, [placeValue, deliveryProducts.length, updateWarehousePlace]);
  
  // Get responsible person and logistics provider data
  const { data: workers = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['ff-account-workers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        throw new Error('Failed to fetch responsible persons');
      }
      return response.json();
    },
  });
  
  const { data: logisticsProviders = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['ff-account-logistics-providers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/logistics-providers');
      if (!response.ok) {
        throw new Error('Failed to fetch logistics providers');
      }
      return response.json();
    },
  });
  
  // Get responsible persons display names using utility function
  const responsiblePersonsDisplayNames = getResponsiblePersonsDisplayNames(
    row.original.responsiblePersons,
    row.original.responsiblePerson,
    workers
  );
  
  // Find logistics provider name
  const logisticsProviderId = row.original.number7 ? String(row.original.number7) : undefined;
  const logisticsProviderName = logisticsProviders.find(p => p.id === logisticsProviderId)?.name || 'Не назначен';
  
  // Get complete reception API hook
  const completeReceptionMutation = useFFAccountDeliveriesCompleteReception();
  
  // Function to handle completing reception for individual delivery
  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    
    try {
      // Use the complete-reception endpoint for individual delivery
      await completeReceptionMutation.mutateAsync({
        id: row.original.uuid
      });
      
      toast({
        title: "Приёмка завершена",
        description: "Поставка перемещена в раздел Принято",
        variant: "default"
      });
      
      // Refresh the page to update the table data
      router.refresh();
    } catch (error) {
      console.error('Error completing reception:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось завершить приёмку поставки",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to handle place input change (used by debounce)
  const handlePlaceChange = async (value: string) => {
    if (!value.trim()) return;
    
    setIsUpdatingPlace(true);
    
    try {
      await updateWarehousePlace(value.trim());
      
      // Invalidate and refetch delivery products to get updated data
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-delivery-products', row.original.uuid]
      });
      
    } finally {
      setIsUpdatingPlace(false);
    }
  };

  // Handle input key press (Enter to save immediately)
  const handlePlaceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePlaceChange(placeValue);
    }
  };

  return (
    <TableRow className={className} onClick={onClick}>
      {/* Column 1: № */}
      <TableCell>{row.original.number}</TableCell>
      
      {/* Column 2: Дата поставки */}
      <TableCell>{formatDate(row.original.groupDate1)}</TableCell>
      
      {/* Column 3: Магазин - Display company name as title and legal company name as text */}
      <TableCell>
        <TableCardImgText
          image={{ src: row.original.image }}
          title={row.original.groupStoreName || row.original.title}
          text={wbCabinetInfo?.legalCompanyName || 'Юридическое название не указано'}
        />
      </TableCell>
      
      {/* Column 4: Кол-во товаров (ед) */}
      <TableCell>{row.original.number1to3}</TableCell>
      
      {/* Column 5: Гр. мест (ед) */}
      <TableCell>{row.original.number1to5}</TableCell>
      
      {/* Column 6: Объём (м3) */}
      <TableCell>{row.original.number1to10}</TableCell>
      
      {/* Column 7: Ответственный - Display as text */}
      <TableCell>
        <div className="text-xs">{responsiblePersonsDisplayNames}</div>
      </TableCell>
      
      {/* Column 8: Тип логистики - Display as text */}
      <TableCell>
        <div className="text-xs">{logisticsProviderName}</div>
      </TableCell>
      
      {/* Column 9: Статус/Действие - Input field */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Input 
          className="h-6 w-[110px] text-center text-xs px-2"
          placeholder="Место"
          value={placeValue}
          onChange={(e) => setPlaceValue(e.target.value)}
          onKeyPress={handlePlaceKeyPress}
          disabled={isUpdatingPlace}
        />
        {isUpdatingPlace && (
          <div className="text-xs text-gray-500 mt-1">Сохранение...</div>
        )}
      </TableCell>
    </TableRow>
  );
} 