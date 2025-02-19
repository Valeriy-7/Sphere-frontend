import { AppSpinner } from "@/components/app-spinner";
import * as React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={"flex justify-center h-full"}>
      <AppSpinner size={"large"} />
    </div>
  );
}
