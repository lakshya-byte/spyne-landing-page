"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

const COLORS = [
  { name: "Obsidian Black", value: "#050505" },
  { name: "Glacier White", value: "#e5e7eb" },
  { name: "Rosso Red", value: "#ef4444" },
  { name: "Liquid Silver", value: "#94a3b8" },
  { name: "Cobalt Blue", value: "#0ea5e9" },
];

const colorStore = {
  color: COLORS[0].value,
  listeners: new Set<(c: string) => void>(),
  subscribe(fn: (c: string) => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  },
  setColor(c: string) {
    this.color = c;
    this.listeners.forEach((fn) => fn(c));
  },
};

export default function ColorPicker() {
  const [visible, setVisible] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0].value);

  useEffect(() => {
    return scrollStore.subscribe((p) => {
      // Visible only during segment 5 -> 6
      setVisible(p >= 5 && p < 6.5);
    });
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center animate-fade-in">
      <p className="text-sm font-medium text-white/70 mb-4 uppercase tracking-widest">
        Select Color
      </p>
      <div className="glass-panel px-6 py-3 rounded-full flex gap-4">
        {COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => {
              setActiveColor(c.value);
              colorStore.setColor(c.value);
            }}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              activeColor === c.value
                ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
            }`}
            style={{ backgroundColor: c.value }}
            title={c.name}
            aria-label={`Select ${c.name}`}
          />
        ))}
      </div>
    </div>
  );
}
