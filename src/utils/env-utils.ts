import z from 'zod';

export function parseEnvironment<T>(
  raw: Record<string, unknown>,
  schema: z.ZodSchema<T>
) {
  return schema.safeParse(raw);
}

export function formatEnvValidationError(
  error: z.ZodError,
  options: { mode: string }
) {
  const details = error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';

      return `${path}${issue.message}`;
    })
    .join('\n');

  return `Invalid environment (mode: ${options.mode}):\n${details}\n\nCheck .env, .env.local, or .env.${options.mode} for the current mode.`;
}
