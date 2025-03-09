import {
  getProductById,
  getProductSuggestions,
  getProductsUserMayAlsoLike,
  productImage,
} from "@/utils";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import Form from "./form";
import { Breadcrumb, ProductCard } from "@/components";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return {};

  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${product.name} - Venue Theme Morning`,
    openGraph: {
      images: [productImage(product.image), ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const crumbs = [
    { name: "Home", path: "/" },
    { name: product.collection, path: `/collections/${product.collection}` },
    { name: product.name, path: `/products/${id}` },
  ];
  const suggestions = getProductSuggestions(product);
  const mayAlsoLike = getProductsUserMayAlsoLike(product);

  return (
    <main className="py-12">
      <Breadcrumb crumbs={crumbs} />
      <section className="flex gap-10 mt-10 md:flex-row flex-col container mx-auto">
        <NextImage
          src={productImage(product.image)}
          alt={`${product.name} image`}
          width={300}
          height={300}
          className="object-cover md:w-1/2 w-full h-min aspect-square"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
          <hr className="divider mt-3.5 mb-5" />
          <p className="text-lg leading-tight mb-6">
            ${product.price}
            <br />
            <span className="text-xs font-extralight">Tax included</span>
          </p>
          <Form name={product.name} color={product.color} size={product.size} />
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-6">Goes well with</h2>
            <div className="flex gap-4">
              {suggestions.map((suggestion) => (
                <ProductCard
                  key={suggestion.name}
                  {...suggestion}
                  href={`/products/${suggestion.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-foreground/5 py-10 mt-10">
        <div className="container mx-auto flex-col-center">
          <h2 className="text-lg font-bold">Crafted for every occasion</h2>
          <hr className="divider mt-3.5 mb-10" />
          <NextImage
            src="/images/placeholder.jpg"
            alt="placeholder"
            width={400}
            height={300}
            className="w-full aspect-video object-cover"
          />
          <div className="flex gap-16 mt-16">
            <div>
              <h3 className="font-bold">Versatile</h3>
              <p className="text-sm">
                Don&apos;t limit yourself with our multifunctional range of
                products.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Weatherproof</h3>
              <p className="text-sm">
                Our gear will protect you from elements, rain or shine.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Dependable</h3>
              <p className="text-sm">
                Don&apos;t worry. Challenge the test of time with our proven
                durability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-col-center mt-10 container mx-auto">
        <h2 className="text-lg font-bold">You may also like</h2>
        <hr className="divider mt-3.5 mb-5" />
        <div className="flex gap-4">
          {mayAlsoLike.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              href={`/products/${product.name}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
