import { getProductsByCollection } from "@/utils";
import { ProductCard } from "@/components";
import NextImage from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const products = getProductsByCollection(name);

  return (
    <main className="container mx-auto flex flex-col gap-20">
      <section className="flex-row-center gap-10">
        <div className="w-2/5 flex-col-center gap-4">
          <h1 className="capitalize font-bold text-4xl">{name}</h1>
          <hr className="w-10" />
          <p>
            Choose well and buy less. We believe in owning fewer, quality things
            and making them last a long time. That’s why if any of our product
            ever breaks down, you can send it back to us and we’ll repair it.
          </p>
        </div>
        <div className="h-96 overflow-hidden grow">
          <NextImage
            src="/images/placeholder.jpg"
            alt="Collection Image"
            width={400}
            height={300}
            className="w-full object-cover"
          />
        </div>
      </section>
      <section className="grid grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            {...product}
            href={`/products/${product.name}`}
          />
        ))}
      </section>
    </main>
  );
}
