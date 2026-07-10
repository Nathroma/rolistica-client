import { z } from 'zod';

export const clientEnvironmentSchema = z.object({
  VITE_APP_URL: z
    .url()
    .refine((str) => !str.endsWith('/'), 'Remove trailing slash'),
  VITE_APP_PORT: z.coerce.number().int().min(1),
  VITE_API_URL: z
    .url()
    .refine((str) => !str.endsWith('/'), 'Remove trailing slash'),
  VITE_API_BEARER_TOKEN: z.string().optional(),
});

export type ParsedEnv = z.infer<typeof clientEnvironmentSchema>;
