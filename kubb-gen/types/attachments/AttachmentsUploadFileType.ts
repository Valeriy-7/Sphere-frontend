/**
 * @description Файл успешно загружен
 */
export type AttachmentsUploadFile201Type = any;

export type AttachmentsUploadFileMutationRequestType = {
  /**
   * @type string | undefined, binary
   */
  file?: Blob;
  /**
   * @type string | undefined
   */
  chatId?: string;
  /**
   * @type string | undefined
   */
  text?: string;
};

export type AttachmentsUploadFileMutationResponseType = AttachmentsUploadFile201Type;

export type AttachmentsUploadFileTypeMutation = {
  Response: AttachmentsUploadFile201Type;
  Request: AttachmentsUploadFileMutationRequestType;
  Errors: any;
};
