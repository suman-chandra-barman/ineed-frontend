"use client";

import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import Image from "next/image";

interface UploadedImage {
  file: File;
  preview: string;
}

export default function JobImageUpload() {
  const [beforeImage, setBeforeImage] = useState<UploadedImage | null>(null);
  const [afterImage, setAfterImage] = useState<UploadedImage | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      // Check file type
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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const mockEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(mockEvent, type);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Image
                    src="/user-avatar.jpg"
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
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
                  <Image
                    src="/user-avatar.jpg"
                    alt="User"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
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
    </div>
  );
}
