import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { headers } from "next/headers";
import { routing } from "./routing";

const LOCALE_PREFIX = new RegExp(`^/(${routing.locales.join("|")})(/?)`);
const PAGE_NAMESPACES: Record<string, string> = {
  "/": "home",
  "/about/company-profile": "companyProfile",
};
function resolvePageNamespace(rawPathname: string): string | null {
  const pathname =
    rawPathname.replace(LOCALE_PREFIX, "/").replace("//", "/") || "/";
  return PAGE_NAMESPACES[pathname] || null;
}

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

  console.log("[Request] ALL HEADERS:\n" + allHeaders.join("\n"));
  const pathname = headersList.get("x-middleware-request-pathname") ?? "/";
  const NAMESPACE_MAP: Record<string, () => Promise<{ default: object }>> = {
    home: () => import(`../lang/${locale}/home.json`),
    companyProfile: () =>
      import(`../lang/${locale}/about/company-profile.json`),
  };
  // Global namespaces — loaded on every request
  const messages: Record<string, object> = {
    common: (await import(`../lang/${locale}/common.json`)).default,
    navigation: (await import(`../lang/${locale}/navigation.json`)).default,
    footer: (await import(`../lang/${locale}/footer.json`)).default,
  };

  // Page namespace — lazy loaded per route
  const ns = resolvePageNamespace(pathname);
  console.log("[Request] Current pathname:", pathname);
  console.log("[Request] Resolved namespace:", ns);
  if (ns && NAMESPACE_MAP[ns]) {
    messages[ns] = (await NAMESPACE_MAP[ns]()).default;
  } else {
    console.warn(`No namespace found for pathname: ${pathname}`);
  }
  console.log("🔍 [final messages keys]", Object.keys(messages));
  return { locale, messages };
});
