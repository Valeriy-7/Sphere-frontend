'use client';
import { AdminListTable } from '../admin-list-table';
import { columns } from '../columns';

export default function AdminListAllPage() {
  return <AdminListTable mode={'all'} columns={columns} />;
}
