/**
 * @description Голосовое сообщение успешно загружено
 */
export type AttachmentsUploadVoice201Type = any;

export type AttachmentsUploadVoiceMutationRequestType = {
  /**
   * @type string | undefined, binary
   */
  file?: Blob;
  /**
   * @type string | undefined
   */
  chatId?: string;
  /**
   * @type number | undefined
   */
  duration?: number;
};

export type AttachmentDataType = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string | undefined
   */
  fileUrl?: string;
  /**
   * @type string | undefined
   */
  url?: string;
  /**
   * @type string | undefined
   */
  mimeType?: string;
  /**
   * @type string | undefined
   */
  name?: string;
  /**
   * @type string | undefined
   */
  fileName?: string;
  /**
   * @type number | undefined
   */
  duration?: number;
};

export type AttachmentsUploadVoiceMutationResponseType =
  | {
      /**
       * @type object | undefined
       */
      message?: any;
      /**
       * @type AttachmentDataType | undefined
       */
      attachment?: AttachmentDataType;
    }
  | AttachmentDataType;

export type AttachmentsUploadVoiceTypeMutation = {
  Response: AttachmentsUploadVoice201Type;
  Request: AttachmentsUploadVoiceMutationRequestType;
  Errors: any;
};
