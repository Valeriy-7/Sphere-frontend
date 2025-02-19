import { ColumnDef } from '@tanstack/react-table';

import {
  adminGetListSuspenseQueryKey,
  adminVerifyCabinetMutationKey,
  type ListItemDtoType,
  useAdminBlockUser,
  useAdminVerifyCabinet,
} from '@/kubb-gen';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils/formatDate';
import { Ban, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

import { useQueryClient } from '@tanstack/react-query';

export const columns: ColumnDef<ListItemDtoType>[] = [
  {
    accessorKey: 'number1',
    header: '№1',
    enableSorting: false,
    meta: {
      filterVariant: 'text',
      className: 'w-[50px]',
    },
  },
  {
    enableSorting: false,
    accessorKey: 'fullName',
    header: 'ФИО',
  },
  {
    enableSorting: false,
    accessorKey: 'phone',
    header: 'Номер телефона',
  },
  {
    enableSorting: false,
    accessorKey: 'number2',
    header: '№2',
    meta: {
      filterVariant: 'text',
      className: 'w-[50px]',
    },
  },
  {
    enableSorting: false,
    accessorKey: 'type',
    header: 'Тип компании',
  },
  {
    enableSorting: false,
    accessorKey: 'inn',
    header: 'ИНН',
  },
  {
    enableSorting: false,
    accessorKey: 'companyName',
    header: 'Название организации',
  },
  {
    enableSorting: false,
    accessorKey: 'createAt',
    header: 'Дата',
    cell: ({ getValue }) => {
      const value = getValue<Date>();
      return formatDate(value);
    },
  },
  {
    enableSorting: false,
    accessorKey: 'status',
    header: 'Статус',
  },
  {
    enableSorting: false,
    accessorKey: 'verify',
    header: 'Одобрено',
    cell: ({
      row: {
        original: { id, status },
      },
    }) => {
      const queryClient = useQueryClient();
      const { mutate } = useAdminVerifyCabinet({
        mutation: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [...adminGetListSuspenseQueryKey()],
            });
          },
        },
      });

      return (
        <>
          <Switch
            checked={status === 'VERIFIED'}
            onCheckedChange={(val) => {
              mutate({ id, data: { isVerified: val } });
            }}
          />
        </>
      );
    },
  },
  {
    enableSorting: false,
    accessorKey: 'block',
    header: 'Блок',
    cell: ({
      row: {
        original: { userId, status },
      },
    }) => {
      const queryClient = useQueryClient();
      const { mutate } = useAdminBlockUser({
        mutation: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [...adminGetListSuspenseQueryKey()],
            });
          },
        },
      });
      return (
        <>
          <Switch
            checked={status === 'BLOCKED'}
            onCheckedChange={(val) => {
              if (val)
                return mutate({
                  id: userId,
                  data: { isBlocked: val, reason: 'Без причины' },
                });
              else
                mutate({
                  id: userId,
                  data: {
                    isBlocked: val,
                    unblockReason: 'Без причины',
                    reason: '',
                  },
                });
            }}
          />
        </>
      );
    },
  },
];
