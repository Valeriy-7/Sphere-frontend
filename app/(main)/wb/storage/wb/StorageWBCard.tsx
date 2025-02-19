import { Card } from "@/components/ui/card";
import type { ProductListItemDtoType } from "@/kubb-gen";

export function StorageWBCard({
  article,
  name,
  color,
  category,
  imageUrl,
}: Pick<
  ProductListItemDtoType,
  "article" | "name" | "color" | "category" | "imageUrl"
>) {
  return (
    <>
      <Card className={"p-2 text-min text-left"}>
        <div className={"flex gap-2"}>
          <div>
            <img
              className={"rounded-md h-[88px] w-[80px] object-cover"}
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className={"space-y-1"}>
            <div className={"text-primary"}>{name}</div>
            <ul className={"space-y-1"}>
              <li>Арт: {article}</li>
              <li>Цвет: {color}</li>
              <li>Категория: {category}</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}
