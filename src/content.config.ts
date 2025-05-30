import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

// const tools = defineCollection({
// 	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 	}),
// });
// export const collections = { blog, tools };
export const collections = { blog };
