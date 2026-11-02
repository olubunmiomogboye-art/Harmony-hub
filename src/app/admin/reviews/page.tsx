"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Plus, Trash2, Eye } from "lucide-react";

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  content: string;
  date: string;
  isPublished: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Mrs. Folashade Adebayo",
    location: "Bodija, Ibadan",
    rating: 5,
    content: "The quality SMP food storage containers exceeded my expectations! Very airtight and sturdy. Delivered promptly within 24 hours in Ibadan.",
    date: "October 20, 2026",
    isPublished: true,
  },
  {
    id: "rev-2",
    author: "Dr. Babatunde O.",
    location: "Oluyole Estate, Ibadan",
    rating: 5,
    content: "Authentic Gino Ventini leather shoes. Exactly as shown in the picture, no stories or surprises. I will definitely be ordering again.",
    date: "October 24, 2026",
    isPublished: true,
  },
  {
    id: "rev-3",
    author: "Grace M.",
    location: "Lekki, Lagos",
    rating: 5,
    content: "I bought the Pink Tulle Skirt and Mary Jane dressing shoes for my 8-year-old daughter. The fabric is soft and lovely. Fast inter-state delivery!",
    date: "October 28, 2026",
    isPublished: true,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const togglePublish = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPublished: !r.isPublished } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Customer Testimonials & Reviews
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage client testimonials displayed across the Harmony Hub storefront.
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                    rev.isPublished
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {rev.isPublished ? "Visible" : "Hidden"}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "{rev.content}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-xs text-slate-900">{rev.author}</p>
                <p className="text-[11px] text-slate-400">
                  {rev.location} • {rev.date}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => togglePublish(rev.id)}
                  className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                    rev.isPublished
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                  }`}
                  title="Toggle display on storefront"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                  title="Delete review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
