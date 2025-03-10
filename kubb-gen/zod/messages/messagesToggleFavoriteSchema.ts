import { toggleFavoriteDtoSchema } from '../toggleFavoriteDtoSchema';
import { z } from 'zod';

/**
 * @description Статус избранного успешно изменен
 */
export const messagesToggleFavorite200Schema = z.any();

export const messagesToggleFavoriteMutationRequestSchema = z.lazy(() => toggleFavoriteDtoSchema);

export const messagesToggleFavoriteMutationResponseSchema = z.lazy(
  () => messagesToggleFavorite200Schema,
);
