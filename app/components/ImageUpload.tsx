"use client";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "../api/uploadthing/core";
import { useState } from "react";

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <UploadButton<OurFileRouter, "imageUploader"> 
        endpoint="imageUploader"
        onClientUploadComplete={(res: Array<{ url: string }>) => {
          setUploading(false);
          if (res && res[0]?.url) onUpload(res[0].url);
        }}
        onUploadBegin={() => setUploading(true)}
        onUploadError={() => setUploading(false)}
      />
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  );
}
