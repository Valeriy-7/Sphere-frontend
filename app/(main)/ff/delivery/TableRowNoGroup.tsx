import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils/formatDate';
import { TableCardImgText } from '@/components/date-table/table-img-text';
import { getTotalColumn } from '@/lib/TableHelpers';
import { TableCellControlsGroup } from './TableCellControlsGroup';
import { TableCellControlsNoGroup } from './TableCellControlsNoGroup';
import { TableSelectEmployeeMultiple } from './TableSelectEmployee';
import { TableSelectLogistics } from './TableSelectLogistics';
import React, { useState, useEffect } from 'react';
import { DataRow } from '@/lib/makeData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useFFDeliveriesUpdateStatus } from '@/kubb-gen/hooks/ff-deliveries/useFFDeliveriesUpdateStatus';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { parseResponsiblePersons, getResponsiblePersonsDisplayNames } from '../prepare/utils/parseResponsiblePersons';
import { useFFAccountDeliveriesUpdateDeliveryDetails } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesUpdateDeliveryDetails';
import { useQuery } from '@tanstack/react-query';

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
}

interface ResponsiblePerson {
  id: string;
  name: string;
}

export function TableRowNoGroup<TData extends DataRow>({
  table,
  row,
  onClick,
  className,
  isAcceptance,
  isAccepted,
  wbCabinetInfo,
}: {
  table: TTable<TData>;
  row: Row<TData>;
  onClick: () => void;
  className?: string;
  isAcceptance?: boolean;
  isAccepted?: boolean;
  wbCabinetInfo?: WbCabinetInfo | null;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingResponsible, setIsUpdatingResponsible] = useState(false);
  const [isUpdatingLogistics, setIsUpdatingLogistics] = useState(false);
  const { toast } = useToast();
  
  // Fetch workers to match names with IDs
  const { data: workers = [] } = useQuery<ResponsiblePerson[]>({
    queryKey: ['ff-account-workers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        throw new Error('Failed to fetch workers');
      }
      return response.json();
    },
  });

  // Fetch logistics providers for display names
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
  
  // Initialize local state with parsed data
  const initialResponsiblePersons = parseResponsiblePersons(
    row.original.responsiblePersons,
    row.original.responsiblePerson,
    workers
  );
  

  
  // Track local state for responsible persons and logistics type
  const [localResponsiblePersons, setLocalResponsiblePersons] = useState<ResponsiblePerson[]>(initialResponsiblePersons);
  const [localLogisticsId, setLocalLogisticsId] = useState<string | undefined>(
    row.original.number7 ? String(row.original.number7) : undefined
  );
  
  // Check if grouping is enabled
  const isGroupingEnabled = table.getState().grouping.length > 0;
  
  // Update local state when row UUID changes (new row)
  useEffect(() => {
    const parsedResponsibles = parseResponsiblePersons(
      row.original.responsiblePersons,
      row.original.responsiblePerson,
      workers
    );
    setLocalResponsiblePersons(parsedResponsibles);
    setLocalLogisticsId(row.original.number7 ? String(row.original.number7) : undefined);
  }, [row.original.uuid]);

  // Update local state when workers data becomes available
  useEffect(() => {
    if (workers.length > 0) {
      const parsedResponsibles = parseResponsiblePersons(
        row.original.responsiblePersons,
        row.original.responsiblePerson,
        workers
      );
      setLocalResponsiblePersons(parsedResponsibles);
    }
  }, [workers.length, row.original.responsiblePersons, row.original.responsiblePerson]);
  
  // Get update API hooks
  const updateStatusMutation = useFFDeliveriesUpdateStatus();
  const updateDetailsMutation = useFFAccountDeliveriesUpdateDeliveryDetails();
  
  // Status mapping - removed 'new' status
  const statusMap = {
    'acceptance': 'Приёмка',
    'accepted': 'Принято'
  };
  const status = row.original.status as keyof typeof statusMap;
  
  // Function to handle responsible persons selection
  const handleResponsibleChange = async (selectedPersons: ResponsiblePerson[]) => {
    // Update local state immediately for UI responsiveness
    setLocalResponsiblePersons(selectedPersons);
    
    try {
      setIsUpdatingResponsible(true);
      
      // Send the worker IDs array to the backend
      const responsibleIds = selectedPersons.map(person => person.id);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${row.original.uuid}/responsible`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth.access_token='))?.split('=')[1] || ''}`
        },
        body: JSON.stringify({ responsibleIds })
      });
      
      toast({
        title: "Сохранено",
        description: "Ответственные сотрудники обновлены",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Error updating responsible persons:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить ответственных сотрудников",
        variant: "destructive"
      });
      // Revert local state on error
      const parsedResponsibles = parseResponsiblePersons(
        row.original.responsiblePersons,
        row.original.responsiblePerson,
        workers
      );
      setLocalResponsiblePersons(parsedResponsibles);
    } finally {
      setIsUpdatingResponsible(false);
    }
  };

  // Function to handle logistics type selection
  const handleLogisticsChange = async (value: string) => {
    // Update local state immediately for UI responsiveness
    setLocalLogisticsId(value);
    
    try {
      setIsUpdatingLogistics(true);
      
      // Only update the logistics provider without affecting status
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${row.original.uuid}/logistics-provider`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth.access_token='))?.split('=')[1] || ''}`
        },
        body: JSON.stringify({ logisticsProviderId: value })
      });
      
      toast({
        title: "Сохранено",
        description: "Тип логистики обновлен",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Error updating logistics type:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить тип логистики",
        variant: "destructive"
      });
      // Revert local state on error
      setLocalLogisticsId(row.original.number7 ? String(row.original.number7) : undefined);
    } finally {
      setIsUpdatingLogistics(false);
    }
  };
  
  // Function to handle changing status to acceptance (IN_PROGRESS)
  const handleChangeToAcceptance = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    
    try {
      // First, save any responsible person or logistics provider selections
      const updatePromises = [];
      
      if (localResponsiblePersons.length > 0) {
        const responsibleIds = localResponsiblePersons.map(person => person.id);
        updatePromises.push(
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${row.original.uuid}/responsible`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responsibleIds })
          })
        );
      }
      
      if (localLogisticsId) {
        updatePromises.push(
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ff-account/deliveries/${row.original.uuid}/logistics-provider`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${document.cookie.split('; ').find(row => row.startsWith('auth.access_token='))?.split('=')[1] || ''}`
            },
            body: JSON.stringify({ logisticsProviderId: localLogisticsId })
          })
        );
      }
      
      // Wait for all updates to complete
      if (updatePromises.length > 0) {
        await Promise.all(updatePromises);
      }
      
      // Then update the delivery status to IN_PROGRESS (corresponds to 'acceptance' tab)
      await updateStatusMutation.mutateAsync({
        id: row.original.uuid,
        data: { status: 'IN_PROGRESS' }
      });
      
      toast({
        title: "Статус изменен",
        description: "Поставка перемещена в раздел Приёмка",
        variant: "default"
      });
      
      // Refresh the page to update the table data
      router.refresh();
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус поставки",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
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
      
      {/* Column 7: Ответственный */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        {!isGroupingEnabled ? (
          isAccepted ? (
            // Show as text for accepted deliveries
            <div className="text-xs">
              {getResponsiblePersonsDisplayNames(
                row.original.responsiblePersons,
                row.original.responsiblePerson,
                workers
              )}
            </div>
          ) : (
            // Show as editable dropdown for new deliveries
            <TableSelectEmployeeMultiple 
            onValueChange={handleResponsibleChange}
              value={localResponsiblePersons}
            disabled={isAcceptance || isUpdatingResponsible} 
          />
          )
        ) : null}
      </TableCell>
      
      {/* Column 8: Тип логистики */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        {!isGroupingEnabled ? (
          isAccepted ? (
            // Show as text for accepted deliveries
            <div className="text-xs">
              {localLogisticsId 
                ? logisticsProviders.find(p => p.id === localLogisticsId)?.name || `Логистика ${localLogisticsId}`
                : 'Не назначен'
              }
            </div>
          ) : (
            // Show as editable dropdown for new deliveries
          <TableSelectLogistics 
            onValueChange={handleLogisticsChange}
            value={localLogisticsId}
            disabled={isAcceptance || isUpdatingLogistics} 
          />
          )
        ) : null}
      </TableCell>
      
      {/* Column 9: Статус/Действие */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        {!isGroupingEnabled || isAccepted ? (
          statusMap[status] ? (
            // Show acceptance date/time for accepted deliveries
            status === 'accepted' && row.original.acceptedAt ? (
              <div className="text-xs">
                {formatDate(row.original.acceptedAt)} {new Date(row.original.acceptedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
            ) : (
              <span>{statusMap[status]}</span>
            )
          ) : (
            <Button 
              variant="outline" 
              size="xs" 
              disabled={isUpdating}
              onClick={handleChangeToAcceptance}
            >
              {isUpdating ? "Обновление..." : "Приёмка"}
            </Button>
          )
        ) : (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={row.getToggleSelectedHandler()}
            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
          />
        )}
      </TableCell>
    </TableRow>
  );
}
