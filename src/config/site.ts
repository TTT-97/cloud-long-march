export const siteConfig = {
  name: '云上长征',
  nameEn: 'Cloud Long March',
  description: '川蜀红色特产数字文化展馆',
  descriptionEn: 'Digital Heritage Museum of Sichuan\'s Long March Agricultural Products',
  url: 'https://cloudlongmarch.com',
  ogImage: '/images/ui/og-image.jpg',
  links: {
    twitter: '',
    wechat: '',
  },
} as const;

export const defaultMetadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.descriptionEn,
};
