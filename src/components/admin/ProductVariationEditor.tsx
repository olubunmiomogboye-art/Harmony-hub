"use client";

import React, { useState } from "react";
import { Check, X, Plus, AlertCircle, Layers } from "lucide-react";

export interface ColorItem {
  name: string;
  hex?: string;
  inStock?: boolean;
}

interface ProductVariationEditorProps {
  sizes: string[];
  onChangeSizes: (sizes: string[]) => void;
  unavailableSizes: string[];
  onChangeUnavailableSizes: (unavailable: string[]) => void;
  colors: ColorItem[];
  onChangeColors: (colors: ColorItem[]) => void;
  combinationAvailability: Record<string, boolean>;
  onChangeCombinationAvailability: (combos: Record<string, boolean>) => void;
  inStock: boolean;
  onChangeInStock: (inStock: boolean) => void;
}

export default function ProductVariationEditor({
  sizes,
  onChangeSizes,
  unavailableSizes,
  onChangeUnavailableSizes,
  colors,
  onChangeColors,
  combinationAvailability,
  onChangeCombinationAvailability,
  inStock,
  onChangeInStock,
}: ProductVariationEditorProps) {
  const [sizesInput, setSizesInput] = useState<string>(sizes.join(", "));
  const [colorsInput, setColorsInput] = useState<string>(
    colors.map((c) => c.name).join(", ")
  );
  const [activeColorTab, setActiveColorTab] = useState<string>(
    colors[0]?.name || ""
  );

  // Sync raw string sizes when input changes
  const handleSizesBlur = () => {
    const parsed = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChangeSizes(parsed);
  };

  // Sync raw string colors when input changes
  const handleColorsBlur = () => {
    const names = colorsInput
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const updated = names.map((name) => {
      const existing = colors.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      return existing || { name, inStock: true };
    });

    onChangeColors(updated);
    if (updated.length > 0 && (!activeColorTab || !names.includes(activeColorTab))) {
      setActiveColorTab(updated[0].name);
    }
  };

  // Toggle single size availability
  const toggleSizeAvailability = (sz: string) => {
    const isCurrentlyUnavailable = unavailableSizes.includes(sz);
    if (isCurrentlyUnavailable) {
      onChangeUnavailableSizes(unavailableSizes.filter((s) => s !== sz));
    } else {
      onChangeUnavailableSizes([...unavailableSizes, sz]);
    }
  };

  // Toggle single color availability
  const toggleColorAvailability = (colorName: string) => {
    const updated = colors.map((c) => {
      if (c.name.toLowerCase() === colorName.toLowerCase()) {
        const current = c.inStock !== false;
        return { ...c, inStock: !current };
      }
      return c;
    });
    onChangeColors(updated);
  };

  // Toggle size availability for a specific color
  const toggleCombinationAvailability = (colorName: string, sizeName: string) => {
    const key = `${colorName}-${sizeName}`;
    const currentExplicit = combinationAvailability[key];
    const isCurrentlyAvailable =
      currentExplicit !== undefined
        ? currentExplicit
        : (colors.find((c) => c.name === colorName)?.inStock !== false) &&
          !unavailableSizes.includes(sizeName);

    const nextCombos = {
      ...combinationAvailability,
      [key]: !isCurrentlyAvailable,
    };
    onChangeCombinationAvailability(nextCombos);
  };

  const hasSizes = sizes.length > 0;
  const hasColors = colors.length > 0;

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4 text-[#0F392B]" />
          <h4 className="text-sm font-bold text-slate-900">
            Product Sizes & Colours
          </h4>
        </div>
        <p className="text-xs text-slate-500">
          Add any available sizes or colours for this item, then easily tap to mark what is Available or Out of Stock.
        </p>
      </div>

      {/* Inputs for Sizes & Colours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Sizes Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Available Sizes (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Size 40, Size 41, Size 42, Size 43"
            value={sizesInput}
            onChange={(e) => setSizesInput(e.target.value)}
            onBlur={handleSizesBlur}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-[#0F392B]"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Separate with commas</span>
            {sizes.length > 0 && (
              <span className="text-[#0F392B] font-semibold">
                {sizes.length} {sizes.length === 1 ? "size" : "sizes"} entered
              </span>
            )}
          </div>
        </div>

        {/* Colours Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Available Colours (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Black, Brown, Navy Blue, White"
            value={colorsInput}
            onChange={(e) => setColorsInput(e.target.value)}
            onBlur={handleColorsBlur}
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-[#0F392B]"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Separate with commas</span>
            {colors.length > 0 && (
              <span className="text-[#0F392B] font-semibold">
                {colors.length} {colors.length === 1 ? "colour" : "colours"} entered
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ADAPTIVE AVAILABILITY CONTROLS */}

      {/* Case 1: Product has BOTH Sizes and Colours */}
      {hasSizes && hasColors && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#0F392B] block">
              Size & Colour Availability
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Select a colour tab below to view and set which sizes are in stock for that colour:
            </p>
          </div>

          {/* Colour Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            {colors.map((c) => {
              const isSelected = activeColorTab === c.name;
              const isColorInStock = c.inStock !== false;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActiveColorTab(c.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                    isSelected
                      ? "bg-[#0F392B] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{c.name}</span>
                  {!isColorInStock && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-red-700 font-bold">
                      Out of Stock
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Colour Size Combinations */}
          {activeColorTab && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Sizes for {activeColorTab}:
                </span>
                <button
                  type="button"
                  onClick={() => toggleColorAvailability(activeColorTab)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                    colors.find((c) => c.name === activeColorTab)?.inStock !== false
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                      : "text-red-700 bg-red-50 border-red-200"
                  }`}
                >
                  {colors.find((c) => c.name === activeColorTab)?.inStock !== false
                    ? "✓ Entire colour is In Stock"
                    : "✕ Entire colour is Out of Stock"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sizes.map((sz) => {
                  const key = `${activeColorTab}-${sz}`;
                  const explicit = combinationAvailability[key];
                  const isAvailable =
                    explicit !== undefined
                      ? explicit
                      : (colors.find((c) => c.name === activeColorTab)?.inStock !== false) &&
                        !unavailableSizes.includes(sz);

                  return (
                    <div
                      key={sz}
                      className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-slate-800">
                        {sz}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCombinationAvailability(activeColorTab, sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isAvailable
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                        }`}
                      >
                        {isAvailable ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Case 2: Product has SIZES ONLY (No Colours) */}
      {hasSizes && !hasColors && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#0F392B] block">
              Size Availability
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Tap any size to toggle between Available and Out of Stock:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sizes.map((sz) => {
              const isAvailable = !unavailableSizes.includes(sz);
              return (
                <div
                  key={sz}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">
                    {sz}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSizeAvailability(sz)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isAvailable
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Out of Stock</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Case 3: Product has COLOURS ONLY (No Sizes) */}
      {!hasSizes && hasColors && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#0F392B] block">
              Colour Availability
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Tap any colour to toggle between Available and Out of Stock:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {colors.map((c) => {
              const isAvailable = c.inStock !== false;
              return (
                <div
                  key={c.name}
                  className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {c.hex && (
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span className="text-xs font-bold text-slate-800">
                      {c.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleColorAvailability(c.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isAvailable
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Out of Stock</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Case 4: No Sizes and No Colours */}
      {!hasSizes && !hasColors && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800">
              General Product Availability
            </p>
            <p className="text-[11px] text-slate-500">
              This product does not have separate sizes or colours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChangeInStock(!inStock)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              inStock
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            }`}
          >
            {inStock ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Available</span>
              </>
            ) : (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Out of Stock</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
