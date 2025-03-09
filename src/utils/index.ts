import type { IProduct } from "@/types";
import _products from "@assets/products.json";

export const products = _products as IProduct[];

/**
 * Get products by collection.
 * if collection is "all", return all products.
 * else filter products by collection name.
 *
 * @param {string} collection - The name of the collection to filter by.
 * @returns {IProduct[]} - An array of products that belong to the specified collection.
 */
export const getProductsByCollection = (collection: string): IProduct[] =>
  collection === "all"
    ? products
    : products.filter((product) => product.collection === collection);

export const getProductSuggestions = (product: IProduct, top = 3) => {
  const suggestions = products.filter(
    (p) =>
      p.name !== product.name &&
      p.collection !== product.collection &&
      Math.random() > 0.5
  );
  return suggestions.slice(0, top);
};

export const getProductsUserMayAlsoLike = (product: IProduct, top = 3) => {
  const products = getProductsByCollection(product.collection);
  const suggestions = products.filter(
    (p) => p.name !== product.name && Math.random() > 0.5
  );
  return suggestions.slice(0, top);
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

export const getRelatedCollections = (collection: string, top = 3) => {
  const relatedCollections = collections.filter(
    (c) => c !== collection && Math.random() > 0.5
  );
  return relatedCollections.slice(0, top);
};

export const productImage = (image: string) => `/product-images/${image}`;
