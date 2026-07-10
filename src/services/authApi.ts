import { parsedEnv } from '@/config/env';
import type { AuthTokens, LoginPayload, RegisterPayload } from '@/types/authType';
import { z } from 'zod';

const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const jsonHeaders = {
  'Content-Type': 'application/json',
};

async function parseAuthResponse(response: Response): Promise<AuthTokens> {
  const data: unknown = await response.json();
  return authTokensSchema.parse(data);
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch(`${parsedEnv.VITE_API_URL}/register`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'inscription, vérifiez vos informations");
  }

  return parseAuthResponse(response);
}

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${parsedEnv.VITE_API_URL}/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Identifiants incorrects');
  }

  return parseAuthResponse(response);
}
