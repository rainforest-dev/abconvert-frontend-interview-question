"use client";
import type { IProduct } from "@/types";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { ColorPicker } from "@/components";

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
      <ColorPicker
        value={selectedColor}
        onChange={setSelectedColor}
        color={color}
        name={name}
        className="h-4"
      />
    </div>
  );
}
