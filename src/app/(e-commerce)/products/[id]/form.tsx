"use client";
import { ColorPicker } from "@/components";
import type { IProduct } from "@/types";
import { useState } from "react";

export default function Form({
  color,
  name,
}: Pick<IProduct, "color" | "name">) {
  const [selectedColor, setSelectedColor] = useState(color[0]);

  return (
    <form>
      <div className="flex flex-col gap-2 mb-8 text-xs">
        <p className="font-bold">
          Color: <span className="text-foreground/50">{selectedColor}</span>
        </p>
        <ColorPicker
          value={selectedColor}
          onChange={setSelectedColor}
          color={color}
          name={name}
          className="h-5 px-1.5"
        />
      </div>
      <div className="text-xs flex-row-center gap-1 mb-8">
        <span className="relative inline-flex size-2">
          <span className="animate-ping absolute inline-flex size-full rounded-full bg-red-400 opacity-75"></span>
          <span className="rounded-full size-full bg-red-500"></span>
        </span>
        Only 3 in stock
      </div>
      <div className="flex flex-col gap-4">
        <button className="btn btn-outline btn-stretch">Add to cart</button>
        <button className="btn btn-primary btn-stretch">Buy it now</button>
      </div>
    </form>
  );
}
