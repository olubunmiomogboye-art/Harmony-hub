"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck, MessageCircle, AlertTriangle } from "lucide-react";
import { Product } from "@/types/product";
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
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || ""
  );
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.options?.[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || ""
  );
  const [isAdded, setIsAdded] = useState(false);

  const isOutOfStock = !product.inStock;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      return;
    }
    const variantOrSize = selectedSize || selectedVariant || undefined;
    addToCart(
      product,
      quantity,
      variantOrSize,
      selectedColor || undefined
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Harmony Hub, I would like to enquire about "${product.name}" (${formatNaira(product.price)})${
      selectedSize ? ` in size ${selectedSize}` : ""
    }${selectedColor ? ` in colour ${selectedColor}` : ""}. Is it available?`
  );
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348165982112"}?text=${whatsappMessage}`;

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
              unoptimized={product.image?.startsWith("data:") || product.image?.startsWith("blob:") ? true : undefined}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#183C32] text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-xs shadow-sm">
                {product.badge}
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute top-4 right-4 bg-red-700 text-white text-xs uppercase font-bold tracking-widest px-3 py-1.5 rounded-xs shadow-md">
                Out of Stock
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
            {product.description && product.description !== product.shortDescription && (
              <p className="text-xs text-[#666D65] leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Sizes Selector (if product has sizes) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                  Available Sizes
                </label>
                <span className="text-xs text-[#20211E] font-medium">
                  {selectedSize ? `Selected: ${selectedSize}` : "Select a size"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition ${
                      selectedSize === sz
                        ? "bg-[#183C32] text-white border-[#183C32] shadow-xs"
                        : "bg-white text-[#4B5563] border-[#D1C7B7] hover:border-[#183C32]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colour Swatch Selector (if product has colors) */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#183C32]">
                  Available Colours
                </label>
                <span className="text-xs text-[#20211E] font-medium">
                  {selectedColor ? selectedColor : "Choose a colour"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-xs border text-xs font-medium transition ${
                        isSelected
                          ? "border-[#183C32] bg-[#F7F6F4] text-[#183C32] shadow-xs"
                          : "border-[#E5E5E5] bg-white text-[#4B5563] hover:border-[#183C32]"
                      }`}
                    >
                      {c.hex && (
                        <span
                          className={`w-3.5 h-3.5 rounded-full border border-black/15 shrink-0 ${
                            isSelected ? "ring-2 ring-offset-1 ring-[#183C32]" : ""
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Availability / Stock Status */}
          <div className="flex items-center gap-2 text-xs">
            {isOutOfStock ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="text-red-700 font-semibold">
                  Currently Out of Stock
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-emerald-800 font-medium">
                  In Stock ({product.stockCount} available)
                </span>
              </>
            )}
          </div>

          {/* Purchasing Controls */}
          <div className="pt-4 border-t border-[#DCDDD4] space-y-4">
            {isOutOfStock ? (
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xs text-xs uppercase tracking-widest font-semibold bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Item Currently Out of Stock</span>
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xs text-xs uppercase tracking-widest font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Me on WhatsApp When Restocked</span>
                </a>
              </div>
            ) : (
              <>
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
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </>
            )}
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
              <span>Delivery in Ibadan & Nationwide</span>
            </div>
            <p className="leading-relaxed">
              After placing an order, our concierge team confirms your delivery address, package options, and delivery timing with you directly on WhatsApp.
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
