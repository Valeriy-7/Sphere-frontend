import { Payment, columns } from './columns';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 1000,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 12500,
      status: 'processing',
      email: 'example@gmail.com',
    },
    {
      id: '489e1d421',
      amount: 12500.549,
      status: 'processing',
      email: 'example@gmail.com',
    },
    {
      id: '489e1d4211',
      amount: 125009.543,
      status: 'processing',
      email: 'example@gmail.com',
    },
    // ...
  ];
}

export default async function TablesEmptyPage() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}
