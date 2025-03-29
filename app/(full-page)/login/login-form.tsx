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

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [phone, setPhone] = useState<string>('');
  const [isShowOtp, setIsShowOtp] = useState<boolean>(false);
  const { user, controller } = useJWTAuthContext();
  //const [isShowCompany, setIsShowCompany] = useState<boolean>(false);

  const isShowCompany = user?.regStatus === 'incomplete';

  function logoutFF() {
    controller.onLogoutRequestComplete();
    toast('Данные отправлены', {
      closeButton: true,
      description: 'Ожидайте верификации кабинета',
    });
    setIsShowOtp(false);
  }

  useEffect(() => {
    if (
      user?.regStatus === 'complete' &&
      user?.cabinets?.find((i) => i.isActive)?.type === 'fulfillment'
    ) {
      logoutFF();
    }
  }, [user]);

  const classNameTitle = 'text-[28px] font-semibold flex items-center uppercase';
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 px-6 text-center text-primary-foreground',
        className,
      )}
      {...props}
    >
      {isShowCompany ? (
        <LoginBusinessForm classNameTitle={classNameTitle} onLogoutFF={logoutFF} />
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
            {`Войти\u00A0в\u00A0систему`}
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
