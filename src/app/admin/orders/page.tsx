"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Phone,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { Order } from "@/lib/orders";
import { formatNaira } from "@/lib/formatters";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch orders:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchRef = o.orderReference.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      if (!matchRef && !matchName && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Customer Orders & Enquiries
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real orders captured through the store checkout before dispatching to WhatsApp.
          </p>
        </div>

        <button
          onClick={loadOrders}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
          <span className="text-xs text-slate-500 font-medium">Total Orders</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
          <span className="text-xs text-amber-600 font-medium">Pending Follow-up</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {orders.filter((o) => o.status === "pending").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
          <span className="text-xs text-blue-600 font-medium">In Processing</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {orders.filter((o) => o.status === "processing").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
          <span className="text-xs text-emerald-600 font-medium">Completed</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {orders.filter((o) => o.status === "completed").length}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E2E8F0]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone number, or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0F392B]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F392B] mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading customer orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            {orders.length === 0 ? "No Customer Orders Yet" : "No Orders Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            {orders.length === 0
              ? "Harmony Hub uses a WhatsApp-assisted checkout process. When customers add items to their bag and proceed to checkout, their order details are stored here with direct links to chat with them on WhatsApp."
              : "No orders match your current filter. Try clearing the search term or status filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const cleanPhone = order.customer.phone.replace(/[^0-9]/g, "");
            const waPhone = cleanPhone.startsWith("0") ? `234${cleanPhone.slice(1)}` : cleanPhone;
            const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
              `Hello ${order.customer.fullName}, thank you for your order (${order.orderReference}) with Harmony Hub!`
            )}`;

            return (
              <div
                key={order.id}
                className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#0F392B]">
                      {order.orderReference}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(order.createdAt).toLocaleString("en-NG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as any)}
                      disabled={updatingId === order.id}
                      className="bg-[#F8FAFC] border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Customer Info */}
                  <div className="md:col-span-4 space-y-1.5">
                    <p className="font-semibold text-slate-900 text-sm">
                      {order.customer.fullName}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.customer.phone}</span>
                    </p>
                    <p className="flex items-start gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {order.customer.fulfillmentMethod === "delivery"
                          ? `${order.customer.deliveryAddress}, ${order.customer.cityArea}`
                          : "Collection at Harmony Hub Atelier, Ibadan"}
                      </span>
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="md:col-span-6 space-y-1.5">
                    <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider block">
                      Ordered Items:
                    </span>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex items-center justify-between text-slate-700">
                          <span>
                            {item.quantity}x {item.name}
                            {item.color && ` (${item.color})`}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {formatNaira(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex flex-col justify-end text-right">
                    <span className="text-[11px] text-slate-400">Total Subtotal</span>
                    <span className="text-base font-bold text-[#0F172A]">
                      {formatNaira(order.subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
