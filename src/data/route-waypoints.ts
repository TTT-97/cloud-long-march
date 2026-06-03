// Route waypoints for the Long March route animation on the homepage map.
// Coordinates are percentages (0-100) relative to the 800×900 SVG viewBox.
// First 2 are historical waypoints (no product), last 5 correspond to products.

export interface RouteWaypoint {
  id: string;
  nameCN: string;
  nameEN: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  isHistorical: boolean;
  productSlug?: string; // only for product-linked waypoints
}

// Route order: Ruijin → Zunyi → Cangxi (kiwi) → Jianmen (tofu) → Luzhou → Qionglai → Ya'an → Aba → Ganzi
export const ROUTE_WAYPOINTS: RouteWaypoint[] = [
  { id: 'ruijin', nameCN: '瑞金', nameEN: 'Ruijin', x: 92, y: 88, isHistorical: true },
  { id: 'zunyi', nameCN: '遵义', nameEN: 'Zunyi', x: 80, y: 85, isHistorical: true },
  { id: 'kiwi', nameCN: '苍溪', nameEN: 'Cangxi', x: 76, y: 24, isHistorical: false, productSlug: 'kiwi' },
  { id: 'tofu', nameCN: '剑门关', nameEN: 'Jianmen Pass', x: 72, y: 22, isHistorical: false, productSlug: 'tofu' },
  { id: 'luzhou', nameCN: '泸州', nameEN: 'Luzhou', x: 62, y: 82, isHistorical: false, productSlug: 'orange' },
  { id: 'qionglai', nameCN: '邛崃', nameEN: 'Qionglai', x: 44, y: 56, isHistorical: false, productSlug: 'liquor' },
  { id: 'yaan', nameCN: '雅安', nameEN: "Ya'an", x: 36, y: 60, isHistorical: false, productSlug: 'tea' },
  { id: 'aba', nameCN: '阿坝', nameEN: 'Aba', x: 28, y: 12, isHistorical: false, productSlug: 'pork' },
  { id: 'ganzi', nameCN: '甘孜', nameEN: 'Ganzi', x: 14, y: 16, isHistorical: false, productSlug: 'pork' },
];

// Product-specific hotspot positions (some differ slightly from route waypoints for visual clarity)
export const PRODUCT_POSITIONS: Record<string, { x: number; y: number }> = {
  orange: { x: 62, y: 82 },
  liquor: { x: 44, y: 56 },
  tea: { x: 36, y: 60 },
  pork: { x: 21, y: 14 },
  tofu: { x: 72, y: 22 },
  kiwi: { x: 76, y: 24 },
};
