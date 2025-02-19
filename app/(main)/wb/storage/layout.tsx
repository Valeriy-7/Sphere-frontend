"use client";
import React, { PropsWithChildren } from "react";
import { AppTabs, AppTabsWrap } from "@/components/app-tabs";

export default function WBStorageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppTabsWrap>
        <AppTabs
          list={[
            { label: "Склад ФФ", href: "/wb/storage/ff" },
            { label: "Склад WB", href: "/wb/storage/wb" },
          ]}
        />
      </AppTabsWrap>
      {children}
    </>
  );
}
