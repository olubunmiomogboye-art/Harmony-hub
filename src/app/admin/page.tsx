"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  PlusCircle,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Layers,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

export default function AdminOverviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const prodData = await res.json();
        if (prodData.success && Array.isArray(prodData.data)) {
          setProducts(prodData.data);
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

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.isPublished).length;
  const draftProducts = products.filter((p) => !p.isPublished).length;
  const outOfStockProducts = products.filter((p) => !p.inStock).length;
  const lowStockProducts = products.filter((p) => p.inStock && (p.stockCount ?? 0) <= 5).length;

  const recentProducts = [...products].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-[#0F392B] uppercase tracking-wider block mb-1">
            Store Manager
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Welcome, Mummy Olubunmi
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl">
            Here is a simple summary of the products currently in your Harmony Hub store.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F392B] hover:bg-[#0b2c21] text-white text-sm font-semibold transition shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Add a Product</span>
          </Link>

          <button
            onClick={loadData}
            disabled={loading}
            className="p-3 rounded-xl border border-[#E2E8F0] bg-white text-slate-600 hover:bg-slate-50 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <Link
          href="/admin/products"
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#0F392B] transition group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Products</span>
            <Package className="w-4 h-4 text-[#0F392B]" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalProducts}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>View all products</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </p>
        </Link>

        {/* Published on Website */}
        <Link
          href="/admin/products"
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-emerald-500 transition group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700">
            <span>Visible on Website</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {loading ? "..." : publishedProducts}
          </div>
          <p className="text-xs text-emerald-600 mt-1">
            Shoppers can buy these now
          </p>
        </Link>

        {/* Hidden Drafts */}
        <Link
          href="/admin/products"
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-amber-500 transition group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Hidden / Drafts</span>
            <Eye className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {loading ? "..." : draftProducts}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Not visible on the website
          </p>
        </Link>

        {/* Out of Stock */}
        <Link
          href="/admin/products"
          className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-red-500 transition group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-red-700">
            <span>Out of Stock</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">
            {loading ? "..." : outOfStockProducts}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {outOfStockProducts === 0 ? "Everything is in stock!" : "Needs restock"}
          </p>
        </Link>
      </div>

      {/* Quick Access List */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Products
            </h2>
            <p className="text-xs text-slate-500">
              Click any product to edit its price, change its picture, or update its details.
            </p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-semibold text-[#0F392B] hover:underline flex items-center gap-1"
          >
            <span>See all {totalProducts} products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {products.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-xl transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
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
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                      No img
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {p.category} • <strong className="text-slate-800">{formatNaira(p.price)}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    p.inStock
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {p.inStock ? "Available" : "Out of Stock"}
                </span>

                <Link
                  href={`/admin/products?edit=${p.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
