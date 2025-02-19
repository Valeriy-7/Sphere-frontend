"use client";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

export function AppTabs({
  list,
}: PropsWithChildren<{
  list: { label: string; href: string; disabled?: boolean }[];
}>) {
  const path = usePathname();
  // todo баг при redirect
  return (
    <Tabs defaultValue={path}>
      <TabsList>
        {list.map((i) => (
          <AppTabsLinkTrigger disabled={i.disabled} key={i.href} href={i.href}>
            {i.label}
          </AppTabsLinkTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function AppTabsLinkTrigger({
  href,
  children,
  disabled,
}: PropsWithChildren<{
  href: string;
  disabled?: boolean;
}>) {
  return (
    <TabsTrigger disabled={disabled} value={href} asChild>
      <Button asChild variant={"outline"}>
        {disabled ? (
          <div className={"cursor-not-allowed"}>{children}</div>
        ) : (
          <Link href={href}>{children}</Link>
        )}
      </Button>
    </TabsTrigger>
  );
}

export function AppTabsWrap({ children }: PropsWithChildren) {
  return <div className={"flex items-center justify-between"}>{children}</div>;
}
