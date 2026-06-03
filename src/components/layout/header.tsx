'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'motion/react';
import { LanguageSwitcher } from './language-switcher';
import Link from 'next/link';

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const isHomepage = pathname === '/' || pathname === '/zh' || pathname === '/en';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <span className="text-sm font-medium tracking-[0.2em] text-deep-red/70 uppercase transition-colors group-hover:text-deep-red">
            {t('brandName')}
          </span>
          <span className="hidden sm:block text-xs tracking-[0.15em] text-gold/60 uppercase">
            {t('brandTagline')}
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {!isHomepage && (
            <Link
              href="/zh"
              className="text-xs text-dark/40 hover:text-deep-red transition-colors tracking-wider uppercase"
            >
              ← Home
            </Link>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
