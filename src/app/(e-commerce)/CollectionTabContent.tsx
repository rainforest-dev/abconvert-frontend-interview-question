import { ProductCard } from "@/components";
import { getProductsByCollection } from "@/utils";

interface IProps {
  collection: string;
}

export default function CollectionTabContent({ collection }: IProps) {
  const products = getProductsByCollection(collection);

  return (
    <div className="flex gap-5">
      {products.slice(0, 3).map((product) => (
        <ProductCard
          key={product.name}
          {...product}
          href={`/products/${product.name}`}
        />
      ))}
    </div>
  );
}
