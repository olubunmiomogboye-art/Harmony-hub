"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, HelpCircle } from "lucide-react";
import { Product } from "@/data/products";
import { formatNaira } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart, openDrawer } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.options?.[0] || ""
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#4B5563] hover:text-[#183C32] font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Other Products</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#9CA3AF]">
          <Link href="/" className="hover:text-[#183C32]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#183C32]">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#183C32] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Product Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full bg-[#EEF1E9] rounded-xs overflow-hidden border border-[#DCDDD4] shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#183C32] text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-xs">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Purchasing Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-[#DCDDD4] pb-6 space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#B96F52] font-bold">
              <span>{product.category}</span>
              {product.subtitle && (
                <span className="text-[#666D65] font-normal normal-case">
                  {product.subtitle}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#183C32] font-medium leading-tight">
              {product.name}
            </h1>

            <div className="pt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#183C32]">
                {formatNaira(product.price)}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {product.shortDescription}
            </p>
            <p className="text-xs text-[#666D65] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variant Selector (if any) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              {product.variants.map((v) => (
                <div key={v.name} className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                    Select {v.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedVariant(opt)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition ${
                          selectedVariant === opt
                            ? "bg-[#183C32] text-white border-[#183C32]"
                            : "bg-white text-[#4B5563] border-[#D1C7B7] hover:border-[#183C32]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Availability / Stock Status */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-800 font-medium">
              In Stock ({product.stockCount} units available for dispatch)
            </span>
          </div>

          {/* Purchasing Controls */}
          <div className="pt-4 border-t border-[#DCDDD4] space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-[#666D65] font-semibold block">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onChange={setQuantity}
                  max={product.stockCount}
                  min={1}
                />
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-transparent select-none font-semibold block">
                  Action
                </span>
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-11 flex items-center justify-center gap-2 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm ${
                    isAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-[#183C32] hover:bg-[#B96F52] text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Post-add options */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={openDrawer}
                className="text-[#183C32] hover:text-[#B96F52] font-semibold underline underline-offset-4 decoration-[#B96F52]"
              >
                View Bag & Checkout
              </button>
              <Link
                href="/shop"
                className="text-[#666D65] hover:text-[#183C32] transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Specifications list (if any) */}
          {product.specs && product.specs.length > 0 && (
            <div className="pt-6 border-t border-[#DCDDD4] space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-[#183C32] font-bold">
                Product Details & Specifications
              </h4>
              <dl className="grid grid-cols-2 gap-2 text-xs">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="bg-[#F7F4EC] p-2.5 rounded-xs border border-[#DCDDD4]">
                    <dt className="text-[#666D65] font-medium">{spec.label}</dt>
                    <dd className="font-semibold text-[#183C32] mt-0.5">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Quick Assurance */}
          <div className="bg-[#EEF1E9] p-4 rounded-xs border border-[#DCDDD4] space-y-2 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2 text-[#183C32] font-semibold">
              <Truck className="w-4 h-4 text-[#B96F52]" />
              <span>Fulfilment in Ibadan & Nationwide</span>
            </div>
            <p className="leading-relaxed">
              Orders are confirmed directly with our team on WhatsApp to arrange your preferred delivery time or collection.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-[#DCDDD4] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#183C32]">
              Other Items in {product.category}
            </h3>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest font-semibold text-[#183C32] hover:text-[#B96F52] transition"
            >
              Back to Catalogue &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
