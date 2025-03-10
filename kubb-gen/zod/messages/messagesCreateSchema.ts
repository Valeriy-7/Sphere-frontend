import { createMessageDtoSchema } from '../createMessageDtoSchema';
import { z } from 'zod';

/**
 * @description Сообщение успешно создано
 */
export const messagesCreate201Schema = z.any();

export const messagesCreateMutationRequestSchema = z.lazy(() => createMessageDtoSchema);

export const messagesCreateMutationResponseSchema = z.lazy(() => messagesCreate201Schema);
