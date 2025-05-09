'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useJWTAuthContext } from '@/modules/auth';

export function CreateCabinetModal() {
  const router = useRouter();
  const { isLoggedIn } = useJWTAuthContext();

  const handleRedirect = () => {
    // Проверяем, авторизован ли пользователь
    if (isLoggedIn) {
      router.push('/login?mode=new-cabinet');
    } else {
      // Если пользователь не авторизован, отправляем его на обычную страницу логина
      router.push('/login');
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 p-2 transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      onClick={handleRedirect}
    >
      <div className="flex size-6 items-center justify-center">
        <Plus className="size-4" />
      </div>
      <div className="font-medium text-muted-foreground">Создать кабинет</div>
    </Button>
  );
}
