import porkData from './pork';
import tofuData from './tofu';
import teaData from './tea';
import liquorData from './liquor';
import kiwiData from './kiwi';
import orangeData from './orange';
import { ProductData } from './types';

export const products: ProductData[] = [
  porkData,
  tofuData,
  teaData,
  liquorData,
  kiwiData,
  orangeData,
];

export const productMap = new Map(products.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): ProductData | undefined {
  return productMap.get(slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

export type { ProductData } from './types';
