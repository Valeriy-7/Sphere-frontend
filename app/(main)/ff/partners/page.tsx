'use client';
import { PartnersTable } from './partners-table';
import { columns } from './columns';
import { type PartnerCabinetDtoType, useCabinetsGetPartnersSuspense } from '@/kubb-gen';

export default function FFPartnersPage() {
  const {
    data: { items, stats },
  } = useCabinetsGetPartnersSuspense();
  return (
    <PartnersTable<PartnerCabinetDtoType, unknown> data={items} columns={columns} stats={stats} />
  );
}
