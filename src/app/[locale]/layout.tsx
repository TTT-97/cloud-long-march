import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AnimatePresence } from '@/components/animations/page-transition';
import { AudioContextProvider } from '@/components/audio/audio-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AudioContextProvider>
        <Header />
        <AnimatePresence>
          <main className="flex-1">{children}</main>
        </AnimatePresence>
        <Footer />
      </AudioContextProvider>
    </NextIntlClientProvider>
  );
}
