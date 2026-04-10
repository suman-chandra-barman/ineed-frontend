"use client";

import { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { useUpdateProviderPersonalInformationMutation } from "@/redux/features/provider/providerApi";
import { ProviderPersonalInformation } from "@/types/provider.type";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/features/auth/authSlice";

interface EditProviderPersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: ProviderPersonalInformation;
}

export default function EditProviderPersonalInfoModal({
  isOpen,
  onClose,
  userData,
}: EditProviderPersonalInfoModalProps) {
  const [updatePersonalInfo, { isLoading }] =
    useUpdateProviderPersonalInformationMutation();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    full_name: userData.full_name || "",
    contact_number: userData.contact_number || "",
    street_address: userData.street_address || "",
    city: userData.city || "",
    state: userData.state || "",
    zip_code: userData.zip_code || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    userData.image
      ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${userData.image}`
      : "",
  );

  // Reset form when modal opens or userData changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: userData.full_name || "",
        contact_number: userData.contact_number || "",
        street_address: userData.street_address || "",
        city: userData.city || "",
        state: userData.state || "",
        zip_code: userData.zip_code || "",
      });
      setImageFile(null);
      setImagePreview(
        userData.image
          ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${userData.image}`
          : "",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData: {
        full_name?: string;
        contact_number?: string;
        street_address?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        image?: File;
      } = {
        full_name: formData.full_name,
        contact_number: formData.contact_number,
        street_address: formData.street_address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
      };

      if (imageFile) {
        updateData.image = imageFile;
      }

      const result = await updatePersonalInfo(updateData).unwrap();

      if (result.success) {
        // Update Redux state and localStorage with new user info
        dispatch(
          updateUser({
            full_name: result.data.full_name,
            profile_image: result.data.image,
          }),
        );
        toast.success(
          result.message || "Personal information updated successfully",
        );
        onClose();
      }
    } catch (error: unknown) {
      console.error("Failed to update personal information:", error);
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to update personal information",
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: userData.full_name || "",
      contact_number: userData.contact_number || "",
      street_address: userData.street_address || "",
      city: userData.city || "",
      state: userData.state || "",
      zip_code: userData.zip_code || "",
    });
    setImageFile(null);
    setImagePreview(
      userData.image
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${userData.image}`
        : "",
    );
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
          Edit Personal Information
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update your personal details below
        </p>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Upload className="w-8 h-8" />
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="text-primary text-sm font-medium cursor-pointer hover:text-primary/90"
            >
              Change Photo
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                placeholder="Enter full name"
                className="w-full"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <Label
                htmlFor="contactNumber"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contact_number}
                onChange={(e) =>
                  setFormData({ ...formData, contact_number: e.target.value })
                }
                placeholder="Enter contact number"
                className="w-full"
                required
              />
            </div>

            {/* Street Address */}
            <div>
              <Label
                htmlFor="streetAddress"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Street Address
              </Label>
              <Input
                id="streetAddress"
                value={formData.street_address}
                onChange={(e) =>
                  setFormData({ ...formData, street_address: e.target.value })
                }
                placeholder="Enter street address"
                className="w-full"
              />
            </div>

            {/* City */}
            <div>
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                City
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
                className="w-full"
              />
            </div>

            {/* State */}
            <div>
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                State
              </Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="Enter state"
                className="w-full"
              />
            </div>

            {/* Zip Code */}
            <div>
              <Label
                htmlFor="zipCode"
                className="text-sm font-medium text-gray-700 mb-1.5 block"
              >
                Zip Code
              </Label>
              <Input
                id="zipCode"
                value={formData.zip_code}
                onChange={(e) =>
                  setFormData({ ...formData, zip_code: e.target.value })
                }
                placeholder="Enter ZIP code"
                className="w-full"
                maxLength={10}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
