import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import {PropsWithChildren} from "react";

export function SettingsAvatar({ children }: PropsWithChildren) {
  return (
    <Card className={'relative mb-4 h-[270px] w-[270px] bg-gray-100 dark:bg-transparent'}>
      <Pencil size={20} className={'absolute right-0 top-0 mr-2 mt-4'}></Pencil>
        {children}
    </Card>
  );
}
