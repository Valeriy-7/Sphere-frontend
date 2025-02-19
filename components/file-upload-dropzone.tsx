'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

export default function FileUploadDropzone() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  //const supabase = createClientComponentClient()

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit.';
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Only PNG, JPG, and GIF files are allowed.';
    }
    return null;
  };

  const handleFileDrop = useCallback(
    async (file: File) => {
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

      try {
        setUploading(true);
        //const { data, error } = await supabase.storage.from('images').upload(`public/${Date.now()}_${file.name}`, file)

        if (error) throw error;

        setSuccess(true);
      } catch (error) {
        setError('Error uploading file');
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    },
    [
      validateFile,
      //supabase.storage,
    ],
  ); // Added validateFile to dependencies

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === 'droppable-area') {
      const file = event.active.data.current?.files[0];
      if (file) {
        handleFileDrop(file);
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileDrop(file);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mx-auto mt-8 w-full max-w-md">
        <DropArea selectedImage={selectedImage} handleFileSelect={handleFileSelect} />
        {uploading && <p className="mt-2 text-sm text-blue-500">Uploading...</p>}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-500">File uploaded successfully!</p>}
      </div>
    </DndContext>
  );
}

function DropArea({
  selectedImage,
  handleFileSelect,
}: {
  selectedImage: string | null;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { active, setNodeRef } = useDraggable({
    id: 'droppable-area',
  });

  return (
    <div
      ref={setNodeRef}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors ${
        active ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif"
        onChange={handleFileSelect}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        {selectedImage ? (
          <div className="relative w-full pt-[100%]">
            <Image
              src={selectedImage || '/placeholder.svg'}
              alt="Uploaded image preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              {active ? 'Drop the image here' : "Drag 'n' drop an image here, or click to select"}
            </p>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </label>
    </div>
  );
}

function DraggableImage({ src }: { src: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-image',
    data: {
      type: 'image',
      src,
    },
  });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image
        src={src || '/placeholder.svg'}
        alt="Draggable image"
        width={100}
        height={100}
        className="cursor-move rounded-lg"
      />
    </div>
  );
}
