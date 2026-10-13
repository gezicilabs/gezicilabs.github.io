import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ tr: z.string(), en: z.string() });

// One YAML file per app: src/content/apps/<slug>.yaml
const apps = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/apps' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
    status: z.enum(['live', 'beta', 'soon']).default('live'),
    color: z.string().default('#FFD978'),
    icon: z.string().optional(),
    playUrl: z.url().optional(),
    category: text.optional(),
    tagline: text,
    summary: text,
    features: z.array(z.object({ title: text, text: text })).default([]),
    screenshots: z.array(z.string()).default([]),
    version: z.string().optional(),
    updated: z.string().optional(),
    size: z.string().optional(),
    minAndroid: z.string().optional(),
    languages: z.string().default('Türkçe, English'),
    supportEmail: z.email().optional(),
  }),
});

// Privacy policies: src/content/privacy/<slug>/tr.md and en.md
const privacy = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/privacy' }),
  schema: z.object({
    title: z.string(),
    updated: z.string(),
  }),
});

export const collections = { apps, privacy };
