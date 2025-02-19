import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import ImageUpload from '@/components/image-upload-validator';

export function SettingsAvatar({ src, cabinetActiveId }: { src: string; cabinetActiveId: string }) {
  return (
    <Card className={'relative mb-4 h-[270px] w-[270px] bg-gray-100 dark:bg-transparent'}>
      <Pencil size={20} className={'absolute right-0 top-0 mr-2 mt-4'}></Pencil>
      <ImageUpload cabinetActiveId={cabinetActiveId} src={src}></ImageUpload>
    </Card>
  );
}
