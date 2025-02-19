import { LoginForm } from "./login-form";
import Image from "next/image";
import bgForm from "@/app/(full-page)/login/login-bg.svg";

const LoginPage = () => {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
      style={{
        background: "linear-gradient(252.44deg, #D771FF 0%, #8E56FF 100%)",
      }}
    >
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Image
          className={
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -ml-[45px] mt-[50px] hidden sm:block"
          }
          priority
          src={bgForm}
          alt=""
        />
        <div className={"z-10 relative min-h-[274px] mt-[40px]"}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
LoginPage.theme = "light";
