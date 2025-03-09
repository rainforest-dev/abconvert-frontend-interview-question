"use client";
import type { IProduct } from "@/types";
import NextImage from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { ColorPicker } from "@/components";
import { productImage } from "@/utils";

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
  const [selectedColor, setSelectedColor] = useState<string>("");

  return (
    <div className="text-sm">
      <NextLink href={href}>
        <NextImage
          src={productImage(image)}
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
        className="h-3 mt-3 pl-1"
      />
    </div>
  );
}
