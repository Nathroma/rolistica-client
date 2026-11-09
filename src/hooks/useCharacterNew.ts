import { apiClient } from '@/services/http/apiClient';
import z from 'zod';

export const characterInfoSchema = z.object({
  name: z.string(),
  level: z.number(),
  gameSystem: z.string(),
  collectionName: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const charactersSchema = z.array(characterInfoSchema);

export type CharacterInfo = z.infer<typeof characterInfoSchema>;

const useCharacterNew = () => {
  const getAll = async () => {
    const response = await apiClient.get('/v1/characters');
    return charactersSchema.parse(response.data);
  };

  return { getAll };
};

export default useCharacterNew;
