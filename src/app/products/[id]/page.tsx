import { getProductById } from "@/utils";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import Form from "./form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }
  return (
    <main className="flex gap-10 container mx-auto">
      <NextImage
        src={`/product-images/${product.image}`}
        alt={`${product.name} image`}
        width={300}
        height={300}
        className="object-cover w-1/2 aspect-square"
      />
      <div className="flex flex-col flex-1">
        <h1>{product.name}</h1>
        <hr />
        <p>
          ${product.price}
          <br />
          Tax included
        </p>
        <Form name={product.name} color={product.color} />
      </div>
    </main>
  );
}
