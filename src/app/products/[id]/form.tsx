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
      <div className="flex flex-col gap-2">
        <p>Color: ${selectedColor}</p>
        <ColorPicker
          value={selectedColor}
          onChange={setSelectedColor}
          color={color}
          name={name}
          className="h-5"
        />
      </div>
      <div className="flex flex-col gap-4">
        <button className="btn btn-outline btn-stretch">Add to cart</button>
        <button className="btn btn-primary btn-stretch">Buy it now</button>
      </div>
    </form>
  );
}
