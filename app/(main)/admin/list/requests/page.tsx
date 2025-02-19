'use client';

import { AdminListTable } from '../admin-list-table';
import { columns } from '../columns';

import { useAdminGetListSuspense } from '@/kubb-gen';

export default function AdminListAllPage() {
  const { data } = useAdminGetListSuspense({ mode: 'requests' });

  return <AdminListTable data={data.items} columns={columns} />;
}
