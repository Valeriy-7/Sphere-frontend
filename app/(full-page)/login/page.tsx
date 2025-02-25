'use client';
import { LoginForm } from './login-form';
import Image from 'next/image';
import bgForm from '@/app/(full-page)/login/login-bg.svg';

import { useSearchParams } from 'next/navigation';
const LoginPage = () => {
  const searchParams = useSearchParams();
  const registrationUrl = searchParams.get('registrationUrl');
  if (registrationUrl) {
    localStorage.setItem('registrationUrl', registrationUrl);
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
LoginPage.theme = 'light';
