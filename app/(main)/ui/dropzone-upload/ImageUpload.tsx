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
import { X, Upload, CheckCircle, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  onUploadComplete?: (urls: string[]) => void;
}

interface UploadStatus {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ["image/jpeg", "image/png", "image/gif"],
  onUploadComplete,
}) => {
  const [images, setImages] = useState<UploadStatus[]>([]);
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

    const newUploadStatuses = validFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setImages((prev) => [...prev, ...newUploadStatuses]);
    if (validFiles.length > 0) {
      setError(null);
      validFiles.forEach(uploadFile);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      updateImageStatus(file, 100, "success", data.url);
      if (onUploadComplete) {
        onUploadComplete([data.url]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      updateImageStatus(file, 0, "error");
    }
  };

  const updateImageStatus = (
    file: File,
    progress: number,
    status: UploadStatus["status"],
    url?: string,
  ) => {
    setImages((prev) =>
      prev.map((img) =>
        img.file === file ? { ...img, progress, status, url } : img,
      ),
    );
  };

  const removeImage = (file: File) => {
    setImages((prev) => prev.filter((img) => img.file !== file));
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

        <div className="mt-4 space-y-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex items-center bg-gray-100 p-2 rounded"
            >
              <img
                src={
                  image.url ||
                  URL.createObjectURL(image.file) ||
                  "/placeholder.svg"
                }
                alt={`Uploaded ${index + 1}`}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <p className="text-sm font-medium">{image.file.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                  <div
                    className={`h-2.5 rounded-full ${
                      image.status === "success"
                        ? "bg-green-600"
                        : image.status === "error"
                          ? "bg-red-600"
                          : "bg-blue-600"
                    }`}
                    style={{ width: `${image.progress}%` }}
                  ></div>
                </div>
              </div>
              {image.status === "success" && (
                <CheckCircle className="text-green-500 ml-2" size={20} />
              )}
              {image.status === "error" && (
                <AlertCircle className="text-red-500 ml-2" size={20} />
              )}
              <button
                onClick={() => removeImage(image.file)}
                className="ml-2 bg-red-500 text-white rounded-full p-1"
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
