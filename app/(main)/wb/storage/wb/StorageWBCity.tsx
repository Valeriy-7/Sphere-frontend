import { Card } from "@/components/ui/card";
import type { ProductCityDtoType } from "@/kubb-gen";

export function StorageWBCity({ name, quantity }: ProductCityDtoType) {
  return (
    <>
      <Card className={"p-1 w-[115px] text-center text-sm"}>
        <div>{name}</div>
        <div>{quantity}</div>
      </Card>
    </>
  );
}
