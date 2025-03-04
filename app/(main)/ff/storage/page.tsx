import { DataTableTotal } from '@/components/date-table/data-table-total';
/*import { StorageTable } from '@/app/(main)/ff/storage/storage-table';
import { StorageTableNew } from '@/app/(main)/ff/storage/storage-table-new';*/

export default function StoragePage() {
  return (
    <>
      <div className={'grid-cols-0 grid gap-2 sm:grid-cols-6 xl:grid-cols-12'}>
        <div className={'col-span-4'}>
          <DataTableTotal
            caption={'Сейчас на складе (ед)'}
            data={[
              { title: 'Продукты', value: 1000 },
              { title: 'Товары', value: 2000 },
              { title: 'Брак', value: 200 },
              { title: 'Возвраты с ПВЗ', value: 300 },
            ]}
          />
        </div>
        <div className={'col-span-2'}>
          <DataTableTotal
            caption={'Расходники (ед)'}
            data={[
              { title: 'ФФ', value: 300 },
              { title: 'Магазинов', value: 400 },
            ]}
          />
        </div>
        <div className={'col-span-3'}>
          <DataTableTotal
            caption={'Принято (ед)'}
            data={[
              { title: 'Товары', value: 20000 },
              { title: 'Брак', value: 2000 },
              { title: 'Расходники', value: 10000 },
            ]}
          />
        </div>
        <div className={'col-span-3'}>
          <DataTableTotal
            caption={'Отправлено (ед)'}
            data={[
              { title: 'На WB', value: 10000 },
              { title: 'Другие МП', value: 1000 },
              { title: 'Брак', value: 1000 },
            ]}
          />
        </div>
      </div>
      <div>
        {/*   <StorageTableNew />*/}
        {/*  <StorageTable />*/}
      </div>
    </>
  );
}
