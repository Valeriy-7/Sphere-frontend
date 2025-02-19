import { Card } from "@/components/ui/card";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function TableCardImg({
  children,
  src,
  className,
}: PropsWithChildren | { src: string; className?: string }) {
  return (
    <Card
      className={cn(
        "p-1 inline-flex flex-1 items-center justify-center gap-2 w-full [&_img]:w-[60px] [&_img]:h-[30px] text-center",
        className,
      )}
    >
      <img className={"rounded-sm object-cover"} src={src} alt="" />
      <div className={"text-min font-medium break-all"}>{children}</div>
    </Card>
  );
}
