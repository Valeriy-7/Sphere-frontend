"use client";

import ImageUpload from "./ImageUpload";

export default function Home() {
  const handleUploadComplete = (urls: string[]) => {
    console.log("Uploaded file URLs:", urls);
    // You can do something with the uploaded file URLs here
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload with DnD Kit</h1>
      <ImageUpload
        maxSize={2 * 1024 * 1024}
        allowedTypes={["image/jpeg", "image/png"]}
        onUploadComplete={handleUploadComplete}
      />
    </main>
  );
}
