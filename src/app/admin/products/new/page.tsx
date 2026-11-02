"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Package,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  Check,
} from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Kitchen Utensils");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Optional Variations
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");

  // Fetch categories
  useEffect(() => {
    async function loadCats() {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
          if (data.data.length > 0) {
            setCategory(data.data[0].name);
          }
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoadingCats(false);
      }
    }
    loadCats();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Immediate local preview
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);

    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const resJson = await res.json();
      const finalUrl = resJson.imageUrl || resJson.url;

      if (resJson.success && finalUrl) {
        setImage(finalUrl);
        setPreviewImage(finalUrl);
        showToast("success", "✓ Product photo uploaded successfully!");
      } else {
        showToast("error", resJson.error || "Could not upload image. Please try again.");
      }
    } catch {
      showToast("error", "Error uploading image to server.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (publishState: boolean) => {
    if (!name.trim()) {
      showToast("error", "Please type the Product Name.");
      return;
    }

    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      showToast("error", "Please enter a valid Price in Naira (₦).");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        subtitle: subtitle.trim(),
        category,
        price: parseFloat(price),
        shortDescription: description.trim().slice(0, 160) || name.trim(),
        description: description.trim() || name.trim(),
        inStock,
        stockCount: inStock ? 20 : 0,
        isPublished: publishState,
        image: image || previewImage || "/images/products/container.jpg",
        sizes: sizes
          ? sizes.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        colors: colors
          ? colors.split(",").map((c) => ({ name: c.trim() })).filter((c) => c.name)
          : [],
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success && resData.data) {
        showToast(
          "success",
          publishState
            ? "✓ Product added and published to the website!"
            : "✓ Product saved as draft."
        );
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        showToast("error", resData.error || "Failed to add product.");
      }
    } catch {
      showToast("error", "Network error saving product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-in slide-in-from-bottom duration-200 ${
            toast.type === "success"
              ? "bg-white text-emerald-800 border-emerald-200 shadow-emerald-500/10"
              : "bg-white text-red-800 border-red-200 shadow-red-500/10"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Add a New Product
            </h1>
            <p className="text-xs text-[#64748B]">
              Fill in the simple form below to add an item to Harmony Hub.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
        {/* Photo Upload Section */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Product Photo
          </label>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-28 h-28 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  fill
                  unoptimized={previewImage?.startsWith("data:") || previewImage?.startsWith("blob:")}
                  sizes="120px"
                  className="object-contain p-2"
                />
              ) : (
                <Camera className="w-8 h-8 text-slate-300" />
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <p className="text-xs font-semibold text-slate-800">
                {previewImage ? "Photo selected!" : "No photo chosen yet"}
              </p>
              <p className="text-[11px] text-slate-500">
                Tap the button below to pick a picture from your device.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2 rounded-xl bg-[#0F392B] text-white text-xs font-semibold hover:bg-[#0b2c21] transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading photo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>{previewImage ? "Change Photo" : "Choose Photo from Device"}</span>
                    </>
                  )}
                </button>

                {previewImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage("");
                      setPreviewImage("");
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition text-xs font-semibold"
                    title="Remove photo"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Quality SMP Food Storage Container"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B] font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Price in Naira (₦) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  ₦
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="100"
                  placeholder="e.g. 18000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-3 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Category / Department *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-[#0F392B]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Size, Capacity or Color Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 800 ML or Size 41 - 44"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Tell customers about the material, quality, or features of this item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
            />
          </div>
        </div>

        {/* Optional Variations */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800">
              Sizes & Colours (Optional)
            </h3>
            <p className="text-[11px] text-slate-500">
              Only fill these in if your item comes in different shoe sizes or clothing colours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Available Sizes
              </label>
              <input
                type="text"
                placeholder="e.g. 40, 41, 42, 43"
                value={sizes}
                onChange={(e) => setSizes(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Available Colours
              </label>
              <input
                type="text"
                placeholder="e.g. Black, Brown, Navy"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Stock & Visibility Settings */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              id="stockCheck"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 text-[#0F392B] rounded border-slate-300"
            />
            <label htmlFor="stockCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
              Product is Available in Store
            </label>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              id="publishCheck"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-[#0F392B] rounded border-slate-300"
            />
            <label htmlFor="publishCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
              Show Product on Public Website
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Save as Draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Product...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Publish to Website</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
