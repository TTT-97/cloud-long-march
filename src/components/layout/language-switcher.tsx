'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';

  const switchTo = locale === 'zh' ? 'en' : 'zh';

  function handleSwitch() {
    router.push(pathname, { locale: switchTo });
  }

  return (
    <motion.button
      onClick={handleSwitch}
      className="relative flex items-center gap-1.5 rounded-full border border-gold/20 px-3 py-1.5 text-xs font-medium tracking-wider text-dark/60 transition-colors hover:border-gold/50 hover:text-gold"
      whileTap={{ scale: 0.95 }}
      aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <span className={locale === 'zh' ? 'text-deep-red' : ''}>中</span>
      <span className="text-gold/30">/</span>
      <span className={locale === 'en' ? 'text-deep-red' : ''}>EN</span>
    </motion.button>
  );
}
