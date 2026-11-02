"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  CheckCircle,
  AlertTriangle,
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  Upload,
  X,
  Eye,
  RefreshCw,
  ExternalLink,
  Tag,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Product, ProductCategory, ProductCategorySlug, CATEGORIES, getCategorySlug } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "out-of-stock" | "draft">("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    category: "Adults' Fashion" as ProductCategory,
    price: "",
    description: "",
    shortDescription: "",
    sizes: "",
    colors: "",
    inStock: true,
    stockCount: "10",
    isPublished: true,
    featured: false,
    badge: "",
    image: "",
    flaggedNote: "",
  });

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/products");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError(data.error || "Failed to load products");
      }
    } catch {
      setError("Network error connecting to product management service.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate Overview Metrics
  const stats = useMemo(() => {
    const total = products.length;
    const published = products.filter((p) => p.isPublished).length;
    const outOfStock = products.filter((p) => !p.inStock).length;
    const drafts = products.filter((p) => !p.isPublished).length;
    const flagged = products.filter((p) => p.flaggedNote && p.flaggedNote.trim().length > 0).length;
    return { total, published, outOfStock, drafts, flagged };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Status filter
      if (statusFilter === "in-stock" && !product.inStock) return false;
      if (statusFilter === "out-of-stock" && product.inStock) return false;
      if (statusFilter === "draft" && product.isPublished) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle?.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, statusFilter, searchQuery]);

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      subtitle: "",
      category: "Adults' Fashion",
      price: "",
      description: "",
      shortDescription: "",
      sizes: "",
      colors: "",
      inStock: true,
      stockCount: "10",
      isPublished: true,
      featured: false,
      badge: "",
      image: "/images/products/brown-dress.jpg",
      flaggedNote: "",
    });
    setImagePreview("/images/products/brown-dress.jpg");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      subtitle: product.subtitle || "",
      category: product.category,
      price: product.price.toString(),
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      sizes: (product.sizes || []).join(", "),
      colors: (product.colors || []).map((c) => c.name).join(", "),
      inStock: product.inStock,
      stockCount: product.stockCount.toString(),
      isPublished: product.isPublished,
      featured: product.featured || false,
      badge: product.badge || "",
      image: product.image,
      flaggedNote: product.flaggedNote || "",
    });
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  // Toggle inStock status inline
  const handleToggleStock = async (product: Product) => {
    const newStock = !product.inStock;
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: newStock } : p))
    );

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: newStock }),
      });

      if (!res.ok) {
        throw new Error();
      }
      showToast(
        `"${product.name}" marked as ${newStock ? "In Stock" : "Out of Stock"}.`
      );
    } catch {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, inStock: product.inStock } : p))
      );
      showToast("Failed to update stock status.", "error");
    }
  };

  // Toggle isPublished status inline
  const handleTogglePublish = async (product: Product) => {
    const newPublish = !product.isPublished;
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, isPublished: newPublish } : p))
    );

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newPublish }),
      });

      if (!res.ok) {
        throw new Error();
      }
      showToast(
        `"${product.name}" is now ${newPublish ? "Published on Live Shop" : "Saved as Draft"}.`
      );
    } catch {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isPublished: product.isPublished } : p))
      );
      showToast("Failed to update publication status.", "error");
    }
  };

  // Handle Image Upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show temporary local preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setUploadingImage(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
        showToast("Image uploaded and ready to save.");
      } else {
        showToast(data.error || "Failed to upload image.", "error");
      }
    } catch {
      showToast("Network error uploading image.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Product (Add or Edit)
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Product name is required.", "error");
      return;
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      showToast("A valid non-negative price is required.", "error");
      return;
    }
    if (!formData.image) {
      showToast("Please provide or upload a product picture.", "error");
      return;
    }

    setSaving(true);

    // Format sizes & colors
    const sizesArray = formData.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const colorsArray = formData.colors
      .split(",")
      .map((c) => ({ name: c.trim() }))
      .filter((c) => c.name.length > 0);

    const payload = {
      name: formData.name.trim(),
      subtitle: formData.subtitle.trim() || undefined,
      category: formData.category,
      categorySlug: getCategorySlug(formData.category),
      price: Number(formData.price),
      description: formData.description.trim() || formData.shortDescription.trim() || "",
      shortDescription: formData.shortDescription.trim() || formData.description.trim() || "",
      image: formData.image,
      sizes: sizesArray,
      colors: colorsArray,
      inStock: formData.inStock,
      stockCount: Number(formData.stockCount) || 10,
      isPublished: formData.isPublished,
      featured: formData.featured,
      badge: formData.badge.trim() || undefined,
      flaggedNote: formData.flaggedNote.trim() || undefined,
    };

    try {
      if (editingProduct) {
        // Update existing
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? data.data : p))
          );
          showToast(`"${formData.name}" updated successfully.`);
          setIsModalOpen(false);
        } else {
          showToast(data.error || "Failed to update product.", "error");
        }
      } else {
        // Create new
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProducts((prev) => [data.data, ...prev]);
          showToast(`"${formData.name}" added to catalogue.`);
          setIsModalOpen(false);
        } else {
          showToast(data.error || "Failed to add product.", "error");
        }
      }
    } catch {
      showToast("Network error saving product.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast("Product deleted permanently.");
        setDeleteConfirmationId(null);
      } else {
        showToast(data.error || "Failed to delete product.", "error");
      }
    } catch {
      showToast("Network error deleting product.", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xs shadow-lg border text-sm transition-all duration-300 ${
            toastMessage.type === "success"
              ? "bg-[#183C32] text-white border-[#183C32]"
              : "bg-red-700 text-white border-red-800"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0 text-white/90" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-white/90" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#EAE6DE]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#705B38] font-semibold block mb-1">
            MANAGEMENT DASHBOARD
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-[#183C32] font-normal">
            Product Catalogue & Inventory
          </h1>
          <p className="text-xs text-[#8A8884] mt-1 max-w-xl">
            Add new products with pictures, update prices, change sizes/colours, and control stock availability. All updates reflect on the public website immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold text-[#5A5854] hover:text-[#183C32] bg-white border border-[#E5E0D8] transition disabled:opacity-50"
            title="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs uppercase tracking-widest font-semibold text-white bg-[#183C32] hover:bg-[#122E26] shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Flagged Items Alert Banner */}
      {stats.flagged > 0 && (
        <div className="bg-[#FFFDF5] border border-[#E9DFB8] p-4 sm:p-5 rounded-xs">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#8F6A18] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[#664D12]">
                Items Flagged for Owner Confirmation ({stats.flagged})
              </h3>
              <p className="text-xs text-[#8F6A18] mt-1 leading-relaxed">
                Some imported products from Figma contained potential ambiguities (such as sizes to confirm or descriptions reading &quot;3 pieces&quot; on shoes). Click below to review and verify them:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {products
                  .filter((p) => p.flaggedNote)
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleOpenEdit(p)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-xs bg-[#FBF4DA] hover:bg-[#F3E7BE] text-[#664D12] border border-[#E2D29B] transition"
                    >
                      <span className="font-medium underline">{p.name}</span>
                      <span className="text-[10px] text-[#8F6A18]">
                        ({p.flaggedNote?.substring(0, 32)}...)
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xs border border-[#EAE6DE] shadow-xs">
          <div className="flex items-center justify-between text-[#705B38] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Products</span>
            <Package className="w-4 h-4 text-[#705B38]" />
          </div>
          <div className="text-3xl font-serif text-[#183C32]">{stats.total}</div>
          <div className="text-[11px] text-[#8A8884] mt-1">Across 4 main categories</div>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#EAE6DE] shadow-xs">
          <div className="flex items-center justify-between text-[#183C32] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Live / Published</span>
            <CheckCircle className="w-4 h-4 text-[#183C32]" />
          </div>
          <div className="text-3xl font-serif text-[#183C32]">{stats.published}</div>
          <div className="text-[11px] text-[#8A8884] mt-1">Visible on public Shop</div>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#EAE6DE] shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Out of Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-serif text-amber-700">{stats.outOfStock}</div>
          <div className="text-[11px] text-[#8A8884] mt-1">Marked as sold out</div>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#EAE6DE] shadow-xs">
          <div className="flex items-center justify-between text-[#8A8884] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Drafts / Hidden</span>
            <FileText className="w-4 h-4 text-[#8A8884]" />
          </div>
          <div className="text-3xl font-serif text-[#5A5854]">{stats.drafts}</div>
          <div className="text-[11px] text-[#8A8884] mt-1">Awaiting publication</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xs border border-[#EAE6DE] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8A8884] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name, description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8884] hover:text-[#20211E]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Items" },
              { id: "in-stock", label: "In Stock" },
              { id: "out-of-stock", label: "Out of Stock" },
              { id: "draft", label: "Drafts" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xs text-[11px] uppercase tracking-wider font-medium whitespace-nowrap transition ${
                  statusFilter === f.id
                    ? "bg-[#705B38] text-white"
                    : "bg-[#FAF8F5] text-[#5A5854] hover:bg-[#F0ECE1] border border-[#EAE6DE]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#F0ECE1]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xs text-xs tracking-wider transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-[#183C32] text-white font-medium"
                  : "bg-white text-[#5A5854] hover:text-[#183C32] hover:bg-[#F5F2EB] border border-[#E5E0D8]"
              }`}
            >
              {cat.label}
              {cat.id === "all" ? (
                <span className="ml-1.5 text-[10px] opacity-70">({products.length})</span>
              ) : (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({products.filter((p) => p.categorySlug === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xs border border-[#EAE6DE] shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#8A8884] space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#705B38]" />
            <p className="text-xs uppercase tracking-wider font-medium">Loading Products Catalogue...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-[#8A8884] space-y-3">
            <Package className="w-8 h-8 mx-auto text-[#D4CFC7]" />
            <p className="text-sm text-[#5A5854]">No products match the selected filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setStatusFilter("all");
              }}
              className="text-xs text-[#705B38] underline hover:text-[#183C32]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EAE6DE] text-[10px] sm:text-xs uppercase tracking-wider text-[#705B38] font-semibold">
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (NGN)</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4">Live Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-[#FCFBF8] transition group"
                  >
                    {/* Product Image & Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xs overflow-hidden bg-[#F5F2EB] border border-[#EAE6DE] shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[#20211E] truncate max-w-xs sm:max-w-sm">
                            {product.name}
                          </div>
                          {product.subtitle && (
                            <div className="text-[11px] text-[#8A8884] truncate max-w-xs">
                              {product.subtitle}
                            </div>
                          )}
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="text-[10px] text-[#705B38] mt-0.5">
                              Sizes: {product.sizes.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium bg-[#F5F2EB] text-[#5A5854] border border-[#E5E0D8]">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 whitespace-nowrap font-serif text-sm sm:text-base text-[#183C32] font-medium">
                      {formatNaira(product.price)}
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStock(product)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition border ${
                          product.inStock
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        }`}
                        title="Click to toggle stock status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.inStock ? "bg-emerald-600" : "bg-red-500"
                          }`}
                        />
                        <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                      </button>
                    </td>

                    {/* Published Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(product)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition border ${
                          product.isPublished
                            ? "bg-[#183C32]/10 text-[#183C32] border-[#183C32]/30 hover:bg-[#183C32]/15"
                            : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                        }`}
                        title="Click to publish or unpublish"
                      >
                        <span>{product.isPublished ? "Published" : "Draft"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/shop/${product.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xs text-[#8A8884] hover:text-[#183C32] hover:bg-[#F5F2EB] transition"
                          title="View on public shop"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-xs text-[#705B38] hover:text-[#183C32] hover:bg-[#F5F2EB] transition"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmationId(product.id)}
                          className="p-1.5 rounded-xs text-red-600 hover:text-red-800 hover:bg-red-50 transition"
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
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-xs max-w-2xl w-full border border-[#EAE6DE] shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#EAE6DE] flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#705B38] font-semibold block">
                  {editingProduct ? "EDIT PRODUCT" : "NEW PRODUCT"}
                </span>
                <h3 className="font-serif italic text-xl sm:text-2xl text-[#183C32] font-normal">
                  {editingProduct ? `Edit ${editingProduct.name}` : "Add Product to Catalogue"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xs text-[#8A8884] hover:text-[#20211E] hover:bg-[#F0ECE1] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitProduct} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Image Upload & Preview Section */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-2">
                  Product Image *
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-dashed border-[#D4CFC7] bg-[#FAF8F5] rounded-xs">
                  {/* Thumbnail Preview */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xs overflow-hidden bg-white border border-[#EAE6DE] shrink-0 shadow-xs flex items-center justify-center">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-[#B0ACA5]" />
                    )}
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <p className="text-xs text-[#5A5854]">
                      Upload product pictures directly from your phone or computer.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider text-white bg-[#183C32] hover:bg-[#122E26] transition disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Select New Picture</span>
                      </button>

                      {imagePreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: "" }));
                          }}
                          className="px-3 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 hover:bg-red-100 transition border border-red-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <p className="text-[10px] text-[#8A8884]">
                      Supports JPEG, PNG, and WebP images. Works on mobile photo libraries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Quality SMP Food Storage Container"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ProductCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  >
                    <option value="Kitchen Utensils">Kitchen Utensils</option>
                    <option value="Baby Things">Baby Things</option>
                    <option value="Adults' Fashion">Adults&apos; Fashion</option>
                    <option value="Children's Outfits">Children&apos;s Outfits</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Price in NGN (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 25000"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Subtitle / Variant (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. 800 ML or 10 pieces or Size 41–44"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              {/* Sizes & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Available Sizes (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="e.g. 40, 41, 42, 43, 44 or 7-8 Yrs, 9-10 Yrs"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                    Available Colours (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="e.g. Black, Brown, Ash, Navy Blue"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#705B38] font-semibold mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                      shortDescription: e.target.value.substring(0, 120),
                    })
                  }
                  placeholder="Detailed description of the product, craftsmanship, materials and care instructions..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs focus:outline-none focus:border-[#183C32]"
                />
              </div>

              {/* Stock and Publication Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#F0ECE1]">
                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs">
                  <div>
                    <div className="text-xs font-semibold text-[#20211E]">Stock Availability</div>
                    <div className="text-[11px] text-[#8A8884]">
                      {formData.inStock ? "Item is in stock and ready to order" : "Item is currently sold out"}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-5 h-5 accent-[#183C32] rounded-xs cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xs">
                  <div>
                    <div className="text-xs font-semibold text-[#20211E]">Publish to Live Website</div>
                    <div className="text-[11px] text-[#8A8884]">
                      {formData.isPublished ? "Visible to customers on /shop" : "Hidden as draft in admin"}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-5 h-5 accent-[#183C32] rounded-xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-4 border-t border-[#EAE6DE] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xs text-xs uppercase tracking-wider font-semibold text-[#5A5854] hover:bg-[#F5F2EB] border border-[#E5E0D8] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2.5 rounded-xs text-xs uppercase tracking-widest font-semibold text-white bg-[#183C32] hover:bg-[#122E26] shadow-xs transition disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : editingProduct ? "Update Product" : "Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xs max-w-md w-full border border-[#EAE6DE] shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-lg text-[#20211E] font-medium">Delete Product?</h3>
            </div>
            <p className="text-xs text-[#5A5854] leading-relaxed">
              Are you sure you want to permanently remove this product from the catalogue? This will immediately remove it from the public shop.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-2 rounded-xs text-xs uppercase tracking-wider font-semibold text-[#5A5854] hover:bg-[#F5F2EB] border border-[#E5E0D8] transition"
              >
                Keep Product
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmationId)}
                className="px-4 py-2 rounded-xs text-xs uppercase tracking-widest font-semibold text-white bg-red-700 hover:bg-red-800 transition"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
