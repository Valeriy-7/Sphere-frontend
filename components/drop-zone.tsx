"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { X, Upload } from "lucide-react";

interface ImageUploadProps {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        setError(
          `File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`,
        );
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setError(
          `File ${file.name} is not an allowed type. Allowed types are ${allowedTypes.join(", ")}.`,
        );
        return false;
      }
      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);
    if (validFiles.length > 0) {
      setError(null);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <div className="max-w-md mx-auto mt-8">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept={allowedTypes.join(",")}
            className="hidden"
            multiple
          />
          <Upload className="mx-auto mb-4" size={48} />
          {isDragging ? (
            <p className="text-blue-500">Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <DragOverlay>
        {isDragging && (
          <div className="bg-blue-100 border-2 border-blue-500 p-4 rounded">
            <Upload className="text-blue-500" size={24} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default ImageUpload;
