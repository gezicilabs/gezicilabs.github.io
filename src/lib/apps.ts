import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type App = CollectionEntry<'apps'>;

/** Published apps, by `order`. Drafts show up only in `npm run dev`. */
export async function getApps(): Promise<App[]> {
  const apps = await getCollection('apps', ({ data }) => import.meta.env.DEV || !data.draft);
  return apps.sort((a, b) => a.data.order - b.data.order);
}

export async function getPrivacy(slug: string, lang: Lang) {
  const all = await getCollection('privacy');
  return all.find((p) => p.id === `${slug}/${lang}`);
}

export function stopNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}
