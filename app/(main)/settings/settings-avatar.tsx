import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import ImageUpload from "@/components/image-upload-validator";

export function SettingsAvatar({
  src,
  cabinetActiveId,
}: {
  src: string;
  cabinetActiveId: string;
}) {
  return (
    <Card
      className={
        "w-[270px] h-[270px] mb-4 bg-gray-100 dark:bg-transparent relative"
      }
    >
      <Pencil size={20} className={"absolute right-0 top-0 mt-4 mr-2"}></Pencil>
      <ImageUpload cabinetActiveId={cabinetActiveId} src={src}></ImageUpload>
    </Card>
  );
}
