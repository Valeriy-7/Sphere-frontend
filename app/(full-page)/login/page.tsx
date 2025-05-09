'use client';
import { LoginForm } from './login-form';
import Image from 'next/image';
import bgForm from '@/app/(full-page)/login/login-bg.svg';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useJWTAuthContext } from '@/modules/auth';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoggedIn } = useJWTAuthContext();
  const registrationUrl = searchParams?.get('registrationUrl');
  const mode = searchParams?.get('mode');
  const [title, setTitle] = useState('Войти в систему');
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (registrationUrl) {
      localStorage.setItem('registrationUrl', registrationUrl);
    }

    // Устанавливаем флаг, что страница загружена, чтобы предотвратить мигание
    setPageLoaded(true);

    // Если пользователь авторизован и хочет создать новый кабинет
    if (mode === 'new-cabinet' && isLoggedIn) {
      setTitle('Создать кабинет');
      return; // Не выполняем редирект, если это режим создания кабинета
    }

    // Если пользователь авторизован, редиректим на главную
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, mode, registrationUrl, router]);

  // Не отображаем страницу, пока не проверим режим работы
  if (!pageLoaded) {
    return null;
  }

  // Если пользователь авторизован и не в режиме создания кабинета - не рендерим страницу вообще
  if (isLoggedIn && mode !== 'new-cabinet') {
    return null;
  }

  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
      style={{
        background: 'linear-gradient(252.44deg, #D771FF 0%, #8E56FF 100%)',
      }}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Image
          className={
            'absolute left-1/2 top-1/2 -ml-[45px] mt-[50px] hidden -translate-x-1/2 -translate-y-1/2 transform sm:block'
          }
          priority
          src={bgForm}
          alt=""
        />
        <div className={'relative z-10 mt-[40px] min-h-[274px]'}>
          <LoginForm mode={mode} pageTitle={title} />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
LoginPage.theme = 'light';
