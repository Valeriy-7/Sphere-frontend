import client from '@/modules/auth/axios-client';
import type { RequestConfig, ResponseErrorConfig } from '@/modules/auth/axios-client';
import type { UseMutationOptions } from '@tanstack/react-query';
import type {
  AttachmentsUploadFileMutationRequestType,
  AttachmentsUploadFileMutationResponseType,
} from '../../types/attachments/AttachmentsUploadFileType';
import { useMutation } from '@tanstack/react-query';

export const attachmentsUploadFileMutationKey = () => [{ url: '/attachments/upload' }] as const;

export type AttachmentsUploadFileMutationKey = ReturnType<typeof attachmentsUploadFileMutationKey>;

/**
 * @summary Загрузить файл
 * {@link /attachments/upload}
 */
export async function attachmentsUploadFile(
  data?: AttachmentsUploadFileMutationRequestType,
  config: Partial<RequestConfig<AttachmentsUploadFileMutationRequestType>> & {
    client?: typeof client;
  } = {},
) {
  const { client: request = client, ...requestConfig } = config;

  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data];
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value);
      }
    });
  }
  const res = await request<
    AttachmentsUploadFileMutationResponseType,
    ResponseErrorConfig<Error>,
    AttachmentsUploadFileMutationRequestType
  >({
    method: 'POST',
    url: `/attachments/upload`,
    data: formData,
    ...requestConfig,
    headers: { 'Content-Type': 'multipart/form-data', ...requestConfig.headers },
  });
  return res.data;
}

/**
 * @summary Загрузить файл
 * {@link /attachments/upload}
 */
export function useAttachmentsUploadFile<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AttachmentsUploadFileMutationResponseType,
      ResponseErrorConfig<Error>,
      { data?: AttachmentsUploadFileMutationRequestType },
      TContext
    >;
    client?: Partial<RequestConfig<AttachmentsUploadFileMutationRequestType>> & {
      client?: typeof client;
    };
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {};
  const mutationKey = mutationOptions?.mutationKey ?? attachmentsUploadFileMutationKey();

  return useMutation<
    AttachmentsUploadFileMutationResponseType,
    ResponseErrorConfig<Error>,
    { data?: AttachmentsUploadFileMutationRequestType },
    TContext
  >({
    mutationFn: async ({ data }) => {
      return attachmentsUploadFile(data, config);
    },
    mutationKey,
    ...mutationOptions,
  });
}
