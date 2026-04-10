"use client";

import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUploadJobImagesMutation } from "@/redux/features/provider/providerApi";
import type { JobImage } from "@/types/provider.type";
import { toast } from "sonner";

interface LocalImage {
  file: File;
  preview: string;
}

interface JobImageUploadProps {
  bookingId: number;
  isUploadable: boolean;
  existingBeforeImages?: JobImage[];
  existingAfterImages?: JobImage[];
}

export default function JobImageUpload({
  bookingId,
  isUploadable,
  existingBeforeImages = [],
  existingAfterImages = [],
}: JobImageUploadProps) {
  const [beforeImage, setBeforeImage] = useState<LocalImage | null>(null);
  const [afterImage, setAfterImage] = useState<LocalImage | null>(null);
  const [uploadJobImages, { isLoading: isUploading }] =
    useUploadJobImagesMutation();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
  ) => {
    if (!isUploadable) return;
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        alert("Only .jpg, .png and .svg files are allowed");
        return;
      }

      const preview = URL.createObjectURL(file);
      const uploadedImage = { file, preview };

      if (type === "before") {
        setBeforeImage(uploadedImage);
      } else {
        setAfterImage(uploadedImage);
      }
    }
  };

  const handleRemoveImage = (type: "before" | "after") => {
    if (type === "before") {
      if (beforeImage?.preview) {
        URL.revokeObjectURL(beforeImage.preview);
      }
      setBeforeImage(null);
    } else {
      if (afterImage?.preview) {
        URL.revokeObjectURL(afterImage.preview);
      }
      setAfterImage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: "before" | "after",
  ) => {
    e.preventDefault();
    if (!isUploadable) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const mockEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(mockEvent, type);
    }
  };

  const handleUpload = async () => {
    if (!beforeImage && !afterImage) {
      alert("Please select at least one image to upload.");
      return;
    }

    const formData = new FormData();

    if (beforeImage) {
      formData.append("image_type", "before");
      formData.append("image", beforeImage.file);
    }

    if (afterImage) {
      formData.append("image_type", "after");
      formData.append("image", afterImage.file);
    }

    try {
      const res = await uploadJobImages({ bookingId, formData }).unwrap();
      if (res.success) {
        toast.success("Images uploaded successfully!");
        if (beforeImage?.preview) URL.revokeObjectURL(beforeImage.preview);
        if (afterImage?.preview) URL.revokeObjectURL(afterImage.preview);
        setBeforeImage(null);
        setAfterImage(null);
      }
    } catch {
      toast.error("Failed to upload images.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Image Upload Section:
        </h3>
        <span className="text-xs text-gray-400">
          Only support .jpg, .png and .svg files.
        </span>
      </div>

      {/* Existing images from API */}
      {(existingBeforeImages.length > 0 || existingAfterImages.length > 0) && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {existingBeforeImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Before Images (uploaded)
                </label>
                <div className="flex flex-wrap gap-2">
                  {existingBeforeImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative border rounded-lg overflow-hidden"
                    >
                      <Image
                        src={`${baseUrl}${img.image}`}
                        alt="Before"
                        width={120}
                        height={90}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {existingAfterImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  After Images (uploaded)
                </label>
                <div className="flex flex-wrap gap-2">
                  {existingAfterImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative border rounded-lg overflow-hidden"
                    >
                      <Image
                        src={`${baseUrl}${img.image}`}
                        alt="After"
                        width={120}
                        height={90}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload areas */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
          !isUploadable ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Before Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Before Image
          </label>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "before")}
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
          >
            {beforeImage ? (
              <div className="relative">
                <Image
                  src={beforeImage.preview}
                  alt="Before"
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg object-cover"
                />
                <button
                  onClick={() => handleRemoveImage("before")}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FiX className="w-4 h-4" />
                </button>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600">
                  <span>{beforeImage.file.name}</span>
                </div>
              </div>
            ) : (
              <>
                <FiUploadCloud className="w-12 h-12 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Drag your file(s) or{" "}
                  <label className="text-blue-500 cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) => handleFileChange(e, "before")}
                      className="hidden"
                      disabled={!isUploadable}
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-400">
                  Max 10 MB files are allowed
                </p>
              </>
            )}
          </div>
        </div>

        {/* After Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            After Image
          </label>

          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "after")}
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
          >
            {afterImage ? (
              <div className="relative">
                <Image
                  src={afterImage.preview}
                  alt="After"
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg object-cover"
                />
                <button
                  onClick={() => handleRemoveImage("after")}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FiX className="w-4 h-4" />
                </button>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600">
                  <span>{afterImage.file.name}</span>
                </div>
              </div>
            ) : (
              <>
                <FiUploadCloud className="w-12 h-12 mx-auto text-blue-500 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Drag your file(s) or{" "}
                  <label className="text-blue-500 cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) => handleFileChange(e, "after")}
                      className="hidden"
                      disabled={!isUploadable}
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-400">
                  Max 10 MB files are allowed
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upload Button */}
      {isUploadable && (beforeImage || afterImage) && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Images"
            )}
          </Button>
        </div>
      )}

      {!isUploadable && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Image upload is available once the job is in progress.
        </p>
      )}
    </div>
  );
}
