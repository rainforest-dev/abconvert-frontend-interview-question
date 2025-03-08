import type { IProduct } from "@/types";
import _products from "@assets/products.json";

export const products = _products as IProduct[];

export const getProductsByCollection = (collection: string): IProduct[] =>
  products.filter((product) => product.collection === collection);

export const getProductSuggestions = (product: IProduct) => {
  const products = getProductsByCollection(product.collection);
  const suggestions = products.filter(
    (p) => p.name !== product.name && Math.random() > 0.5
  );
  return suggestions.slice(0, 3);
};

export const getProductById = (id: string) =>
  products.find((product) => product.name === id);

export const getCollections = () => {
  const _collections = new Set<string>();
  products.forEach((product) => {
    _collections.add(product.collection);
  });
  return Array.from(_collections);
};

export const collections = getCollections();
