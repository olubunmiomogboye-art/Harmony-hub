"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  max?: number;
  min?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  max = 99,
  min = 1,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val < min) onChange(min);
      else if (val > max) onChange(max);
      else onChange(val);
    }
  };

  return (
    <div className="flex items-center border border-[#D1C7B7] rounded-xs bg-white h-11 w-fit">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="px-3.5 h-full flex items-center justify-center text-[#4B5563] hover:text-[#183C32] hover:bg-[#EEF1E9] disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleManualChange}
        min={min}
        max={max}
        aria-label="Item quantity"
        className="w-12 text-center text-sm font-semibold text-[#183C32] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="px-3.5 h-full flex items-center justify-center text-[#4B5563] hover:text-[#183C32] hover:bg-[#EEF1E9] disabled:opacity-30 disabled:hover:bg-transparent transition"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
