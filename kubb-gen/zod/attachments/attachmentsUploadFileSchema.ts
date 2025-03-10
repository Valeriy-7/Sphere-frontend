import { z } from 'zod';

/**
 * @description Файл успешно загружен
 */
export const attachmentsUploadFile201Schema = z.any();

export const attachmentsUploadFileMutationRequestSchema = z.object({
  file: z.instanceof(File).optional(),
  chatId: z.string().optional(),
  text: z.string().optional(),
});

export const attachmentsUploadFileMutationResponseSchema = z.lazy(
  () => attachmentsUploadFile201Schema,
);
