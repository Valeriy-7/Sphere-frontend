"use client";

import { AdminListTable } from "../admin-list-table";
import { columns } from "../columns";

import { useAdminGetListSuspense } from "@/kubb-gen";

export default function AdminListAllPage() {
  const { data } = useAdminGetListSuspense({ mode: "blocked", limit: "100" });
  return <AdminListTable data={data.items} columns={columns} />;
}
