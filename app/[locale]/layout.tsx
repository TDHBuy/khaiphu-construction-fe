import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Khải Phú Construction — Nền móng vững chắc cho mọi công trình",
    template: "%s | Khải Phú Construction",
  },
  description:
    "Khải Phú Construction — Chuyên thi công Shoring, ép cừ Larsen và gia công Kingpost. Đối tác tin cậy cho nền móng công trình tại Việt Nam.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      {/* Sets lang and scroll-behavior on <html> without nesting a second html tag */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}";document.documentElement.setAttribute('data-scroll-behavior','smooth')`,
        }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
