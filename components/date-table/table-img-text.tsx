import React, { PropsWithChildren, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
type TableImage = {
  src: string;
};
export function TableImgText({
  title,
  text,
  image,
}: PropsWithChildren & { image?: TableImage; title?: string; text?: string }) {
  return (
    <div className={"flex items-center gap-2 text-left"}>
      <img
        className={"rounded-sm object-cover h-[26px] w-[18px] border"}
        src={image?.src}
        alt={title}
      />
      <div className={"overflow-hidden"}>
        <div className={"truncate w-full"}>{title}</div>
        <div className={"truncate w-full"}>{text}</div>
      </div>
    </div>
  );
}

export function TableCardImgText({
  title,
  text,
  className,
  image,
  slotImage,
  children,
}: PropsWithChildren & {
  image?: TableImage;
  title?: string;
  text?: string;
  className?: string;
  slotImage?: ReactNode;
}) {
  return (
    <Card
      className={cn(
        "text-left p-1 inline-flex max-w-full flex-1 items-center justify-center gap-2",
        className,
      )}
    >
      <div className={"w-[60px] h-[30px] relative"}>
        {!slotImage && (
          <img
            className={"rounded-sm object-cover h-full w-full"}
            src={image?.src}
            alt={title}
          />
        )}
        {slotImage}
      </div>

      <div className={"overflow-hidden"}>
        <div className={"truncate w-full"}>{title}</div>
        <div className={"truncate w-full"}>{text}</div>
        {children}
      </div>
    </Card>
  );
}
