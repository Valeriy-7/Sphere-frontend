"use client";

import { cn } from "@/lib/utils";
import { LoginOtp } from "./login-otp";
import { LoginPhone } from "@/app/(full-page)/login/login-phone";
import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { LoginButtonChevron } from "@/app/(full-page)/login/login-button-chevron";
import { LoginBusinessForm } from "@/app/(full-page)/login/login-business-form";
import { useJWTAuthContext } from "@/modules/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [phone, setPhone] = useState<string>("");
  const [isShowOtp, setIsShowOtp] = useState<boolean>(false);
  const { user } = useJWTAuthContext();
  //const [isShowCompany, setIsShowCompany] = useState<boolean>(false);

  const isShowCompany =
    user?.regStatus === "incomplete" || user?.regStatus === "complete";


  const classNameTitle =
    "text-[28px] font-semibold flex items-center uppercase";
  return (
    <div
      className={cn(
        "flex flex-col gap-5 items-center text-center text-primary-foreground px-6",
        className,
      )}
      {...props}
    >
      {isShowCompany ? (
        <LoginBusinessForm classNameTitle={classNameTitle} />
      ) : (
        <>
          <div className={classNameTitle}>
            {isShowOtp && (
              <LoginButtonChevron
                onClick={() => {
                  setIsShowOtp(false);
                }}
                type="button"
                className="rotate-180 mr-4"
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
