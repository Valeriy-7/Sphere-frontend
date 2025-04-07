import { Card } from '@/components/ui/card';
import type { ProductListItemDtoType } from '@/kubb-gen';

export function StorageWBCard({
  article,
  name,
  color,
  category,
  imageUrl,
}: Pick<ProductListItemDtoType, 'article' | 'name' | 'color' | 'category' | 'imageUrl'>) {
  return (
    <>
      <Card className={'p-2 text-left text-min'}>
        <div className={'flex gap-2'}>
          <img className={'h-[88px] w-[80px] rounded-md object-cover'} src={imageUrl} alt={name} />
          <div className={'min-w-0 space-y-1'}>
            <div className={'line-clamp-2 text-primary'}>{name}</div>
            <ul className={'space-y-1'}>
              <li>Арт: {article}</li>
              <li>Цвет: {color}</li>
              <li>Категория: {category}</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
