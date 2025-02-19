import { MarketImg } from './market-img';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { DPSelect } from '@/app/(main)/wb/delivery/ff/create/DPList';

export type DPProps = PropsWithChildren & {
  className?: string;
};

export function DeliveryCreateRow() {
  return (
    <div
      className={
        'flex flex-wrap gap-4 rounded-lg border bg-white p-2 text-center text-min dark:bg-transparent'
      }
    >
      <MarketImg />
      <DPItem>
        <DPTitle>Данные</DPTitle>
        <DPBody className={'h-full'}>
          <ul className={'space-y-0.5 text-left'}>
            <li className={'text-primary'}>Платье чёрное</li>
            <li>Арт: 187677</li>
            <li>Цвет: Розовый</li>
            <li>Категория: Платья</li>
            <li>Размеры:</li>
            <li>S / M / L / XL</li>
          </ul>
        </DPBody>
      </DPItem>
      <DPItem>
        <DPTitle>Заказать (ед)</DPTitle>
        <Input size={'xs'} />
        <DPTitle>Цена (₽)</DPTitle>
        <Input size={'xs'} />
      </DPItem>
      <DPItem>
        <DPTitle>План (ед)</DPTitle>
        <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
        <DPTitle>План (ед)</DPTitle>
        <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
        <DPTitle>Брак (ед)</DPTitle>
        <DPBody className={'text-xs font-medium text-primary'}>1 200</DPBody>
      </DPItem>
      <DPItem>
        <DPTitle>Размер / Объём</DPTitle>
        <DPBody>М / 44</DPBody>
        <DPBody>М / 44</DPBody>
        <DPBody>XL / 42</DPBody>
        <DPBody>XL / 42</DPBody>
        <DPBody>XL / 42</DPBody>
      </DPItem>
      <DPItem>
        <DPTitle className={'bg-green-500'}>Факт</DPTitle>
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
      </DPItem>
      <DPItem>
        <DPTitle className={'bg-red-500'}>Брак</DPTitle>
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
        <Input className={'text-center'} size={'xs'} />
      </DPItem>
      <DPSelect
        title={'Услуги'}
        items={[
          { label: 'Стирка', price: 10, id: '1' },
          { label: 'Глаженье', price: 10, id: '2' },
          { label: 'Глаженье', price: 10, id: '3' },
          { label: 'Глаженье', price: 10, id: '4' },
          { label: 'Глаженье', price: 10, id: '5' },
          { label: 'Глаженье', price: 10, id: '6' },
        ]}
      ></DPSelect>
      <DPSelect
        isSelect
        selectIds={['1', '2']}
        title={'Услуги'}
        items={[
          { label: 'Стирка', price: 10, id: '1' },
          { label: 'Глаженье', price: 10, id: '2' },
          { label: 'Глаженье', price: 10, id: '3' },
          { label: 'Глаженье', price: 10, id: '4' },
          { label: 'Глаженье', price: 10, id: '5' },
          { label: 'Глаженье', price: 10, id: '6' },
        ]}
      ></DPSelect>
      <DPSelect
        isSupplier
        isSelect
        selectIds={['1', '2']}
        title={'Поставщик'}
        items={[
          { label: 'Стирка', id: '1' },
          { label: 'Глаженье', id: '2' },
          { label: 'Глаженье', id: '3' },
          { label: 'Глаженье', id: '4' },
          { label: 'Глаженье', id: '5' },
          { label: 'Глаженье', id: '6' },
        ]}
      ></DPSelect>
    </div>
  );
}

export function DPTitle({ children, className }: DPProps) {
  return (
    <div className={cn('rounded-sm bg-primary px-2 py-1 text-primary-foreground', className)}>
      {children}
    </div>
  );
}

export function DPItem({ children, className }: DPProps) {
  return <div className={cn('flex w-[100px] flex-col space-y-1', className)}>{children}</div>;
}

export function DPBody({ children, className }: DPProps) {
  return (
    <div
      className={cn('h-5 rounded-sm border bg-gray-100 px-2 py-1 dark:bg-transparent', className)}
    >
      {children}
    </div>
  );
}
