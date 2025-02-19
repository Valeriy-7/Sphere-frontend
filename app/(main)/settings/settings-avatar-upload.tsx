import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import FileUploadDropzone from "@/components/file-upload-dropzone";
export function SettingsAvatarUpload() {
  return (
    <>
      <Card
        className={
          "w-[245px] h-[245px] mb-4 bg-gray-100 dark:bg-transparent relative"
        }
      >
        <Pencil
          size={20}
          className={"absolute right-0 top-0 mt-4 mr-2"}
        ></Pencil>
      </Card>
      <FileUploadDropzone />
    </>
  );
}
