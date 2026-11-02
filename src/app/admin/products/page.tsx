"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Edit2,
  Trash2,
  ExternalLink,
  ArrowUpRight,
  Check,
  X,
  Upload,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Tag,
  CheckCircle2,
  Loader2,
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
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "name">("newest");

  // Edit / Add Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    category: "Adults' Fashion",
    price: "",
    discountPrice: "",
    description: "",
    shortDescription: "",
    sizes: "",
    colors: "",
    inStock: true,
    stockCount: "25",
    isPublished: true,
    featured: false,
    image: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Load products & categories from backend
  const fetchData = async () => {
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
    } catch (e) {
      console.error("Failed to fetch products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  // Handle open modal for Edit
  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      subtitle: p.subtitle || "",
      category: p.category,
      price: p.price.toString(),
      discountPrice: (p as any).discountPrice ? (p as any).discountPrice.toString() : "",
      description: p.description || "",
      shortDescription: p.shortDescription || "",
      sizes: Array.isArray(p.sizes) ? p.sizes.join(", ") : "",
      colors: Array.isArray(p.colors)
        ? p.colors.map((c: any) => (typeof c === "string" ? c : c.name)).join(", ")
        : "",
      inStock: p.inStock,
      stockCount: (p.stockCount ?? 20).toString(),
      isPublished: p.isPublished,
      featured: Boolean(p.featured),
      image: p.image || "",
    });
    setIsModalOpen(true);
  };

  // Open modal for Create
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      subtitle: "",
      category: categories[0]?.name || "Adults' Fashion",
      price: "",
      discountPrice: "",
      description: "",
      shortDescription: "",
      sizes: "",
      colors: "",
      inStock: true,
      stockCount: "25",
      isPublished: true,
      featured: false,
      image: "",
    });
    setIsModalOpen(true);
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const resJson = await res.json();
      if (resJson.success && resJson.imageUrl) {
        setFormData((prev) => ({ ...prev, image: resJson.imageUrl }));
        showToast("success", "Image uploaded successfully!");
      } else {
        showToast("error", resJson.error || "Failed to upload image.");
      }
    } catch {
      showToast("error", "Error uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save product (Create or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      showToast("error", "Product name and price are required.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        description: formData.description.trim(),
        shortDescription: formData.shortDescription.trim(),
        inStock: formData.inStock,
        stockCount: parseInt(formData.stockCount || "0", 10),
        isPublished: formData.isPublished,
        featured: formData.featured,
        image: formData.image || "/images/products/placeholder.jpg",
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        colors: formData.colors
          ? formData.colors.split(",").map((c) => ({ name: c.trim() })).filter((c) => c.name)
          : [],
      };

      let res;
      if (editingProduct) {
        res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const result = await res.json();
      if (result.success) {
        showToast("success", editingProduct ? "Product updated successfully!" : "Product created successfully!");
        setIsModalOpen(false);
        fetchData();
        if (editQueryId) {
          router.replace("/admin/products");
        }
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
        showToast("success", "Product deleted successfully from store.");
      } else {
        showToast("error", data.error || "Failed to delete product.");
      }
    } catch {
      showToast("error", "Error deleting product.");
    }
  };

  // Toggle Stock directly
  const handleToggleStock = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_stock" }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
        );
        showToast("success", "Stock status updated.");
      }
    } catch {
      showToast("error", "Failed to update stock status.");
    }
  };

  // Toggle Publish status
  const handleTogglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_publish" }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
        );
        showToast("success", "Publication status updated.");
      }
    } catch {
      showToast("error", "Failed to update publication status.");
    }
  };

  const showToast = (type: "success" | "error", text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
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
          const matchSub = (p.subtitle || "").toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return (
          new Date(b.updatedAt || b.createdAt || 0).getTime() -
          new Date(a.updatedAt || a.createdAt || 0).getTime()
        );
      });
  }, [products, selectedCategory, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold animate-in slide-in-from-bottom duration-200 ${
            feedbackMessage.type === "success"
              ? "bg-white text-emerald-800 border-emerald-200 shadow-emerald-500/10"
              : "bg-white text-red-800 border-red-200 shadow-red-500/10"
          }`}
        >
          {feedbackMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Page Header (NeoCommerce Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Products
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your store catalog, prices, variations, stock, and live status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Secondary Search (NeoCommerce Style) */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-8 pr-3 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0F392B] focus:ring-1 focus:ring-[#0F392B] transition"
            />
          </div>

          {/* Add New Product Button (Solid NeoCommerce Style) */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs Row (NeoCommerce Pill Tabs) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#0F392B] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Products ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter(
              (p) => p.categorySlug === c.slug || p.category === c.name
            ).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === c.slug
                    ? "bg-[#0F392B] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* View Mode & Extra Filters */}
        <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-auto">
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "grid"
                  ? "bg-white text-[#0F392B] shadow-2xs font-semibold"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition ${
                viewMode === "table"
                  ? "bg-white text-[#0F392B] shadow-2xs font-semibold"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT LISTING CONTENT */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No products found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No products matched your current filters. Try resetting the category or search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setStatusFilter("all");
            }}
            className="mt-4 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW (NeoCommerce Inspired Cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs hover:shadow-md transition-all p-4 flex flex-col group"
            >
              {/* Product Card Image Container */}
              <div className="relative w-full h-52 bg-[#F6F7F9] rounded-xl overflow-hidden flex items-center justify-center p-3 mb-3">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-102 transition duration-300"
                  />
                ) : (
                  <div className="text-xs text-slate-400">No image</div>
                )}

                {/* Status Badges on Image */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                      p.inStock
                        ? "bg-emerald-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {!p.isPublished && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500 text-white uppercase tracking-wider">
                      Draft
                    </span>
                  )}
                </div>

                {/* Quick Edit Icon */}
                <button
                  onClick={() => openEditModal(p)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 shadow-xs opacity-0 group-hover:opacity-100 transition"
                  title="Edit Product"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#0F392B] uppercase tracking-wider block mb-1">
                    {p.category}
                  </span>
                  <h3 className="font-semibold text-sm text-[#0F172A] line-clamp-1 group-hover:text-[#0F392B] transition">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {p.subtitle || p.shortDescription || "No description"}
                  </p>
                </div>

                {/* Price, Stock and Action Button (NeoCommerce Style) */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#0F172A] block">
                      {formatNaira(p.price)}
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      Stock: <strong className="text-slate-800">{p.stockCount ?? 20}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleStock(p.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                        p.inStock
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          : "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                      }`}
                      title="Click to toggle stock"
                    >
                      {p.inStock ? "In Stock" : "Out"}
                    </button>

                    <button
                      onClick={() => openEditModal(p)}
                      className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#0F392B] text-slate-700 hover:text-white flex items-center justify-center transition cursor-pointer"
                      title="View & Edit Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW (DashboardKit Style) */
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-[#F6F7F9] overflow-hidden shrink-0 border border-slate-200 p-1 flex items-center justify-center">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
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
                            {p.subtitle || p.shortDescription || "No subtitle"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-medium">
                      {p.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {formatNaira(p.price)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStock(p.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition cursor-pointer ${
                          p.inStock
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                        title="Click to toggle In Stock / Out of Stock"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.inStock ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        />
                        {p.inStock ? `In Stock (${p.stockCount})` : "Out of Stock"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(p.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition cursor-pointer ${
                          p.isPublished
                            ? "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle Published / Draft"
                      >
                        {p.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {p.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmationId(p.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EDIT / CREATE PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => !saving && setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingProduct ? "Edit Product Details" : "Add New Product"}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingProduct
                    ? "Update product pricing, stock status, variations, and image."
                    : "Create a new item in your Harmony Hub catalog."}
                </p>
              </div>
              <button
                onClick={() => !saving && setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Basic Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quality SMP Food Storage Container"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B] focus:ring-1 focus:ring-[#0F392B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department / Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Price in Naira (₦) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="100"
                      placeholder="e.g. 18000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subtitle or Size Specification (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Size 41 - 44. Black or 800 ML"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description shown on product cards and checkout summary..."
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#0F392B]"
                  />
                </div>
              </div>

              {/* Product Image Section */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
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
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        {uploadingImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{uploadingImage ? "Uploading..." : "Upload from Device"}</span>
                      </button>

                      {formData.image && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Or paste an image URL (/images/products/...)"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Variations (Optional Sizes & Colors) */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 41, 42, 43, 44"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Optional. Leave blank if not applicable.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Available Colours (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Black, Brown, Navy"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Optional. Leave blank if not applicable.
                  </span>
                </div>
              </div>

              {/* Stock and Publishing Toggles */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="inStockCheck"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#0F392B] rounded border-slate-300 focus:ring-[#0F392B]"
                  />
                  <label htmlFor="inStockCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Mark as In Stock
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-[#0F392B] rounded border-slate-300 focus:ring-[#0F392B]"
                  />
                  <label htmlFor="isPublishedCheck" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Publish to Public Shop
                  </label>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                {editingProduct ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setDeleteConfirmationId(editingProduct.id);
                    }}
                    className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition"
                  >
                    Delete Product
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-xs font-semibold transition shadow-xs flex items-center gap-1.5 disabled:opacity-60"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
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
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete this product? It will be permanently removed from both this dashboard and the live customer storefront.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmationId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition"
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

