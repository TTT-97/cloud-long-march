'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-gold/10 bg-dark">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-medium tracking-[0.2em] text-cream uppercase">
              {t('common.brandName')}
            </h3>
            <p className="mt-2 text-xs text-cream/40">
              {t('common.brandTagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <Link href="/zh" className="text-xs text-cream/50 hover:text-gold transition-colors">
              {t('footer.about')}
            </Link>
            <Link href="/zh" className="text-xs text-cream/50 hover:text-gold transition-colors">
              {t('footer.contact')}
            </Link>
            <Link href="/zh" className="text-xs text-cream/50 hover:text-gold transition-colors">
              {t('footer.privacy')}
            </Link>
          </div>

          {/* Language + Copyright */}
          <div className="flex flex-col gap-3">
            <LanguageSwitcher />
            <p className="text-xs text-cream/25 mt-auto">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
