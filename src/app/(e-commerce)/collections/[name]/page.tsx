import { getProductsByCollection } from "@/utils";
import { ProductCard } from "@/components";
import NextImage from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name } = await params;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${name} - Venue Theme Morning`,
    openGraph: {
      images: ["/images/placeholder.jpg", ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const { name } = await params;
  const products = getProductsByCollection(name);
  const length = products.length;

  return (
    <main className="container mx-auto">
      <section className="flex-row-center gap-10">
        <div className="w-1/3 flex-col-center gap-4">
          <h1 className="capitalize font-bold text-xl">{name}</h1>
          <hr className="divider" />
          <p className="text-sm leading-loose">
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
      <div className="flex mb-4 mt-10 text-xs text-foreground/50">
        <div className="grow"></div>
        <div>{length} products</div>
      </div>
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
