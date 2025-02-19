import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";

import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "@/components/date-table/data-table";

import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "./app/(main)/ui/tasks/data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div style={{ height: "100px" }} className="shadow-md"></div>
      <DataTable hasToolbar hasPaginator data={tasks} columns={columns} />
    </>
  );
}
