"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    new Set(defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : [])
  );

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className="divide-y divide-[#DCDDD4] border-y border-[#DCDDD4]">
      {items.map((item, index) => {
        const isOpen = allowMultiple ? openIndices.has(index) : openIndex === index;
        return (
          <div key={item.id} className="py-5">
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left focus:outline-none group gap-4"
            >
              <span className="font-serif text-lg sm:text-xl font-medium text-[#183C32] group-hover:text-[#B96F52] transition">
                {item.question}
              </span>
              <span className="w-8 h-8 rounded-full bg-[#EEF1E9] group-hover:bg-[#DCDDD4] flex items-center justify-center shrink-0 transition text-[#183C32]">
                {isOpen ? (
                  <Minus className="w-4 h-4 stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[1.5]" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="pt-4 pr-12 text-sm sm:text-base text-[#4B5563] leading-relaxed animate-in fade-in duration-200">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
