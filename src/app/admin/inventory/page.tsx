"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Boxes,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  RefreshCw,
  Loader2,
  Check,
  Filter,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch {
      showToast("error", "Failed to fetch inventory records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  // Update stock count directly
  const handleUpdateStockCount = async (id: string, newCount: number) => {
    if (newCount < 0) return;
    try {
      setUpdatingId(id);
      const target = products.find((p) => p.id === id);
      if (!target) return;

      const updatedInStock = newCount > 0;
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...target,
          stockCount: newCount,
          inStock: updatedInStock,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, stockCount: newCount, inStock: updatedInStock } : p
          )
        );
        showToast("success", `Stock updated to ${newCount}`);
      } else {
        showToast("error", resData.error || "Failed to update stock.");
      }
    } catch {
      showToast("error", "Error saving stock to server.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle In Stock / Out of Stock
  const handleToggleStock = async (id: string) => {
    try {
      setUpdatingId(id);
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
        showToast("success", "Stock availability toggled.");
      }
    } catch {
      showToast("error", "Failed to toggle stock status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered inventory
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Stock status filter
      if (stockFilter === "in-stock" && !p.inStock) return false;
      if (stockFilter === "out-of-stock" && p.inStock) return false;
      if (stockFilter === "low-stock" && (!p.inStock || (p.stockCount ?? 0) > 10)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }

      return true;
    });
  }, [products, stockFilter, searchQuery]);

  const inStockCount = products.filter((p) => p.inStock).length;
  const lowStockCount = products.filter((p) => p.inStock && (p.stockCount ?? 0) <= 10).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  return (
    <div className="space-y-6">
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
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Inventory Management
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Monitor real stock quantities, identify low items, and adjust levels inline.
          </p>
        </div>

        <button
          onClick={loadProducts}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Stock Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setStockFilter("in-stock")}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
            stockFilter === "in-stock"
              ? "bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-500/20"
              : "bg-white border-[#E2E8F0] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>In Stock</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {inStockCount}
          </div>
          <span className="text-[11px] text-slate-500">Available for orders</span>
        </button>

        <button
          onClick={() => setStockFilter("low-stock")}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
            stockFilter === "low-stock"
              ? "bg-amber-50/50 border-amber-300 ring-2 ring-amber-500/20"
              : "bg-white border-[#E2E8F0] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Low Stock (≤ 10)</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {lowStockCount}
          </div>
          <span className="text-[11px] text-slate-500">Requires restock soon</span>
        </button>

        <button
          onClick={() => setStockFilter("out-of-stock")}
          className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
            stockFilter === "out-of-stock"
              ? "bg-red-50/50 border-red-300 ring-2 ring-red-500/20"
              : "bg-white border-[#E2E8F0] hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-red-700">
            <span>Out of Stock</span>
            <span className="w-2 h-2 rounded-full bg-red-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {outOfStockCount}
          </div>
          <span className="text-[11px] text-slate-500">Hidden or marked sold out</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inventory by title or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setStockFilter("all");
              setSearchQuery("");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              stockFilter === "all"
                ? "bg-[#0F392B] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Show All ({products.length})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Item Details</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Available Variations</th>
                <th className="py-3.5 px-4 text-center">Current Quantity</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Stock Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0F392B]" />
                    <span>Loading inventory status...</span>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No items match the selected stock filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isUpdating = updatingId === p.id;
                  const currentStock = p.stockCount ?? (p.inStock ? 20 : 0);
                  const isLow = p.inStock && currentStock <= 10;

                  return (
                    <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-lg bg-[#F6F7F9] overflow-hidden shrink-0 border border-slate-200 p-1 flex items-center justify-center">
                            {p.image ? (
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="44px"
                                className="object-contain p-0.5"
                              />
                            ) : (
                              <Boxes className="w-4 h-4 text-slate-400" />
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

                      <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                        {p.category}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {formatNaira(p.price)}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {Array.isArray(p.sizes) && p.sizes.length > 0 ? (
                          <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            {p.sizes.length} Sizes ({p.sizes.slice(0, 3).join(", ")}
                            {p.sizes.length > 3 ? "..." : ""})
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">None specified</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`font-mono text-sm font-bold ${
                            !p.inStock
                              ? "text-red-500"
                              : isLow
                              ? "text-amber-600"
                              : "text-slate-900"
                          }`}
                        >
                          {currentStock} units
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleStock(p.id)}
                          disabled={isUpdating}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition cursor-pointer ${
                            !p.inStock
                              ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              : isLow
                              ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              !p.inStock
                                ? "bg-red-500"
                                : isLow
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                          />
                          {!p.inStock
                            ? "Out of Stock"
                            : isLow
                            ? "Low Stock"
                            : "In Stock"}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStockCount(p.id, Math.max(0, currentStock - 1))}
                            disabled={isUpdating || currentStock <= 0}
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 disabled:opacity-40 transition cursor-pointer"
                            title="Decrease quantity by 1"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="number"
                            min="0"
                            value={currentStock}
                            onChange={(e) =>
                              handleUpdateStockCount(p.id, parseInt(e.target.value || "0", 10))
                            }
                            className="w-14 bg-[#F8FAFC] border border-slate-200 rounded-lg py-1 text-center font-mono text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#0F392B]"
                          />

                          <button
                            onClick={() => handleUpdateStockCount(p.id, currentStock + 1)}
                            disabled={isUpdating}
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 disabled:opacity-40 transition cursor-pointer"
                            title="Increase quantity by 1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
