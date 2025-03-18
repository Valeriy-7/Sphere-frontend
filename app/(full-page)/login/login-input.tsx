'use client';

import React from 'react';

import { LoginButtonChevron } from '@/app/(full-page)/login/login-button-chevron';

interface InputWithIconButtonProps {
  placeholder?: string;
  onButtonClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export function LoginInput({
  placeholder = '',
  onButtonClick,
  className = '',
  isLoading,
  ...props
}: InputWithIconButtonProps & React.ComponentProps<'input'>) {
  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        className="flex h-[70px] w-full rounded-md bg-login px-3 py-1 pr-16 text-base text-primary-foreground placeholder:text-primary-foreground autofill:shadow-[inset_0_0_0px_1000px_theme(colors.login)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        type="text"
        placeholder={placeholder}
      />
      <LoginButtonChevron
        disabled={isLoading}
        onClick={onButtonClick}
        className={'absolute right-0 top-0'}
      />
    </div>
  );
}
