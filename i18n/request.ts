import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { headers } from "next/headers";
import { routing } from "./routing";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const headersList = await headers();
  const allHeaders: string[] = [];
  headersList.forEach((value, key) => {
    allHeaders.push(`${key}: ${value}`);
  });

  if (process.env.NODE_ENV === "development") {
    console.log("[Request] ALL HEADERS:\n" + allHeaders.join("\n"));
  }
  // Global namespaces — loaded on every request
  const messages: Record<string, object> = {
    common: (await import(`../lang/${locale}/common.json`)).default,
    navigation: (await import(`../lang/${locale}/navigation.json`)).default,
    footer: (await import(`../lang/${locale}/footer.json`)).default,
    home: (await import(`../lang/${locale}/home.json`)).default,
    companyProfile: (
      await import(`../lang/${locale}/about/company-profile.json`)
    ).default,
    visionMission: (await import(`../lang/${locale}/about/vision-mission.json`))
      .default,
    partners: (await import(`../lang/${locale}/about/partners.json`)).default,
    coreCompetencies: (await import(`../lang/${locale}/about/core-competencies.json`)).default,
  };
  return { locale, messages };
});
