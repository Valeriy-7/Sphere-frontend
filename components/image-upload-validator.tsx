"use client";
import { ImageUp } from "lucide-react";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAvatarUploadAvatar } from "@/kubb-gen";
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

type ImageProps = {
  src: string | null;
  cabinetActiveId: string;
  onFile:(file:File)=>void
};

export default function ImageUpload({
  src = null,
  cabinetActiveId,
    onFile
}: ImageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(src);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const supabase = createClientComponentClient()

  const { mutateAsync } = useAvatarUploadAvatar();

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return "Файл больше 5мб";
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Только png, jpeg, и webp файлы разрешены.";
    }
    return null;
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setSelectedImage(null);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setError(null);
      setSuccess(false);


      return onFile(file)

      try {
        setUploading(true);
        //const {} = useAvatarGetUploadUrl()
        //const { data, error } = await supabase.storage.from("images").upload(`public/${Date.now()}_${file.name}`, file)
        console.log(cabinetActiveId);
        await mutateAsync({ cabinetId: cabinetActiveId, data: { file } });
        //if (error) throw error;

        setSuccess(true);
      } catch (error) {
        setError("Ошибка загрузки файла");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute left-0 right-0 bottom-0 top-0">
      <div
        onClick={handleDivClick}
        className={cn([
          "h-full flex items-center justify-center cursor-pointer",
          {
            "border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors":
              !selectedImage,
            "border-red-500": error,
            "border-green-500": success,
            "border-primary-500": uploading,
          },
        ])}
      >
        <input
          type="file"
          accept={ALLOWED_FILE_TYPES.join(" ")}
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
          aria-label="Загрузка картинки"
        />
        {selectedImage ? (
          <div className="relative w-full h-full">
            <img
              src={selectedImage}
              alt="Превью картинки"
              className="rounded-sm absolute left-0 right-o bottom-0 top-0 h-full w-full object-cover"
            />
            {/*  <Image
                            src={selectedImage}
                            alt="Uploaded image preview"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />*/}
          </div>
        ) : (
          <ImageUp
            className={"opacity-5 max-w-full max-h-full"}
            strokeWidth={1}
            size={50}
          ></ImageUp>
        )}
      </div>
    </div>
  );
}
