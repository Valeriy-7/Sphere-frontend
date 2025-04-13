import { axiosInstance } from '../../../lib/axios';

export type MessagesDeleteMutationRequestType = {
  messageId: string;
};

export const messagesDelete = async ({ messageId }: MessagesDeleteMutationRequestType) => {
  return axiosInstance.delete(`/api/messages/${messageId}`);
};
