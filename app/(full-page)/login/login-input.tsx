"use client";

import React from "react";

import { LoginButtonChevron } from "@/app/(full-page)/login/login-button-chevron";

interface InputWithIconButtonProps {
  placeholder?: string;
  onButtonClick?: () => void;
  className?: string;
  isloading?: boolean;
}

export function LoginInput({
  placeholder = "",
  onButtonClick,
  className = "",
  isloading,
  ...props
}: InputWithIconButtonProps & React.ComponentProps<"input">) {
  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        className="pr-16 bg-login autofill:shadow-[inset_0_0_0px_1000px_theme(colors.login)] text-primary-foreground flex h-[70px] w-full rounded-md px-3 py-1 text-base placeholder:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        type="text"
        placeholder={placeholder}
      />
      <LoginButtonChevron
        disabled={isloading}
        onClick={onButtonClick}
        className={"absolute right-0 top-0 "}
      />
    </div>
  );
}
