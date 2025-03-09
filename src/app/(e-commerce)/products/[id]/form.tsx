"use client";
import { ColorPicker } from "@/components";
import type { IProduct } from "@/types";
import { type ChangeEventHandler, useState } from "react";

export default function Form({
  color,
  size,
  name,
}: Pick<IProduct, "color" | "name" | "size">) {
  const [selectedColor, setSelectedColor] = useState(color[0]);
  const [selectedSize, setSelectedSize] = useState(size[0]);

  const handleSizeSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedSize(e.target.value);
  };

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
      <fieldset className="mb-8 text-xs">
        <div className="flex flex-col gap-2">
          <legend className="font-bold">Size</legend>
          <div className="flex gap-1">
            {size.map((option) => (
              <label
                key={option}
                htmlFor={`${name}-${option}`}
                title={option}
                className="w-11 h-6 text-xs cursor-pointer border border-foreground/30 flex-center 
                        hover:border-foreground has-[:checked]:border-foreground hover:shadow has-[:checked]:shadow"
              >
                {option}
                <input
                  type="radio"
                  name={`${name}-${option}`}
                  id={`${name}-${option}`}
                  checked={selectedSize === option}
                  value={option}
                  onChange={handleSizeSelected}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </fieldset>
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
