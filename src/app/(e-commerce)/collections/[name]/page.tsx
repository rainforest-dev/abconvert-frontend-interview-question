import {
  createPagination,
  getProductsByCollection,
  getRelatedCollections,
} from "@/utils";
import { ProductCard } from "@/components";
import NextImage from "next/image";
import NextLink from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import CollectionLink from "./CollectionLink";

type Props = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: number; size?: number }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name } = await params;

  if (name === "all") {
    return {
      title: "The Store - Venue Theme Morning",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${name} - Venue Theme Morning`,
    openGraph: {
      images: ["/images/placeholder.jpg", ...previousImages],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { name } = await params;
  const _searchParams = await searchParams;
  const page = _searchParams.page ? Number(_searchParams.page) : 1;
  const size = _searchParams.size ? Number(_searchParams.size) : 18;
  const isAll = name === "all";
  const title = isAll ? "The Store" : name;
  const relatedCollections = getRelatedCollections(name, isAll ? 5 : 4);
  const _products = getProductsByCollection(name);
  const {
    items: products,
    totalItems: length,
    totalPage,
  } = createPagination(_products, page, size);

  return (
    <main className="container">
      <section className="flex-col-center md:flex-row gap-10 text-center">
        <div className="w-4/5 md:w-1/3 flex-col-center gap-4 order-last md:order-first">
          <h1 className="capitalize font-bold text-xl">{title}</h1>
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
      <section className="mt-10">
        <ul className="flex justify-center gap-6 h-25 overflow-auto">
          {!isAll && (
            <CollectionLink
              href="/collections/all"
              src="/images/placeholder.jpg"
              alt="the store image"
            >
              &lt;{" "}
              <span className="underline-decorator after:group-hover:scale-50">
                The Store
              </span>
            </CollectionLink>
          )}
          {relatedCollections.map((collection) => (
            <CollectionLink
              key={collection}
              src="/images/placeholder.jpg"
              alt={`${collection}'s image`}
              href={`/collections/${collection}`}
            >
              <span className="underline-decorator after:group-hover:scale-50">
                {collection}
              </span>
            </CollectionLink>
          ))}
        </ul>
      </section>
      <section className="mt-10">
        <div className="flex mb-4 text-xs text-foreground/50">
          <div className="grow"></div>
          <div>{length} products</div>
        </div>
        <div className="grid grid-cols-3 gap-4 md:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
              href={`/products/${product.name}`}
            />
          ))}
        </div>
        {totalPage > 1 && (
          <div className="mt-6 flex-center gap-2 *:size-8 *:flex-center *:rounded-full hover:*:border hover:*:border-foreground/20">
            {page > 1 && (
              <NextLink href={`/collections/${name}?page=${page - 1}`}>
                &#8592;
              </NextLink>
            )}
            {Array.from({ length: 7 }, (_, i) => {
              const start = Math.max(
                0,
                Math.min(totalPage - 7, 5 * Math.floor(page / 5) - 2)
              );
              const linkPage = start + i + 1;

              return (
                <NextLink
                  key={`${i}-${linkPage}-link`}
                  href={`/collections/${name}?page=${linkPage}`}
                  data-active={page === linkPage ? true : undefined}
                  className="data-[active=true]:bg-foreground/10 data-[active=true]:font-bold"
                >
                  {linkPage}
                </NextLink>
              );
            })}
            {page < totalPage && (
              <NextLink href={`/collections/${name}?page=${page + 1}`}>
                &#8594;
              </NextLink>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
