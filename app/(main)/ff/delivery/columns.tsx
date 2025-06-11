'use client';

import { ColumnDef } from '@tanstack/react-table';

import { type DataRow } from '@/lib/makeData';
import { getColumnNumber } from '@/lib/TableHelpers';
import { formatDate } from '@/lib/utils/formatDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getResponsiblePersonsDisplayNames } from '../prepare/utils/parseResponsiblePersons';

// Extended DataRow type with our additional fields
type ExtendedDataRow = DataRow & {
  logisticsType?: string;
};

export const columns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorKey: 'groupDate1',
    header: 'Дата поставки',
    getGroupingValue: (row) => `${formatDate(row.groupDate1)} - ${row.groupStoreName || row.title}`,
    sortingFn: 'datetime',
    cell: ({ row }) => (
      <span>{formatDate(row.original.groupDate1)}</span>
    ),
  },
  {
    enableSorting: false,
    accessorFn: ({ city, streetAddress }) => {
      const shopInfo = streetAddress && city 
        ? `${city} ${streetAddress}` 
        : streetAddress || city || '';
      return shopInfo;
    },
    id: 'streetAddress',
    header: 'Магазин',
  },
  {
    accessorKey: 'number1to3',
    header: 'Кол-во товаров (ед)',
    aggregationFn: 'sum',
  },
  {
    accessorKey: 'number1to5',
    header: 'Гр. мест (ед)',
    aggregationFn: 'sum',
  },
  {
    accessorKey: 'number1to10',
    header: 'Объём (м3)',
    aggregationFn: 'sum',
  },
  {
    id: 'responsiblePerson',
    header: 'Ответственный',
    enableSorting: false,
    cell: ({ row }) => {
      // Using type assertion to access our custom field
      const extendedRow = row.original as ExtendedDataRow;
      return (
        <Select defaultValue={extendedRow.contactPerson || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выбрать" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={extendedRow.contactPerson || ''}>
              {extendedRow.contactPerson || 'Выбрать'}
            </SelectItem>
            <SelectItem value="Иванов И.И.">Иванов И.И.</SelectItem>
            <SelectItem value="Петров П.П.">Петров П.П.</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: 'logisticsType',
    header: 'Тип логистики',
    enableSorting: false,
    cell: ({ row }) => {
      // Using type assertion to access our custom field
      const extendedRow = row.original as ExtendedDataRow;
      return (
        <Select defaultValue={extendedRow.logisticsType || ''}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выбрать" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={extendedRow.logisticsType || ''}>
              {extendedRow.logisticsType || 'Выбрать'}
            </SelectItem>
            <SelectItem value="Стандарт">Стандарт</SelectItem>
            <SelectItem value="Экспресс">Экспресс</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      const statusMap = {
        'new': 'Новый',
        'acceptance': 'Приёмка',
        'accepted': 'Принято'
      };
      const status = row.original.status as keyof typeof statusMap;
      return <span>{statusMap[status] || status}</span>;
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button variant="outline" size="xs">
        Приёмка
      </Button>
    ),
  },
];

// Specialized columns for acceptance table with read-only responsible person and logistics type
export const acceptanceColumns: ColumnDef<DataRow>[] = [
  getColumnNumber<DataRow>(),
  {
    accessorKey: 'groupDate1',
    header: 'Дата поставки',
    getGroupingValue: (row) => {
      // Create a grouped key that includes date, deliverer, responsible person, and logistics
      const datePart = formatDate(row.groupDate1);
      const delivererPart = row.groupStoreName || row.title;
      
      // For grouping purposes, we'll use a simplified approach for now
      // The actual names will be resolved in the component
      // Handle both responsiblePersons array and responsiblePerson string
      let responsibleId = 'none';
      if (row.responsiblePersons && Array.isArray(row.responsiblePersons) && row.responsiblePersons.length > 0) {
        responsibleId = row.responsiblePersons.map(p => p.id).join(',');
      } else if (row.responsiblePerson) {
        responsibleId = row.responsiblePerson;
      }
      const logisticsId = row.number7 ? String(row.number7) : 'none';
      
      return `${datePart} - ${delivererPart} - ${responsibleId} - ${logisticsId}`;
    },
    sortingFn: 'datetime',
    cell: ({ row }) => (
      <span>{formatDate(row.original.groupDate1)}</span>
    ),
  },
  {
    enableSorting: false,
    accessorFn: ({ city, streetAddress }) => {
      const shopInfo = streetAddress && city 
        ? `${city} ${streetAddress}` 
        : streetAddress || city || '';
      return shopInfo;
    },
    id: 'streetAddress',
    header: 'Магазин',
  },
  {
    accessorKey: 'number1to3',
    header: 'Кол-во товаров (ед)',
    aggregationFn: 'sum',
  },
  {
    accessorKey: 'number1to5',
    header: 'Гр. мест (ед)',
    aggregationFn: 'sum',
  },
  {
    accessorKey: 'number1to10',
    header: 'Объём (м3)',
    aggregationFn: 'sum',
  },
  {
    id: 'responsiblePerson',
    header: 'Ответственный',
    enableSorting: false,
    cell: ({ row }) => {
      // Display as read-only text for acceptance view
      const ResponsiblePersonDisplay = () => {
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
        
        const displayNames = getResponsiblePersonsDisplayNames(
          row.original.responsiblePersons,
          row.original.responsiblePerson,
          workers
        );
        
        return <div className="text-xs">{displayNames}</div>;
      };
      
      return <ResponsiblePersonDisplay />;
    },
  },
  {
    id: 'logisticsType',
    header: 'Тип логистики',
    enableSorting: false,
    cell: ({ row }) => {
      // Display as read-only text for acceptance view
      const LogisticsTypeDisplay = () => {
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
        
        const logisticsProviderId = row.original.number7 ? String(row.original.number7) : undefined;
        const logisticsProviderName = logisticsProviders.find(p => p.id === logisticsProviderId)?.name || 'Не назначен';
        
        return <div className="text-xs">{logisticsProviderName}</div>;
      };
      
      return <LogisticsTypeDisplay />;
    },
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => (
      <Button variant="outline" size="xs">
        Принято
      </Button>
    ),
  },
];
