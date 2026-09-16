import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';
import {routing, type AppLocale} from './routing';

function isValidLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && (routing.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({requestLocale}) => {
  const resolvedLocale = await requestLocale;
  let locale: AppLocale | undefined = isValidLocale(resolvedLocale)
    ? resolvedLocale
    : undefined;

  if (!locale) {
    const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
    if (isValidLocale(cookieLocale)) locale = cookieLocale;
  }

  const finalLocale = locale ?? routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default
  };
});
