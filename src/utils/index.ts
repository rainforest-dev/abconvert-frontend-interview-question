import type { IProduct } from "@/types";
import _products from "@assets/products.json";

export const products = _products as IProduct[];

export const getProductsByCollection = (collection: string): IProduct[] =>
  products.filter((product) => product.collection.toLowerCase() === collection);

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
