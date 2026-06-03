export interface ProductData {
  id: string;
  slug: string;
  chineseName: string;
  englishName: string;
  sloganCN: string;
  sloganEN: string;
  heroImage: string;
  audio: string;
  audioDuration: number;
  storyCN: string[];
  storyEN: string[];
  productCN: string[];
  productEN: string[];
  location: {
    regionCN: string;
    regionEN: string;
  };
  coordinates: {
    x: number;
    y: number;
  };
  geoCoordinates: {
    lat: number;
    lng: number;
  };
  culturalValuesCN: Array<{ keyword: string; description: string }>;
  culturalValuesEN: Array<{ keyword: string; description: string }>;
  seoTitleCN: string;
  seoTitleEN: string;
  seoDescriptionCN: string;
  seoDescriptionEN: string;
}
