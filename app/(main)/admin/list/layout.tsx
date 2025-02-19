"use client";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AppTabs, AppTabsWrap } from "@/components/app-tabs";

export default function AdminListLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppTabsWrap>
        <div></div>
        <AppTabs
          list={[
            { label: "Все", href: "/admin/list/all" },
            { label: "Заявки", href: "/admin/list/requests" },
            { label: "Блок", href: "/admin/list/blocked" },
          ]}
        />
      </AppTabsWrap>
      {children}
    </>
  );
}
