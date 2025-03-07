import { collections } from "@/utils";
import NextImage from "next/image";
import NextLink from "next/link";

export default function Page() {
  return (
    <main className="container mx-auto">
      <h1 className="text-center text-4xl mb-4">Collections</h1>
      <section className="grid grid-cols-3 gap-4">
        {collections.map((collection) => (
          <NextLink
            key={collection}
            href={`/collections/${collection.toLowerCase()}`}
            className="relative overflow-hidden w-full aspect-square z-0 flex-center group"
          >
            <NextImage
              src="/images/placeholder.jpg"
              alt={collection}
              width={300}
              height={300}
              objectFit="cover"
              className="absolute size-full brightness-75"
            />
            <div className="text-background z-10 flex-col-center gap-4">
              <h2 className="text-2xl font-semibold">{collection}</h2>
              <hr className="w-10" />
              <button className="btn btn-outline group-hover:block hidden">
                View
              </button>
            </div>
          </NextLink>
        ))}
      </section>
    </main>
  );
}
