import { getProductById } from "@/utils";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import Form from "./form";
import { Breadcrumb } from "@/components";

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

  const crumbs = [
    { name: "Home", href: "/" },
    { name: product.collection, href: `/collections/${product.collection}` },
    { name: product.name, href: `/products/${id}` },
  ];

  return (
    <main className="container mx-auto py-12">
      <Breadcrumb crumbs={crumbs} />
      <section className="flex gap-10 mt-10 md:flex-row flex-col">
        <NextImage
          src={`/product-images/${product.image}`}
          alt={`${product.name} image`}
          width={300}
          height={300}
          className="object-cover md:w-1/2 w-full aspect-square"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
          <hr className="divider mt-3.5 mb-5" />
          <p className="text-lg leading-tight mb-6">
            ${product.price}
            <br />
            <span className="text-xs font-extralight">Tax included</span>
          </p>
          <Form name={product.name} color={product.color} />
        </div>
      </section>
    </main>
  );
}
