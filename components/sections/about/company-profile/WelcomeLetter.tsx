"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function WelcomeLetter() {
  const t = useTranslations("about.companyProfile.welcome");

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Image — 5/12 cols (≈42%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80"
                alt="Khải Phú construction site portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              {/* Decorative accent block */}
              <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 bg-accent-500 lg:block" />
            </div>
          </motion.div>

          {/* Content — 7/12 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 lg:flex lg:items-center"
          >
            <div>
              {/* Eyebrow */}
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent-600">
                — {t("eyebrow")}
              </p>

              {/* H2 */}
              <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-primary-900 sm:text-4xl lg:text-5xl">
                {t("title")}
              </h2>

              {/* Hairline divider */}
              <div className="mt-8 h-px w-16 bg-accent-500" />

              {/* Body paragraphs */}
              <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-700 lg:text-lg">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
                <p>{t("p3")}</p>
              </div>

              {/* Signature */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-neutral-300" />
                <div>
                  <p className="font-display text-lg font-bold text-primary-900">
                    {t("signature")}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {t("signatureRole")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
