"use client";
import type { IProduct } from "@/types";
import NextImage from "next/image";
import NextLink from "next/link";
import { ChangeEventHandler, useState } from "react";

interface IProps extends IProduct {
  href: string;
}

export default function ProductCard({
  name,
  image,
  price,
  color,
  href,
}: IProps) {
  const [selectedColor, setSelectedColor] = useState(color[0]);

  const handleColorSelected: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div>
      <NextLink href={href}>
        <NextImage
          src={`/product-images/${image}`}
          alt={`${name} image`}
          width={300}
          height={300}
          className="w-full aspect-square object-cover"
        />
      </NextLink>
      <NextLink href={href}>
        <h2>{name}</h2>
        <p>${price}</p>
      </NextLink>
      <fieldset className="flex-row-center gap-2">
        {color.map((color) => (
          <label
            key={color}
            id={`${name}-${color}`}
            className="size-4 rounded-full block has-[:checked]:outline cursor-pointer"
            style={{ backgroundColor: color }}
          >
            <input
              type="radio"
              name={`${name}-${color}`}
              id={`${name}-${color}`}
              value={color}
              checked={selectedColor === color}
              onChange={handleColorSelected}
              className="sr-only"
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
}
