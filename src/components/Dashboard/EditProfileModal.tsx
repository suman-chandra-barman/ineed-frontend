"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    fullName: string;
    email: string;
    contactNumber: string;
    address: string;
    avatar?: string;
  };
  onSave: (data: {
    fullName: string;
    contactNumber: string;
    address: string;
    avatar?: string;
  }) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    contactNumber: userData.contactNumber,
    address: userData.address,
    avatar: userData.avatar,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      fullName: userData.fullName,
      contactNumber: userData.contactNumber,
      address: userData.address,
      avatar: userData.avatar,
    });
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Edit Account Info
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Make changes to your profile here. Click save when you&apos;re done.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3">
              {formData.avatar ? (
                <Image
                  src={formData.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-2xl">
                    {formData.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Upload className="w-6 h-6 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullName" className="text-gray-700 mb-2 block">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Your First Name"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <Label htmlFor="contactNumber" className="text-gray-700 mb-2 block">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              placeholder="+1 345 824 9384"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <Label htmlFor="address" className="text-gray-700 mb-2 block">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="24 New Street, Los Angeles"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
