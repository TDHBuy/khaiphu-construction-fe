import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, SERVICES, SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-neutral-300">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white font-display font-bold text-primary-700">
                KP
              </div>
              <div>
                <div className="font-display font-bold text-white">
                  KHẢI PHÚ
                </div>
                <div className="text-[10px] tracking-[0.2em] text-neutral-400">
                  CONSTRUCTION
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent-500 hover:text-neutral-900"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.services_title")}
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.key}>
                  <Link
                    href={`/dich-vu/${service.slug}`}
                    className="text-sm text-neutral-400 transition-colors hover:text-accent-400"
                  >
                    {t(`services.${service.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.company_title")}
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.filter((item) => item.href).map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href!}
                    className="text-sm text-neutral-400 transition-colors hover:text-accent-400"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-wider text-white">
              {t("footer.contact_title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-500" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone size={16} className="shrink-0 text-accent-500" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="transition-colors hover:text-accent-400"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <Mail size={16} className="shrink-0 text-accent-500" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="transition-colors hover:text-accent-400"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Blueprint divider - Signature #2 */}
        <div className="divider-blueprint my-12 opacity-40" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 md:flex-row">
          <p>{t("footer.rights", { year })}</p>
          <p className="uppercase tracking-wider">
            Nền móng vững chắc · Solid Foundations
          </p>
        </div>
      </div>
    </footer>
  );
}
