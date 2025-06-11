import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';
import { getTotalColumn } from '@/lib/TableHelpers';
import React, { useState, useEffect } from 'react';
import { TableSelectEmployee, TableSelectEmployeeMultiple } from './TableSelectEmployee';
import { TableSelectLogistics } from './TableSelectLogistics';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/hooks/use-toast';
import type { DataRow } from '@/lib/makeData';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useFFDeliveriesUpdateStatus } from '@/kubb-gen/hooks/ff-deliveries/useFFDeliveriesUpdateStatus';
import { useQuery } from '@tanstack/react-query';

export function TableRowGroupHeader<TData extends DataRow>({
  table,
  row,
  isAcceptance,
  isAccepted,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  isAcceptance?: boolean;
  isAccepted?: boolean;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedResponsiblePersons, setSelectedResponsiblePersons] = useState<{ id: string; name: string }[]>([]);
  const [selectedLogisticsId, setSelectedLogisticsId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { rowSelection } = table.getState();

  // Get status update API hook
  const updateStatusMutation = useFFDeliveriesUpdateStatus();

  // Fetch responsible persons for name resolution
  const { data: responsiblePersons = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ['ff-account-workers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        throw new Error('Failed to fetch responsible persons');
      }
      return response.json();
    },
  });

  // Fetch logistics providers for name resolution
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

  // Function to get current values from selected deliveries
  const updateCurrentValues = () => {
    const leafRows = row.getLeafRows();
    const selectedDeliveries = leafRows.filter(leafRow => rowSelection[leafRow.id]);
    
    if (selectedDeliveries.length === 0) {
      setSelectedResponsiblePersons([]);
      setSelectedLogisticsId('');
      return;
    }

    // Check if all selected deliveries have the same responsible persons
    const allResponsiblePersons = selectedDeliveries
      .map(delivery => {
        // Handle both responsiblePersons array and responsiblePerson string
        if (delivery.original.responsiblePersons && Array.isArray(delivery.original.responsiblePersons) && delivery.original.responsiblePersons.length > 0) {
          return delivery.original.responsiblePersons;
        } else if (delivery.original.responsiblePerson) {
          try {
            const parsedIds = JSON.parse(delivery.original.responsiblePerson);
            if (Array.isArray(parsedIds)) {
              return parsedIds.map(id => responsiblePersons.find(p => p.id === id)).filter(p => p !== undefined);
            }
          } catch (e) {
            // Not JSON, handle as single ID
            const person = responsiblePersons.find(p => p.id === delivery.original.responsiblePerson);
            return person ? [person] : [];
          }
        }
        return [];
      });
    
    // Check if all deliveries have the same set of responsible persons
    const firstDeliveryResponsibles = allResponsiblePersons[0] || [];
    const allSame = allResponsiblePersons.every(responsibles => 
      responsibles.length === firstDeliveryResponsibles.length &&
      responsibles.every(person => firstDeliveryResponsibles.some(fp => fp.id === person.id))
    );
    
    if (allSame && allResponsiblePersons.length === selectedDeliveries.length) {
      setSelectedResponsiblePersons(firstDeliveryResponsibles);
    } else {
      setSelectedResponsiblePersons([]);
    }

    // Check if all selected deliveries have the same logistics type
    const logisticsIds = selectedDeliveries
      .map(delivery => delivery.original.number7 ? String(delivery.original.number7) : '')
      .filter(id => id !== '');
    
    const uniqueLogisticsIds = [...new Set(logisticsIds)];
    if (uniqueLogisticsIds.length === 1 && logisticsIds.length === selectedDeliveries.length) {
      setSelectedLogisticsId(uniqueLogisticsIds[0]);
    } else {
      setSelectedLogisticsId('');
    }
  };

  // Update current values when selection changes
  useEffect(() => {
    updateCurrentValues();
  }, [rowSelection, row]);

  // Calculate sum for number1to3 (Кол-во товаров)
  const sumQuantity = row
    .getLeafRows()
    .map((row) => (rowSelection[row.id] ? (row.getValue('number1to3') as number) || 0 : 0))
    .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

  // Calculate sum for number1to5 (Гр. мест)
  const sumCargoPlaces = row
    .getLeafRows()
    .map((row) => (rowSelection[row.id] ? (row.getValue('number1to5') as number) || 0 : 0))
    .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

  // Calculate sum for number1to10 (Объём)
  const sumVolume = row
    .getLeafRows()
    .map((row) => (rowSelection[row.id] ? (row.getValue('number1to10') as number) || 0 : 0))
    .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);

  // Extract deliverer name, responsible person, and logistics from the grouping value
  // The grouping value format is: "DD.MM.YYYY - DelivererName - ResponsiblePersonId - LogisticsTypeId"
  const groupingValue = row.getValue('groupDate1');
  let delivererName = '';
  let responsiblePersonId = '';
  let logisticsId = '';
  
  // Handle different types of grouping values
  if (typeof groupingValue === 'string' && groupingValue.includes(' - ')) {
    const parts = groupingValue.split(' - ');
    if (parts.length >= 4) {
      // New format: Date - Deliverer - ResponsibleId - LogisticsId
      delivererName = parts[1];
      responsiblePersonId = parts[2] !== 'none' ? parts[2] : '';
      logisticsId = parts[3] !== 'none' ? parts[3] : '';
    } else if (parts.length >= 2) {
      // Old format: Date - Deliverer
      delivererName = parts[1];
    }
  } else {
    // Fallback to original row data
    delivererName = (row.original as any).groupStoreName || (row.original as any).title || '';
  }

  // Resolve names from IDs
  const responsiblePersonName = responsiblePersonId 
    ? responsiblePersons.find(p => p.id === responsiblePersonId)?.name || 'Не найден'
    : 'Не назначен';
  
  const logisticsProviderName = logisticsId 
    ? logisticsProviders.find(p => p.id === logisticsId)?.name || 'Не найден'
    : 'Не назначен';

  // Get the date value for display
  const dateValue = typeof groupingValue === 'string' && groupingValue.includes(' - ') 
    ? groupingValue.split(' - ')[0] 
    : groupingValue;

  // Handle group-level responsible person assignment (apply to all deliveries in group)
  const handleGroupResponsibleChange = async (selectedPersons: { id: string; name: string }[]) => {
    setSelectedResponsiblePersons(selectedPersons);
    
    // Get ALL deliveries in this group (not just selected ones)
    const leafRows = row.getLeafRows();
    const allDeliveriesInGroup = leafRows; // Apply to all deliveries in the group
    
    if (allDeliveriesInGroup.length === 0) {
      toast({
        title: "Предупреждение",
        description: "Нет поставок в группе для назначения ответственного",
        variant: "destructive"
      });
      return;
    }

    if (selectedPersons.length === 0) {
      return;
    }

    try {
      // Apply responsible persons to each delivery in the group
      let successCount = 0;
      let errorCount = 0;
      const responsibleIds = selectedPersons.map(person => person.id);

      for (const delivery of allDeliveriesInGroup) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${delivery.original.uuid}/responsible`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth.access_token='))?.split('=')[1] || ''}`
            },
            body: JSON.stringify({ responsibleIds })
          });
          
          successCount++;
        } catch (error) {
          console.error(`Error updating responsible person for delivery ${delivery.original.uuid}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Назначен ответственный",
          description: `Ответственный назначен для ${successCount} поставок в группе${errorCount > 0 ? `, ${errorCount} ошибок` : ''}`,
          variant: "default"
        });
        
        // Invalidate deliveries query to refetch fresh data
        await queryClient.invalidateQueries({
          queryKey: [{ url: '/ff-account/deliveries' }]
        });
      }
      
      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Ошибка",
          description: "Не удалось назначить ответственного ни для одной поставки",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error in group responsible assignment:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при назначении ответственного",
        variant: "destructive"
      });
    }
  };

  // Handle group-level logistics assignment (apply to all deliveries in group)
  const handleGroupLogisticsChange = async (value: string) => {
    setSelectedLogisticsId(value);
    
    // Get ALL deliveries in this group (not just selected ones)
    const leafRows = row.getLeafRows();
    const allDeliveriesInGroup = leafRows; // Apply to all deliveries in the group
    
    if (allDeliveriesInGroup.length === 0) {
      toast({
        title: "Предупреждение",
        description: "Нет поставок в группе для назначения логистики",
        variant: "destructive"
      });
      return;
    }

    if (!value) {
      return;
    }

    try {
      // Apply logistics type to each delivery in the group
      let successCount = 0;
      let errorCount = 0;

      for (const delivery of allDeliveriesInGroup) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${delivery.original.uuid}/logistics-provider`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth.access_token='))?.split('=')[1] || ''}`
            },
            body: JSON.stringify({ logisticsProviderId: value })
          });
          
          successCount++;
        } catch (error) {
          console.error(`Error updating logistics for delivery ${delivery.original.uuid}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Назначен тип логистики",
          description: `Тип логистики назначен для ${successCount} поставок в группе${errorCount > 0 ? `, ${errorCount} ошибок` : ''}`,
          variant: "default"
        });
        
        // Invalidate deliveries query to refetch fresh data
        await queryClient.invalidateQueries({
          queryKey: [{ url: '/ff-account/deliveries' }]
        });
      }
      
      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Ошибка",
          description: "Не удалось назначить тип логистики ни для одной поставки",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error in group logistics assignment:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при назначении типа логистики",
        variant: "destructive"
      });
    }
  };

  // Handle sending entire group to accepted status (status change to ACCEPTED)
  const handleGroupAcceptance = async () => {
    setIsProcessing(true);
    
    try {
      // Get all selected deliveries in this group
      const leafRows = row.getLeafRows();
      const selectedDeliveries = leafRows.filter(leafRow => rowSelection[leafRow.id]);
      
      if (selectedDeliveries.length === 0) {
        toast({
          title: "Предупреждение",
          description: "Не выбраны поставки для принятия",
          variant: "destructive"
        });
        return;
      }

      // Send status update requests for each delivery
      let successCount = 0;
      let errorCount = 0;

      for (const delivery of selectedDeliveries) {
        try {
          await updateStatusMutation.mutateAsync({
            id: delivery.original.uuid,
            data: { status: 'ACCEPTED' }
          });
          successCount++;
        } catch (error) {
          console.error(`Error updating status for delivery ${delivery.original.uuid}:`, error);
          errorCount++;
        }
      }
      
      if (successCount > 0) {
        toast({
          title: "Поставки приняты",
          description: `${successCount} поставок перемещено в раздел Принято${errorCount > 0 ? `, ${errorCount} ошибок` : ''}`,
          variant: "default"
        });
        
        // Invalidate deliveries query to refetch fresh data
        await queryClient.invalidateQueries({
          queryKey: [{ url: '/ff-account/deliveries' }]
        });
      }
      
      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "Ошибка",
          description: "Не удалось принять ни одной поставки",
          variant: "destructive"
        });
      }
      
    } catch (error) {
      console.error('Error processing group acceptance:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при принятии группы",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <TableRow className="bg-gray-50 font-medium">
        {/* Column 1: № */}
        <TableCell>Дата</TableCell>
        
        {/* Column 2: Дата поставки */}
        <TableCell className="text-primary">
          {typeof dateValue === 'string' ? dateValue : formatDate(dateValue as string | Date)}
        </TableCell>
        
        {/* Column 3: Магазин - Show deliverer name */}
        <TableCell className="text-primary font-medium">{delivererName}</TableCell>
        
        {/* Column 4: Кол-во товаров (ед) */}
        <TableCell>{sumQuantity}</TableCell>
        
        {/* Column 5: Гр. мест (ед) */}
        <TableCell>{sumCargoPlaces}</TableCell>
        
        {/* Column 6: Объём (м3) */}
        <TableCell>{sumVolume}</TableCell>
        
        {/* Column 7: Ответственный - Group level control */}
        <TableCell onClick={(e) => e.stopPropagation()}>
          {isAcceptance ? (
            <div>cla</div>
          ) : (
            <TableSelectEmployeeMultiple 
              onValueChange={handleGroupResponsibleChange}
              value={selectedResponsiblePersons}
              disabled={isAcceptance} 
            />
          )}
        </TableCell>
        
        {/* Column 8: Тип логистики - Group level control */}
        <TableCell onClick={(e) => e.stopPropagation()}>
          {isAcceptance ? (
            <div></div>
          ) : (
            <TableSelectLogistics 
              onValueChange={handleGroupLogisticsChange}
              value={selectedLogisticsId}
              disabled={isAcceptance} 
            />
          )}
        </TableCell>
        
        {/* Column 9: Статус/Действие - Group level control */}
        <TableCell onClick={(e) => e.stopPropagation()}>
          {!isAcceptance && !isAccepted && (
            <Button 
              variant="outline" 
              size="xs" 
              onClick={handleGroupAcceptance}
              disabled={isProcessing}
            >
              {isProcessing ? "Обработка..." : "Принято"}
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}

