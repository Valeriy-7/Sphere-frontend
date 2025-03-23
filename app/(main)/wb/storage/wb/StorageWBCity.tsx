import { Card } from '@/components/ui/card';
import type { ProductCityDtoType } from '@/kubb-gen';

export function StorageWBCity({ name, quantity }: ProductCityDtoType) {
  return (
    <>
      <Card className={'w-[140px] p-1 text-center text-sm'}>
        <div>{name}</div>
        <div>{quantity}</div>
      </Card>
    </>
  );
}
