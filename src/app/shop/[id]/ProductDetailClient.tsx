"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Truck,
  MessageCircle,
  AlertTriangle,
  Loader2,
  PackageOpen,
} from "lucide-react";
import {
  Product,
  isSizeAvailable,
  isColorAvailable,
  isCombinationAvailable,
  hasAnyVariationAvailable,
} from "@/types/product";
import { formatNaira } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  initialProduct: Product | null;
  initialRelatedProducts?: Product[];
  productId: string;
}

export default function ProductDetailClient({
  initialProduct,
  initialRelatedProducts = [],
  productId,
}: ProductDetailClientProps) {
  const { addToCart, openDrawer } = useCart();
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(initialRelatedProducts);
  const [loading, setLoading] = useState<boolean>(!initialProduct);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(1);

  // Initialize selected color & size to the first available options
  const initialAvailableColor =
    initialProduct?.colors?.find((c) => c.inStock !== false)?.name ||
    initialProduct?.colors?.[0]?.name ||
    "";

  const initialAvailableSize =
    initialProduct?.sizes?.find((s) =>
      initialProduct ? isCombinationAvailable(initialProduct, initialAvailableColor || undefined, s) : true
    ) ||
    initialProduct?.sizes?.[0] ||
    "";

  const [selectedSize, setSelectedSize] = useState<string>(initialAvailableSize);
  const [selectedColor, setSelectedColor] = useState<string>(initialAvailableColor);
  const [isAdded, setIsAdded] = useState(false);

  // If server didn't find product (e.g. cold start sync gap), fetch via API
  useEffect(() => {
    if (!initialProduct && productId) {
      let isMounted = true;
      async function fetchProduct() {
        try {
          setLoading(true);
          const res = await fetch(`/api/products/${encodeURIComponent(productId)}`);
          if (res.ok) {
            const data = await res.json();
            if (isMounted && data.success && data.data && data.data.isPublished) {
              const liveProd: Product = data.data;
              setProduct(liveProd);

              const firstColor =
                liveProd.colors?.find((c) => c.inStock !== false)?.name ||
                liveProd.colors?.[0]?.name ||
                "";
              const firstSize =
                liveProd.sizes?.find((s) =>
                  isCombinationAvailable(liveProd, firstColor || undefined, s)
                ) ||
                liveProd.sizes?.[0] ||
                "";

              setSelectedColor(firstColor);
              setSelectedSize(firstSize);

              // Fetch related products
              try {
                const relRes = await fetch(
                  `/api/products?category=${encodeURIComponent(liveProd.categorySlug)}`
                );
                if (relRes.ok) {
                  const relData = await relRes.json();
                  if (isMounted && relData.success && Array.isArray(relData.data)) {
                    setRelatedProducts(
                      relData.data.filter((p: Product) => p.id !== liveProd.id).slice(0, 4)
                    );
                  }
                }
              } catch {
                // ignore
              }
              return;
            }
          }
          if (isMounted) setNotFound(true);
        } catch {
          if (isMounted) setNotFound(true);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
      fetchProduct();
      return () => {
        isMounted = false;
      };
    }
  }, [initialProduct, productId]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#183C32] animate-spin" />
        <p className="text-sm text-[#4B5563] font-medium">Loading product details...</p>
      </div>
    );
  }

  // Not Found state
  if (notFound || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F3F4F6] text-[#4B5563] mx-auto flex items-center justify-center">
          <PackageOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#183C32]">Product Not Found</h1>
          <p className="text-sm text-[#666D65] max-w-md mx-auto leading-relaxed">
            We couldn&apos;t find the product you&apos;re looking for. It may have been relocated, renamed, or is currently unpublished.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-xs bg-[#183C32] hover:bg-[#B96F52] text-white text-xs uppercase tracking-widest font-semibold transition"
          >
            Browse All Products
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xs border border-[#DCDDD4] hover:border-[#183C32] text-[#183C32] text-xs uppercase tracking-widest font-semibold transition"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const isProductOutOfStock = !product.inStock || !hasAnyVariationAvailable(product);
  const isSelectedOptionAvailable = !isProductOutOfStock && isCombinationAvailable(
    product,
    selectedColor || undefined,
    selectedSize || undefined
  );

  // When changing color, if previous size is unavailable in this color, select first available size
  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
    if (product.sizes && product.sizes.length > 0) {
      const isCurrentSizeStillAvailable = isCombinationAvailable(product, colorName, selectedSize);
      if (!isCurrentSizeStillAvailable) {
        const nextAvailSize = product.sizes.find((s) =>
          isCombinationAvailable(product, colorName, s)
        );
        if (nextAvailSize) setSelectedSize(nextAvailSize);
      }
    }
  };

  const handleAddToCart = () => {
    if (isProductOutOfStock || !isSelectedOptionAvailable) return;
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      return;
    }
    addToCart(
      product,
      quantity,
      selectedSize || undefined,
      selectedColor || undefined
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    isSelectedOptionAvailable
      ? `Hello Harmony Hub, I would like to enquire about "${product.name}" (${formatNaira(product.price)})${
          selectedSize ? ` in size ${selectedSize}` : ""
        }${selectedColor ? ` in colour ${selectedColor}` : ""}. Is it available?`
      : `Hello Harmony Hub, I noticed that "${product.name}"${
          selectedSize ? ` in size ${selectedSize}` : ""
        }${selectedColor ? ` in colour ${selectedColor}` : ""} is currently out of stock. When will it be available?`
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
            {isProductOutOfStock && (
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
                  const isColInStock = isColorAvailable(product, c.name);

                  return (
                    <button
                      key={c.name}
                      type="button"
                      disabled={!isColInStock}
                      onClick={() => handleSelectColor(c.name)}
                      title={isColInStock ? c.name : `${c.name} (Out of Stock)`}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-xs border text-xs font-medium transition ${
                        !isColInStock
                          ? "border-gray-200 bg-gray-100 text-gray-400 opacity-60 line-through cursor-not-allowed"
                          : isSelected
                          ? "border-[#183C32] bg-[#F7F6F4] text-[#183C32] shadow-xs cursor-pointer font-bold"
                          : "border-[#E5E5E5] bg-white text-[#4B5563] hover:border-[#183C32] cursor-pointer"
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
                      {!isColInStock && (
                        <span className="text-[10px] text-red-600 no-underline font-semibold">
                          (Out of Stock)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                {product.sizes.map((sz) => {
                  const isSzInStock = isCombinationAvailable(
                    product,
                    selectedColor || undefined,
                    sz
                  );
                  const isSelected = selectedSize === sz;

                  if (!isSzInStock) {
                    return (
                      <button
                        key={sz}
                        type="button"
                        disabled
                        title={`${sz} is currently out of stock`}
                        className="px-3 py-1.5 text-xs font-medium rounded-xs border border-dashed border-gray-300 text-gray-400 bg-gray-50 line-through cursor-not-allowed flex items-center gap-1"
                      >
                        <span>{sz}</span>
                        <span className="text-[9px] no-underline text-red-500 font-normal">
                          (Out of stock)
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xs border transition cursor-pointer ${
                        isSelected
                          ? "bg-[#183C32] text-white border-[#183C32] shadow-xs"
                          : "bg-white text-[#4B5563] border-[#D1C7B7] hover:border-[#183C32]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Availability / Stock Status Indicator */}
          <div className="flex items-center gap-2 text-xs">
            {isProductOutOfStock ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="text-red-700 font-semibold">
                  Entire Product Currently Out of Stock
                </span>
              </>
            ) : !isSelectedOptionAvailable ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-amber-800 font-semibold">
                  Selected size/colour combination is Out of Stock
                </span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-emerald-800 font-medium">
                  In Stock & Ready for Delivery
                </span>
              </>
            )}
          </div>

          {/* Purchasing Controls */}
          <div className="pt-4 border-t border-[#DCDDD4] space-y-4">
            {isProductOutOfStock || !isSelectedOptionAvailable ? (
              <div className="space-y-3">
                <button
                  disabled
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-xs text-xs uppercase tracking-widest font-semibold bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>
                    {isProductOutOfStock ? "Product Out of Stock" : "Selected Option Out of Stock"}
                  </span>
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
                      max={product.stockCount || 20}
                      min={1}
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-transparent select-none font-semibold block">
                      Action
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className={`w-full h-11 flex items-center justify-center gap-2 rounded-xs text-xs uppercase tracking-widest font-semibold transition shadow-sm cursor-pointer ${
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
                    className="text-[#183C32] hover:text-[#B96F52] font-semibold underline underline-offset-4 decoration-[#B96F52] cursor-pointer"
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
