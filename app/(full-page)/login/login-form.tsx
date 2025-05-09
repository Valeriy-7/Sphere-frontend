'use client';

import { cn } from '@/lib/utils';
import { LoginOtp } from './login-otp';
import { LoginPhone } from '@/app/(full-page)/login/login-phone';
import { useEffect, useState } from 'react';

import { ChevronLeft } from 'lucide-react';
import { LoginButtonChevron } from '@/app/(full-page)/login/login-button-chevron';
import { LoginBusinessForm } from '@/app/(full-page)/login/login-business-form';
import { useJWTAuthContext } from '@/modules/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  mode?: string | null;
  pageTitle?: string;
}

export function LoginForm({ className, mode, pageTitle, ...props }: LoginFormProps) {
  const [phone, setPhone] = useState<string>('');
  const [isShowOtp, setIsShowOtp] = useState<boolean>(false);
  const { user, controller, isLoggedIn } = useJWTAuthContext();
  const router = useRouter();
  //const [isShowCompany, setIsShowCompany] = useState<boolean>(false);

  // Определяем тип формы, которую нужно показать
  let isShowCompany = user?.regStatus === 'incomplete';

  // Если это создание нового кабинета для авторизованного пользователя
  if (mode === 'new-cabinet' && isLoggedIn) {
    isShowCompany = true;
  }

  function logoutFF() {
    controller.onLogoutRequestComplete();
    toast('Данные отправлены', {
      closeButton: true,
      description: 'Ожидайте верификации кабинета',
    });
    setIsShowOtp(false);
  }

  function onBusinessFormSuccess() {
    // После успешного создания кабинета возвращаем пользователя на главную
    if (mode === 'new-cabinet') {
      router.push('/');
    } else {
      logoutFF();
    }
  }

  useEffect(() => {
    if (
      user?.regStatus === 'complete' &&
      user?.cabinets?.find((i) => i.isActive)?.type === 'fulfillment' &&
      mode !== 'new-cabinet'
    ) {
      logoutFF();
    }
  }, [user, mode]);

  const classNameTitle = 'text-[28px] font-semibold flex items-center uppercase justify-center';
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 px-6 text-center text-primary-foreground',
        className,
      )}
      {...props}
    >
      {isShowCompany ? (
        <LoginBusinessForm
          classNameTitle={classNameTitle}
          onLogoutFF={onBusinessFormSuccess}
          formTitle={pageTitle || 'Вид деятельности'}
          isNewCabinet={mode === 'new-cabinet'}
        />
      ) : (
        <>
          <div className={classNameTitle}>
            {isShowOtp && (
              <LoginButtonChevron
                onClick={() => {
                  setIsShowOtp(false);
                }}
                type="button"
                className="mr-4 rotate-180"
              >
                <ChevronLeft strokeWidth={1} size={40} />
              </LoginButtonChevron>
            )}
            {pageTitle || `Войти\u00A0в\u00A0систему`}
          </div>

          {isShowOtp ? (
            <LoginOtp phone={phone} />
          ) : (
            <LoginPhone
              onSubmit={(data) => {
                setPhone(data.phone);
                setIsShowOtp(true);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
