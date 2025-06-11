import { Table as TTable } from '@tanstack/react-table';
import { Row } from '@tanstack/react-table';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useCallback } from 'react';
import { TableSelectEmployeeMultiple } from '../delivery/TableSelectEmployee';
import { TableSelectLogistics } from './TableSelectLogistics';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@/components/date-picker';
import { DataRow } from '@/lib/makeData';
import { useFFAccountDeliveriesGetDeliveryProducts } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveryProducts';
import { useFFAccountDeliveriesUpdateDeliveryStatus } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesUpdateDeliveryStatus';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import client from '@/modules/auth/axios-client';
import { useQuery } from '@tanstack/react-query';
import { parseResponsiblePersons } from './utils/parseResponsiblePersons';

interface ResponsiblePerson {
  id: string;
  name: string;
}

const FormSchema = z.object({
  // Remove employee from form schema since we'll handle it separately
  // date: z.date({  // This field was causing a validation error and is not used by onSubmit
  //   required_error: 'Date is required',
  //   invalid_type_error: "That's not a date!",
  // }),
});

export function TableCellControlsGroup<TData>({
  table,
  row,
  context = 'new',
}: {
  table: TTable<TData>;
  row: Row<TData>;
  context?: 'new' | 'inprogress' | 'completed';
}) {
  const updateDeliveryStatusMutation = useFFAccountDeliveriesUpdateDeliveryStatus();
  const queryClient = useQueryClient();
  
  // Get delivery data
  const deliveryData = row.original as DataRow;
  const deliveryId = deliveryData.uuid;
  
  // Fetch delivery products to get warehouse place info
  const { data: deliveryProducts = [] } = useFFAccountDeliveriesGetDeliveryProducts(deliveryId);
  
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
  
  // State for warehouse location
  const [placeValue, setPlaceValue] = useState('');
  const [isUpdatingPlace, setIsUpdatingPlace] = useState(false);
  
  // State for selected employees
  const [selectedEmployees, setSelectedEmployees] = useState<ResponsiblePerson[]>([]);
  const [isUpdatingResponsibles, setIsUpdatingResponsibles] = useState(false);
  
  // Initialize warehouse place from delivery products
  useEffect(() => {
    if (deliveryProducts.length > 0 && deliveryProducts[0]?.warehousePlace) {
      setPlaceValue(deliveryProducts[0].warehousePlace);
    }
  }, [deliveryProducts]);
  
  // Initialize selected employees from delivery data
  useEffect(() => {
    console.log('[TableCellControlsGroup] Initializing employees for delivery:', deliveryId);
    console.log('[TableCellControlsGroup] deliveryData.responsiblePersons:', deliveryData.responsiblePersons);
    console.log('[TableCellControlsGroup] deliveryData.responsiblePerson:', deliveryData.responsiblePerson);
    console.log('[TableCellControlsGroup] workers:', workers);
    
    const parsedResponsibles = parseResponsiblePersons(
      deliveryData.responsiblePersons,
      deliveryData.responsiblePerson,
      workers
    );
    
    console.log('[TableCellControlsGroup] Parsed responsible persons:', parsedResponsibles);
    setSelectedEmployees(parsedResponsibles);
  }, [deliveryData.responsiblePersons, deliveryData.responsiblePerson, workers]);
  
  // Handle responsible persons assignment
  const handleResponsiblePersonsChange = useCallback(async (newResponsibles: ResponsiblePerson[]) => {
    setSelectedEmployees(newResponsibles);
    
    if (context === 'new') { // Only auto-save for new deliveries, not in-progress or completed
      setIsUpdatingResponsibles(true);
      
      try {
        if (newResponsibles.length === 0) {
          // If none selected, send empty array to clear assignments
          console.log('[TableCellControlsGroup] Clearing responsible persons');
          await client({
            method: 'POST',
            url: `/ff-account/deliveries/${deliveryId}/responsible`,
            data: { responsibleIds: [] },
          });
        } else {
          // Send all selected responsible person IDs
          const responsibleIds = newResponsibles.map(person => person.id).filter(id => id !== 'unknown');
          console.log('[TableCellControlsGroup] Auto-assigning responsible persons:', responsibleIds);

          await client({
            method: 'POST',
            url: `/ff-account/deliveries/${deliveryId}/responsible`,
            data: { responsibleIds },
          });
        }
        
        console.log('[TableCellControlsGroup] Responsible persons assigned successfully');
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({
          queryKey: ['ff-account-deliveries-get-deliveries']
        });
        
      } catch (error) {
        console.error('Error updating responsible persons:', error);
        toast.error('Не удалось обновить ответственных сотрудников');
      } finally {
        setIsUpdatingResponsibles(false);
      }
    }
  }, [deliveryId, context, queryClient]);
  
  // Update warehouse place handler
  const updateWarehousePlace = useCallback(async (newWarehousePlace: string) => {
    try {
      await client({
        method: 'POST',
        url: `/ff-account/deliveries/${deliveryId}/warehouse-place`,
        data: { warehousePlace: newWarehousePlace }
      })
      
      // Removed success toast to prevent showing on reload
    } catch (error) {
      console.error('Error updating warehouse place:', error)
      toast.error('Не удалось обновить место склада');
    }
  }, [deliveryId]);
  
  // Debounce warehouse place updates
  useEffect(() => {
    if (placeValue && deliveryProducts.length > 0) {
      const timeoutId = setTimeout(() => {
        handlePlaceChange(placeValue);
      }, 1000); // 1 second debounce

      return () => clearTimeout(timeoutId);
    }
  }, [placeValue, deliveryProducts.length, updateWarehousePlace]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  // Format the delivery date to show only day, month, year
  const formatDeliveryDate = (dateString: string | undefined) => {
    if (!dateString) return 'Нет даты';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch (error) {
      return 'Неверная дата';
    }
  };

  // Handle warehouse location save
  const handlePlaceChange = async (value: string) => {
    if (!value.trim()) return;
    
    setIsUpdatingPlace(true);
    
    try {
      await updateWarehousePlace(value.trim());
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-delivery-products', deliveryId]
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('[TableCellControlsGroup] onSubmit triggered');
    const selectedWorkerIds = selectedEmployees.map((emp) => emp.id);
    const currentDelivery = row.original as DataRow;
    
    // Determine current status based on context prop
    const isInProgress = context === 'inprogress';
    const isCompleted = context === 'completed';
    
    if (isCompleted) {
      // Handle invoice creation for completed deliveries
      try {
        console.log('[TableCellControlsGroup] Attempting to issue invoice for completed delivery...');
        // TODO: Add invoice creation API call here
        // await issueInvoiceMutation.mutateAsync({ id: deliveryId });
        
        toast.success('Счет выставлен успешно');
      } catch (error) {
        console.error('[TableCellControlsGroup] Error issuing invoice:', error);
        toast.error('Ошибка при выставлении счета');
      }
      return;
    }
    
    const targetStatus = isInProgress ? 'COMPLETED' : 'TO_WORK';
    const successMessage = isInProgress ? 'Подготовка завершена' : 'Подготовка начата';
    
    console.log('[TableCellControlsGroup] deliveryId:', deliveryId, 'selectedWorkerIds:', selectedWorkerIds, 'targetStatus:', targetStatus, 'context:', context);

    try {
      console.log('[TableCellControlsGroup] Entering try block');
      // Assign multiple responsible persons if any selected (only for non-new context since new context auto-saves)
      if (selectedWorkerIds.length > 0 && context !== 'new') {
        console.log('[TableCellControlsGroup] Assigning responsible persons:', selectedWorkerIds);
        await client({
          method: 'POST',
          url: `/ff-account/deliveries/${deliveryId}/responsible`,
          data: { responsibleIds: selectedWorkerIds },
        });
        console.log('[TableCellControlsGroup] Assigned responsible persons successfully');
      } else if (context === 'new') {
        console.log('[TableCellControlsGroup] Responsible persons already auto-assigned for new deliveries.');
      } else {
        console.log('[TableCellControlsGroup] No responsible persons selected, skipping assignment.');
      }

      // Update delivery status (ACCEPTED -> TO_WORK or TO_WORK -> COMPLETED)
      console.log('[TableCellControlsGroup] Attempting to update delivery status to:', targetStatus);
      await updateDeliveryStatusMutation.mutateAsync({
        id: deliveryId,
        data: { status: targetStatus as any }
      });
      console.log('[TableCellControlsGroup] updateDeliveryStatusMutation successful');

      // Refresh the deliveries data
      console.log('[TableCellControlsGroup] Invalidating queries...');
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-deliveries']
      });
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-deliveries', { status: 'ACCEPTED' }]
      });
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-deliveries', { status: 'TO_WORK' }]
      });
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-deliveries', { status: 'PREPARATION' }]
      });
      queryClient.invalidateQueries({
        queryKey: ['ff-account-deliveries-get-deliveries', { status: 'COMPLETED' }]
      });
      console.log('[TableCellControlsGroup] Queries invalidated.');

      toast.success(successMessage + (selectedWorkerIds.length > 0 ? ' и ответственные сотрудники обновлены' : ''));

    } catch (error) {
      console.error('[TableCellControlsGroup] Error in onSubmit:', error);
      const errorMessage = isInProgress ? 'Ошибка при завершении подготовки' : 'Ошибка при начале подготовки';
      toast.error(errorMessage + (selectedWorkerIds.length > 0 ? ' или обновлении ответственных сотрудников' : ''));
    }
  }

  // Determine button text and behavior based on context prop
  const isInProgress = context === 'inprogress';
  const isCompleted = context === 'completed';
  const buttonText = isCompleted ? 'Выставить счет' : (isInProgress ? 'Выполнено' : 'В работу');
  const loadingText = isCompleted ? 'Обработка...' : (isInProgress ? 'Завершение...' : 'Сохранение...');

  return (
    <Form {...form}>
    <TableCell onClick={(e) => e.stopPropagation()}>
        {isCompleted ? (
          // Empty cell for completed deliveries
          <></>
        ) : (
          <Input 
            className="h-6 w-[110px] text-center text-xs px-2"
            placeholder="Место"
            value={placeValue}
            onChange={(e) => setPlaceValue(e.target.value)}
            onKeyPress={handlePlaceKeyPress}
            disabled={isUpdatingPlace}
          />
        )}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        {/* <DatePicker form={form} name={'date'} /> */}
        <span>{formatDeliveryDate((row.original as DataRow).deliveryDate)}</span>
      </TableCell>
      
      <TableCell onClick={(e) => e.stopPropagation()}>
        {isCompleted ? (
          <Button
            size={'xs'}
            variant="outline"
            disabled={true}
            className="text-muted-foreground cursor-not-allowed"
          >
            <span className="truncate">
              {selectedEmployees.length > 0 ? 
                (selectedEmployees.length === 1 ? selectedEmployees[0].name : `${selectedEmployees.length} сотрудников`)
                : (deliveryData.responsiblePerson ? deliveryData.responsiblePerson : 'Не назначены')}
            </span>
          </Button>
        ) : context === 'inprogress' ? (
          <Button
            size={'xs'}
            variant="outline"
            disabled={true}
            className="text-muted-foreground cursor-not-allowed"
          >
            <span className="truncate">
              {selectedEmployees.length > 0 ? 
                (selectedEmployees.length === 1 ? selectedEmployees[0].name : `${selectedEmployees.length} сотрудников`)
                : (deliveryData.responsiblePerson ? deliveryData.responsiblePerson : 'Не назначены')}
            </span>
          </Button>
        ) : (
          <TableSelectEmployeeMultiple
            value={selectedEmployees}
            onValueChange={handleResponsiblePersonsChange}
            disabled={isUpdatingResponsibles}
            placeholder="Выбрать"
          />
        )}
      </TableCell>
      
      {/* Hide маркировка button for completed deliveries */}
      {!isCompleted && (
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Button variant={'secondary'} size={'xs'} className='shadow-md bg-gray-50 hover:shadow-md rounded-md border border-gray-200 px-4 hover:bg-white'>
            Печать
          </Button>
        </TableCell>
      )}
      {isCompleted && (
        <TableCell >
          
        </TableCell>
      )}
    
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Button
          type={'button'}
          onClick={form.handleSubmit(onSubmit)}
          variant={isCompleted ? 'default' : 'outline'}
          size={'xs'}
          disabled={updateDeliveryStatusMutation.isPending}
          className={isCompleted ? 'bg-purple-500 hover:bg-purple-600 text-white' : ''}
        >
          {updateDeliveryStatusMutation.isPending ? loadingText : buttonText}
        </Button>
      </TableCell>
    </Form>
  );
}
