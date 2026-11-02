"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  Grid,
  List,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle2,
  Loader2,
  Camera,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

function AdminProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editQueryId = searchParams.get("edit");
  const searchQueryParam = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "out-of-stock" | "published" | "draft">("all");

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    category: "Adults' Fashion",
    price: "",
    description: "",
    inStock: true,
    isPublished: true,
    image: "",
    sizes: "",
    colors: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  // Load products & categories from backend API
  const loadData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success && Array.isArray(prodData.data)) {
          setProducts(prodData.data);
        }
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.success && Array.isArray(catData.data)) {
          setCategories(catData.data);
        }
      }
    } catch {
      showToast("error", "Failed to load products from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle URL edit param
  useEffect(() => {
    if (editQueryId && products.length > 0) {
      const match = products.find((p) => p.id === editQueryId);
      if (match) {
        openEditModal(match);
      }
    }
  }, [editQueryId, products]);

  // Open Edit Modal
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setPreviewImage(p.image || "");
    setFormData({
      name: p.name,
      subtitle: p.subtitle || "",
      category: p.category,
      price: p.price.toString(),
      description: p.description || p.shortDescription || "",
      inStock: p.inStock,
      isPublished: p.isPublished,
      image: p.image || "",
      sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : "",
      colors: Array.isArray(p.colors)
        ? p.colors.map((c: any) => (typeof c === "string" ? c : c.name)).join(", ")
        : "",
    });
    setIsModalOpen(true);
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show immediate local preview
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
        setFormData((prev) => ({ ...prev, image: finalUrl }));
        setPreviewImage(finalUrl);
        showToast("success", "✓ Photo uploaded successfully!");
      } else {
        showToast("error", resJson.error || "Could not upload image. Please try again.");
      }
    } catch {
      showToast("error", "Error uploading image to server.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save product changes
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("error", "Please enter a product name.");
      return;
    }

    if (!formData.price.trim() || isNaN(parseFloat(formData.price))) {
      showToast("error", "Please enter a valid price in Naira (₦).");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        shortDescription: formData.description.trim().slice(0, 160),
        inStock: formData.inStock,
        isPublished: formData.isPublished,
        image: formData.image || previewImage || "/images/products/container.jpg",
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        colors: formData.colors
          ? formData.colors.split(",").map((c) => ({ name: c.trim() })).filter((c) => c.name)
          : [],
      };

      if (!editingProduct) return;

      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success && result.data) {
        // Update local state immediately
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? result.data : p))
        );
        showToast("success", "✓ Product updated successfully!");
        setIsModalOpen(false);
        if (editQueryId) router.replace("/admin/products");
      } else {
        showToast("error", result.error || "Failed to save product.");
      }
    } catch {
      showToast("error", "Error saving product to server.");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmationId(null);
        showToast("success", "Product deleted from store.");
      } else {
        showToast("error", data.error || "Failed to delete product.");
      }
    } catch {
      showToast("error", "Error deleting product.");
    }
  };

  // Quick toggle Availability
  const handleToggleStock = async (p: Product) => {
    try {
      const nextStock = !p.inStock;
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, inStock: nextStock }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, inStock: nextStock } : item))
        );
        showToast("success", nextStock ? "Marked as Available" : "Marked as Out of Stock");
      }
    } catch {
      showToast("error", "Could not update availability.");
    }
  };

  // Quick toggle Visibility
  const handleTogglePublish = async (p: Product) => {
    try {
      const nextPublished = !p.isPublished;
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, isPublished: nextPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? { ...item, isPublished: nextPublished } : item))
        );
        showToast("success", nextPublished ? "Product is now Visible on Website" : "Product is now Hidden (Draft)");
      }
    } catch {
      showToast("error", "Could not update visibility.");
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (p.categorySlug !== selectedCategory && p.category !== selectedCategory) {
          return false;
        }
      }

      // Status filter
      if (statusFilter === "in-stock" && !p.inStock) return false;
      if (statusFilter === "out-of-stock" && p.inStock) return false;
      if (statusFilter === "published" && !p.isPublished) return false;
      if (statusFilter === "draft" && p.isPublished) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }

      return true;
    });
  }, [products, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Products ({products.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your store items, change prices, update photos, and set availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B] transition"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#0F392B] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((c) => {
              const count = products.filter(
                (p) => p.categorySlug === c.slug || p.category === c.name
              ).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === c.slug
                      ? "bg-[#0F392B] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="in-stock">Available Only</option>
              <option value="out-of-stock">Out of Stock Only</option>
              <option value="published">Visible on Website</option>
              <option value="draft">Hidden Drafts</option>
            </select>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition ${
                  viewMode === "grid" ? "bg-white text-[#0F392B] shadow-2xs" : "text-slate-400"
                }`}
                title="Cards View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md transition ${
                  viewMode === "table" ? "bg-white text-[#0F392B] shadow-2xs" : "text-slate-400"
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Content */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center space-y-3">
          <Package className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No products found</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setStatusFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Show All Products
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition p-4 flex flex-col justify-between"
            >
              <div>
                {/* Photo container */}
                <div className="relative w-full h-48 bg-[#F6F7F9] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-3">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      unoptimized={p.image?.startsWith("data:")}
                      sizes="300px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="text-xs text-slate-400">No photo</div>
                  )}

                  {/* Status badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        p.inStock ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                      }`}
                    >
                      {p.inStock ? "Available" : "Out of Stock"}
                    </span>
                    {!p.isPublished && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white uppercase tracking-wider">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#0F392B] uppercase tracking-wider block mb-1">
                  {p.category}
                </span>
                <h3 className="font-bold text-sm text-[#0F172A] line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                  {p.subtitle || p.shortDescription || "No extra details"}
                </p>
              </div>

              {/* Price and Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-[#0F172A]">
                    {formatNaira(p.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStock(p)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                      p.inStock
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    }`}
                    title="Click to toggle Available vs Out of Stock"
                  >
                    {p.inStock ? "Available" : "Out of Stock"}
                  </button>

                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0F392B] text-slate-700 hover:text-white transition cursor-pointer"
                    title="Edit details and photo"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Photo & Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Visible on Store</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            unoptimized={p.image?.startsWith("data:")}
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="text-[10px] text-slate-400">No img</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate max-w-xs">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate max-w-xs">
                          {p.subtitle || "Standard"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {p.category}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {formatNaira(p.price)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStock(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        p.inStock
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      {p.inStock ? "Available" : "Out of Stock"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        p.isPublished
                          ? "bg-slate-100 text-slate-700 border-slate-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {p.isPublished ? "Visible" : "Hidden (Draft)"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmationId(p.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => !saving && setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Edit Product
                </h3>
                <p className="text-xs text-slate-500">
                  Update product name, price, photo, and availability.
                </p>
              </div>
              <button
                onClick={() => !saving && setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Product Photo Upload with Live Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Product Photo Preview"
                      fill
                      unoptimized={previewImage?.startsWith("data:") || previewImage?.startsWith("blob:")}
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <Camera className="w-6 h-6 text-slate-300" />
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <p className="text-xs font-semibold text-slate-800">
                    Product Photo
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Upload a new photo from your phone or computer.
                  </p>
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
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stainless Steel Cutlery Set"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price in Naira (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    placeholder="e.g. 25000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-[#0F392B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the product for customers..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                />
              </div>

              {/* Availability & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="editInStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#0F392B] rounded border-slate-300"
                  />
                  <label htmlFor="editInStock" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Available in Store
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="editPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-[#0F392B] rounded border-slate-300"
                  />
                  <label htmlFor="editPublished" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Visible on Website
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setDeleteConfirmationId(editingProduct.id);
                  }}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Delete this Product
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs flex items-center gap-1.5"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setDeleteConfirmationId(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 p-6 z-10 text-center animate-in zoom-in-95 duration-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Product?</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete this product? It will be removed from your store and website.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                No, Keep it
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmationId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading catalog...</p>
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}
