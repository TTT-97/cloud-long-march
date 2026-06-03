import { getAllSlugs, getProductBySlug } from '@/data';
import { routing } from '@/i18n/routing';
import { ProductStoryTemplate } from '@/components/template/product-story-template';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Not Found' };
  }

  const isZh = locale === 'zh';

  return {
    title: isZh ? product.seoTitleCN : product.seoTitleEN,
    description: isZh ? product.seoDescriptionCN : product.seoDescriptionEN,
    openGraph: {
      title: isZh ? product.seoTitleCN : product.seoTitleEN,
      description: isZh ? product.seoDescriptionCN : product.seoDescriptionEN,
      images: [product.heroImage],
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      siteName: '云上长征 Cloud Long March',
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? product.seoTitleCN : product.seoTitleEN,
      description: isZh ? product.seoDescriptionCN : product.seoDescriptionEN,
      images: [product.heroImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-dark/60">Product not found</p>
      </main>
    );
  }

  return <ProductStoryTemplate data={product} locale={locale as 'zh' | 'en'} />;
}
