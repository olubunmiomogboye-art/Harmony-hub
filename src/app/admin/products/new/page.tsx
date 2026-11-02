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
  Sparkles,
} from "lucide-react";
import ProductVariationEditor, { ColorItem } from "@/components/admin/ProductVariationEditor";

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

  // Variation States
  const [sizes, setSizes] = useState<string[]>([]);
  const [unavailableSizes, setUnavailableSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [combinationAvailability, setCombinationAvailability] = useState<Record<string, boolean>>({});

  // AI Assistant States
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const [aiSetupModal, setAiSetupModal] = useState<string | null>(null);
  const [aiSuccessNote, setAiSuccessNote] = useState<string | null>(null);

  // AI Suggestion Handler
  const handleAIAssist = async () => {
    const targetImage = image || previewImage;
    if (!targetImage) {
      showToast("error", "Please choose or upload a product photo first.");
      return;
    }

    try {
      setAnalyzingAI(true);
      setAiSuccessNote(null);
      const res = await fetch("/api/admin/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: targetImage }),
      });

      const resJson = await res.json();

      if (resJson.configured === false) {
        setAiSetupModal(resJson.setupGuide || resJson.error);
        return;
      }

      if (resJson.success && resJson.data) {
        const d = resJson.data;
        if (d.name) setName(d.name);
        if (d.subtitle) setSubtitle(d.subtitle);
        if (d.description) setDescription(d.description);
        if (d.category) {
          const matched = categories.find(
            (c) => c.name.toLowerCase() === d.category.toLowerCase()
          );
          if (matched) setCategory(matched.name);
          else setCategory(d.category);
        }
        if (d.colors && Array.isArray(d.colors) && d.colors.length > 0) {
          setColors(d.colors.map((c: string) => ({ name: c, inStock: true })));
        }
        setAiSuccessNote(
          `AI suggestions applied for "${d.name}"! Please review the details and enter your price in Naira (₦).`
        );
        showToast("success", "✓ Suggested product information loaded from photo!");
      } else {
        showToast("error", resJson.error || "Could not analyze the photo. Please enter details manually.");
      }
    } catch {
      showToast("error", "Network error while calling AI assistant.");
    } finally {
      setAnalyzingAI(false);
    }
  };

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
        sizes: sizes,
        unavailableSizes: unavailableSizes,
        colors: colors,
        combinationAvailability: combinationAvailability,
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
        {/* 1. Product Name (Clear, bold, prominent at the top) */}
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
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B] font-bold"
          />
        </div>

        {/* 2. Price & Category */}
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
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-[#0F392B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Department / Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-[#0F392B]"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Photo Upload Section with AI Assistant */}
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
                      setAiSuccessNote(null);
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

          {/* AI Auto-Fill Suggestions from Photo */}
          {(previewImage || image) && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F392B] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F392B]">
                    AI Photo Assistant
                  </p>
                  <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    Scan this photo to suggest the product name, department, description, and visible color.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAIAssist}
                disabled={analyzingAI || uploadingImage}
                className="px-4 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50 shrink-0"
              >
                {analyzingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analysing photo...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Product Details</span>
                  </>
                )}
              </button>
            </div>
          )}

          {aiSuccessNote && (
            <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{aiSuccessNote}</span>
              </div>
              <button
                type="button"
                onClick={() => setAiSuccessNote(null)}
                className="text-emerald-700 hover:text-emerald-950 font-semibold text-xs ml-2 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* 4. Subtitle & Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Size, Capacity or Color Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 800 ML or 16-piece complete dining set"
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

        {/* 5. Product Sizes, Colours & Availability Manager */}
        <ProductVariationEditor
          sizes={sizes}
          onChangeSizes={setSizes}
          unavailableSizes={unavailableSizes}
          onChangeUnavailableSizes={setUnavailableSizes}
          colors={colors}
          onChangeColors={setColors}
          combinationAvailability={combinationAvailability}
          onChangeCombinationAvailability={setCombinationAvailability}
          inStock={inStock}
          onChangeInStock={setInStock}
        />

        {/* 6. Visibility Settings */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">
              Publishing Options
            </p>
            <p className="text-[11px] text-slate-500">
              You can publish directly to the shop or keep this item as a draft.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">
              {isPublished ? "Visible on Website" : "Hidden (Draft)"}
            </span>
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

      {/* AI Setup & Information Modal */}
      {aiSetupModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">AI Assistant Configuration</h3>
                <p className="text-xs text-slate-500">Service setup note</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {aiSetupModal}
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1.5">
              <p className="font-bold text-slate-900">How to activate AI photo suggestions:</p>
              <p>1. Get a free Google Gemini key at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-semibold">aistudio.google.com</a></p>
              <p>2. Add <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">GEMINI_API_KEY=your_key</code> into your <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] font-mono">.env.local</code> file</p>
              <p>3. Restart the server or redeploy to your hosting provider</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">You can still type details manually.</span>
              <button
                type="button"
                onClick={() => setAiSetupModal(null)}
                className="px-4 py-2 rounded-xl bg-[#0F392B] text-white text-xs font-semibold hover:bg-[#0b2c21] transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
