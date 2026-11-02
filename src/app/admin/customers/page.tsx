"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Phone, Mail, MapPin, MessageSquare, ShoppingBag, Loader2 } from "lucide-react";
import { Order } from "@/lib/orders";
import { formatNaira } from "@/lib/formatters";

interface CustomerAggregate {
  name: string;
  phone: string;
  email?: string;
  location: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerAggregate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          const map = new Map<string, CustomerAggregate>();

          data.data.forEach((order: Order) => {
            const key = order.customer.phone.trim();
            const existing = map.get(key);
            if (existing) {
              existing.orderCount += 1;
              existing.totalSpent += order.subtotal || 0;
              if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
                existing.lastOrderDate = order.createdAt;
              }
            } else {
              map.set(key, {
                name: order.customer.fullName,
                phone: order.customer.phone,
                email: order.customer.email,
                location: order.customer.cityArea || "Ibadan",
                orderCount: 1,
                totalSpent: order.subtotal || 0,
                lastOrderDate: order.createdAt,
              });
            }
          });

          setCustomers(Array.from(map.values()));
        }
      } catch (e) {
        console.error("Failed to load customers:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      c.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
          Customer Directory
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Real customer contacts and purchase records compiled from completed checkout inquiries.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-3 rounded-2xl border border-[#E2E8F0]">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name, phone or neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B]"
          />
        </div>
      </div>

      {/* Customer List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading customer directory...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            {customers.length === 0 ? "No Customer Records Yet" : "No Customers Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            {customers.length === 0
              ? "When shoppers checkout items on the Harmony Hub storefront, their details are compiled here into customer profiles."
              : "No customers matched your search."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-center">Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4 text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredCustomers.map((c, i) => {
                const cleanPhone = c.phone.replace(/[^0-9]/g, "");
                const waPhone = cleanPhone.startsWith("0") ? `234${cleanPhone.slice(1)}` : cleanPhone;
                const waUrl = `https://wa.me/${waPhone}`;

                return (
                  <tr key={i} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">
                      {c.phone}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {c.location}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      {c.orderCount}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {formatNaira(c.totalSpent)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-[11px] transition"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
