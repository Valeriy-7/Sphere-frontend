import { Card } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import FileUploadDropzone from '@/components/file-upload-dropzone';
export function SettingsAvatarUpload() {
  return (
    <>
      <Card className={'relative mb-4 h-[245px] w-[245px] bg-gray-100 dark:bg-transparent'}>
        <Pencil size={20} className={'absolute right-0 top-0 mr-2 mt-4'}></Pencil>
      </Card>
      <FileUploadDropzone />
    </>
  );
}
