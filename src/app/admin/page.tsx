"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Layers,
  Boxes,
  ShoppingBag,
  PlusCircle,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

interface CategoryStat {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
}

export default function AdminOverviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, ordRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/orders"),
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

      if (ordRes.ok) {
        const ordData = await ordRes.json();
        if (ordData.success && Array.isArray(ordData.data)) {
          setOrders(ordData.data);
        }
      }
    } catch (e) {
      console.error("Error loading dashboard data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute metrics from genuine backend data
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.isPublished).length;
  const inStockProducts = products.filter((p) => p.inStock).length;
  const outOfStockProducts = products.filter((p) => !p.inStock).length;
  const lowStockProducts = products.filter((p) => p.inStock && p.stockCount <= 10).length;

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stockCount || 0),
    0
  );

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt || 0).getTime() -
        new Date(a.updatedAt || a.createdAt || 0).getTime()
    )
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Dashboard Overview
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time catalog metrics and store activity for Harmony Hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 rounded-lg border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC] transition"
            title="Refresh dashboard data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <Link
            href="/admin/inventory"
            className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition"
          >
            Manage Stock
          </Link>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F392B] text-white text-xs font-semibold hover:bg-[#0b2c21] transition shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Statistic Cards (NeoCommerce Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Total Products</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0F392B] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0F172A]">
              {loading ? "..." : totalProducts}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              {publishedProducts} Published
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex items-center justify-between">
            <span>In stock: {inStockProducts}</span>
            <span>Drafts: {totalProducts - publishedProducts}</span>
          </div>
        </div>

        {/* Card 2: Stock Health */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Stock Status</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0F172A]">
              {loading ? "..." : inStockProducts}
            </span>
            <span className="text-xs text-[#64748B] font-normal">Active Items</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex items-center justify-between">
            <span className="text-amber-600 font-medium">Low stock: {lowStockProducts}</span>
            <span className="text-red-500 font-medium">Out: {outOfStockProducts}</span>
          </div>
        </div>

        {/* Card 3: Active Categories */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Categories</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0F172A]">
              {loading ? "..." : categories.length}
            </span>
            <span className="text-xs text-purple-600 font-medium">Active Sections</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B]">
            All 4 departments active on storefront
          </div>
        </div>

        {/* Card 4: Orders & Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">Customer Orders</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0F172A]">
              {loading ? "..." : orders.length}
            </span>
            <span className="text-xs text-[#64748B] font-normal">WhatsApp checkouts</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B]">
            {orders.length === 0
              ? "Live captures will appear here"
              : `${orders.filter((o) => o.status === "pending").length} pending follow-up`}
          </div>
        </div>
      </div>

      {/* Main Grid: Products Table + Categories Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Products */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[#0F172A]">
                Recent Products
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Latest items added or modified in your catalog
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#0F392B] hover:underline flex items-center gap-1"
            >
              <span>View All ({totalProducts})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Loading products...
                    </td>
                  </tr>
                ) : recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No products found. Click "Add Product" to create one.
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFC] transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                            {p.image ? (
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="40px"
                                className="object-cover object-center"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate max-w-[180px]">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                              {p.subtitle || p.shortDescription || "No subtitle"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                        {formatNaira(p.price)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                            p.inStock
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.inStock ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                          {p.inStock ? `${p.stockCount} in stock` : "Out of stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                            p.isPublished
                              ? "bg-slate-100 text-slate-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {p.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/admin/products?edit=${p.id}`}
                          className="text-[#0F392B] hover:underline font-semibold"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Category Distribution & Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <h3 className="text-sm font-semibold text-[#0F172A]">
                Categories Breakdown
              </h3>
              <Link
                href="/admin/categories"
                className="text-xs text-[#0F392B] font-semibold hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {categories.map((cat) => {
                const count = cat.itemCount;
                const percentage =
                  totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0;
                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-500 font-semibold">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0F392B] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">
              Store Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/products/new"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-slate-800 transition"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#0F392B]" />
                  Add a New Product
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/categories"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-semibold text-slate-800 transition"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Edit Departments & Categories
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/shop"
                target="_blank"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] text-xs font-semibold text-[#0F392B] transition"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#0F392B]" />
                  Preview Customer Storefront
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#0F392B]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
