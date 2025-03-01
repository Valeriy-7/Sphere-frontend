'use client';

import { AdminListTable } from '../admin-list-table';
import { columns } from '../columns';

export default function AdminListBlockedPage() {
  return <AdminListTable mode={'blocked'} columns={columns} />;
}
