import { Button } from "@/components/ui/button";
import DeliverySelectForm from "@/app/(main)/wb/delivery/ff/create/delivery-select-form";
import { AppTabs, AppTabsWrap } from "@/components/app-tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DeliveryFFCreatePage() {
  return (
    <>
      <AppTabsWrap>
        <div>
          <Button asChild variant={"outline"}>
            <div>
              <ArrowLeft />
              <Link href={"./"}> Поставки на WB</Link>
            </div>
          </Button>
        </div>
        <AppTabs
          list={[
            { label: "Карточки", href: "/wb/delivery/ff/create" },
            { label: "Поставщик", href: "/wb/delivery/wb", disabled: true },
          ]}
        />
      </AppTabsWrap>
      <DeliverySelectForm />
      {/*<DeliveryCreateRow />
      <DeliveryCreateRow />*/}
    </>
  );
}
