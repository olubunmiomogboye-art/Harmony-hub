"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Package,
  Boxes,
  DollarSign,
  Layers,
  ShoppingBag,
  Loader2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/formatters";

export default function AdminAnalyticsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [prodRes, ordRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/orders"),
        ]);

        if (prodRes.ok) {
          const pd = await prodRes.json();
          if (pd.success) setProducts(pd.data);
        }
        if (ordRes.ok) {
          const od = await ordRes.json();
          if (od.success) setOrders(od.data);
        }
      } catch (e) {
        console.error("Failed to load analytics data:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Compute real catalog figures
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.inStock).length;
  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stockCount || 0),
    0
  );
  const averagePrice =
    totalProducts > 0
      ? Math.round(products.reduce((sum, p) => sum + (p.price || 0), 0) / totalProducts)
      : 0;

  const minPrice = products.length > 0 ? Math.min(...products.map((p) => p.price)) : 0;
  const maxPrice = products.length > 0 ? Math.max(...products.map((p) => p.price)) : 0;

  // By Department
  const deptCounts: Record<string, { count: number; totalVal: number }> = {};
  products.forEach((p) => {
    const cat = p.category || "Uncategorized";
    if (!deptCounts[cat]) deptCounts[cat] = { count: 0, totalVal: 0 };
    deptCounts[cat].count += 1;
    deptCounts[cat].totalVal += (p.price || 0) * (p.stockCount || 0);
  });

  // Order totals
  const totalOrderRevenue = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Store Analytics & Valuation
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Real metrics computed directly from active inventory and verified customer orders.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Computing live metrics...</p>
        </div>
      ) : (
        <>
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0]">
              <span className="text-xs text-slate-500 font-medium">Total Inventory Value</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {formatNaira(totalInventoryValue)}
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                Sum of price × available stock
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0]">
              <span className="text-xs text-slate-500 font-medium">Average Item Price</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {formatNaira(averagePrice)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Range: {formatNaira(minPrice)} — {formatNaira(maxPrice)}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0]">
              <span className="text-xs text-slate-500 font-medium">Stock Availability</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {totalProducts > 0 ? Math.round((inStock / totalProducts) * 100) : 0}%
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                {inStock} of {totalProducts} items in stock
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0]">
              <span className="text-xs text-slate-500 font-medium">Completed Checkout Revenue</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">
                {formatNaira(totalOrderRevenue)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Across {orders.length} customer order requests
              </p>
            </div>
          </div>

          {/* Department Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Valuation */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0]">
              <h2 className="text-sm font-semibold text-[#0F172A] mb-4">
                Departmental Inventory Value
              </h2>
              <div className="space-y-4">
                {Object.entries(deptCounts).map(([dept, data]) => {
                  const pct =
                    totalInventoryValue > 0
                      ? Math.round((data.totalVal / totalInventoryValue) * 100)
                      : 0;
                  return (
                    <div key={dept} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{dept}</span>
                        <span className="text-slate-600 font-mono">
                          {formatNaira(data.totalVal)} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0F392B] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {data.count} items in collection
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Catalog Health & Publication Status */}
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[#0F172A] mb-4">
                  Catalog Health Summary
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-700">Published to Live Store</span>
                    <span className="font-bold text-[#0F392B]">
                      {products.filter((p) => p.isPublished).length} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-700">Drafts / Unpublished</span>
                    <span className="font-bold text-amber-600">
                      {products.filter((p) => !p.isPublished).length} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-700">Stock Count Under 10</span>
                    <span className="font-bold text-amber-600">
                      {products.filter((p) => p.inStock && (p.stockCount ?? 0) <= 10).length} items
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <span className="text-slate-700">Out of Stock</span>
                    <span className="font-bold text-red-600">
                      {products.filter((p) => !p.inStock).length} items
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All metrics are calculated in real time from your live database.</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
