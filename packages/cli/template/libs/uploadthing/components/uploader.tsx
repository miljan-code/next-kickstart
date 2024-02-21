"use client";

import { useUploadThing } from "@/lib/uploadthing";

export const Uploader = () => {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (!res) return;
      const imageUrl = res[0]?.url || "";
      console.log(imageUrl);
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await startUpload([file]);
  };

  return (
    <input
      type="file"
      disabled={isUploading}
      onChange={(e) => void handleImageUpload(e)}
    />
  );
};
