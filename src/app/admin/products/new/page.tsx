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
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  DollarSign,
  Plus,
  Eye,
  Save,
} from "lucide-react";
import { formatNaira } from "@/lib/formatters";

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
  const [category, setCategory] = useState("Adults' Fashion");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [stockCount, setStockCount] = useState("25");
  const [inStock, setInStock] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");

  // Variations (Optional)
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

  // Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const resJson = await res.json();
      if (resJson.success && resJson.imageUrl) {
        setImage(resJson.imageUrl);
        setToast({ type: "success", text: "Product image uploaded successfully!" });
      } else {
        setToast({ type: "error", text: resJson.error || "Image upload failed." });
      }
    } catch {
      setToast({ type: "error", text: "Error uploading image to server." });
    } finally {
      setUploadingImage(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (publishState: boolean) => {
    if (!name.trim()) {
      setToast({ type: "error", text: "Please enter a product title." });
      return;
    }

    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setToast({ type: "error", text: "Please provide a valid product price in Naira." });
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: name.trim(),
        subtitle: subtitle.trim(),
        category,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
        shortDescription: shortDescription.trim(),
        description: description.trim() || shortDescription.trim(),
        inStock,
        stockCount: parseInt(stockCount || "0", 10),
        isPublished: publishState,
        featured,
        image: image || "/images/products/placeholder.jpg",
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
      if (resData.success) {
        setToast({
          type: "success",
          text: publishState
            ? "Product published to the live shop!"
            : "Product saved as draft in catalog.",
        });
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1200);
      } else {
        setToast({ type: "error", text: resData.error || "Failed to create product." });
      }
    } catch {
      setToast({ type: "error", text: "Network error saving product." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast */}
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

      {/* Header & Back Link */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg border border-[#E2E8F0] bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Add New Product
            </h1>
            <p className="text-xs text-[#64748B]">
              Add a new item to your store inventory and publish to the public website.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer disabled:opacity-60"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(true)}
            className="px-4 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Publish Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Basic Product Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Quality SMP Food Storage Container"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B] focus:ring-1 focus:ring-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Specification or Subtitle (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 800 ML or Size 40-44. Black, Leather"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Quick summary shown on cards and WhatsApp order summaries..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Product Description
              </label>
              <textarea
                rows={4}
                placeholder="Detailed information regarding material, dimensions, care instructions, and authenticity..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>

          {/* Card 2: Pricing & Inventory */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Pricing & Stock Levels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Regular Price in Naira (₦) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    required
                    placeholder="25000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-8 pr-3.5 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-[#0F392B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Discount / Strike Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    placeholder="30000"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-8 pr-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockCount}
                  onChange={(e) => setStockCount(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="inStockToggle"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#0F392B] rounded border-slate-300 focus:ring-[#0F392B]"
                />
                <label htmlFor="inStockToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Item is currently in stock
                </label>
              </div>
            </div>
          </div>

          {/* Card 3: Variations (Optional) */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-[#0F172A]">
                Product Variations (Optional)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Only add sizes and colors if this product has multiple variants.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Available Sizes
                </label>
                <input
                  type="text"
                  placeholder="e.g. 38, 39, 40, 41, 42"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Separate multiple sizes with a comma.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Available Colours
                </label>
                <input
                  type="text"
                  placeholder="e.g. Black, Brown, Ash, Navy"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Separate multiple colors with a comma.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Category & Organisation */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Category & Visibility
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Department
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-[#0F392B]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-[#0F392B] rounded border-slate-300 focus:ring-[#0F392B]"
                />
                <label htmlFor="publishedToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Publish to Public Storefront
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0F392B] rounded border-slate-300 focus:ring-[#0F392B]"
                />
                <label htmlFor="featuredToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Feature on Homepage Hero
                </label>
              </div>
            </div>
          </div>

          {/* Card: Image Upload */}
          <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">
              Product Photograph
            </h2>

            <div className="relative w-full h-48 bg-[#F6F7F9] rounded-xl border border-dashed border-slate-300 overflow-hidden flex flex-col items-center justify-center p-3 text-center">
              {image ? (
                <>
                  <Image
                    src={image}
                    alt="Preview"
                    fill
                    sizes="300px"
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-red-600 shadow-xs z-10"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    No image uploaded yet
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PNG, JPG, or WebP up to 10MB
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {uploadingImage ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span>{uploadingImage ? "Uploading..." : "Upload from Computer / Camera"}</span>
              </button>

              <input
                type="text"
                placeholder="Or paste asset URL (/images/products/...)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
