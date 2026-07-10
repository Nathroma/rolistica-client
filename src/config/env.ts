import { clientEnvironmentSchema } from '@/config/env.schema';
import { formatEnvValidationError, parseEnvironment } from '@/utils/env-utils';

const parsedEnvResult = parseEnvironment(
  import.meta.env,
  clientEnvironmentSchema
);

if (!parsedEnvResult.success) {
  throw new Error(
    formatEnvValidationError(parsedEnvResult.error, {
      mode: import.meta.env.MODE,
    })
  );
}

export const parsedEnv = parsedEnvResult.data;
