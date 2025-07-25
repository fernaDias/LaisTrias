import { LocalesDocument } from '@/graphql/types/graphql';
import queryDatoCMS from '@/utils/queryDatoCMS';

export default async function getAvailableLocales() {
  const { _site } = await queryDatoCMS(LocalesDocument);
  return _site.locales;
}

export async function getFallbackLocale() {
  const locales = await getAvailableLocales();
  return locales[0]; //using the first ordered locale as fallback
}

export const primaryColor = 'primary.500';
