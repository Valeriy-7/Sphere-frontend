'use client';

import { AdminListTable } from '../admin-list-table';
import { columns } from '../columns';

import { useAdminGetListSuspense } from '@/kubb-gen';

export default function AdminListRequestsPage() {
  return <AdminListTable mode={'requests'} columns={columns} />;
}
