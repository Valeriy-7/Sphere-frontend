import { useMutation } from '@tanstack/react-query';
import { messagesDelete } from '../../mutations/messages/messages-delete';
import type { MessagesDeleteMutationRequestType } from '../../mutations/messages/messages-delete';

export const useMessagesDelete = () => {
  return useMutation({
    mutationFn: ({ messageId }: MessagesDeleteMutationRequestType) => {
      return messagesDelete({ messageId });
    },
  });
};

export type UseMessagesDeleteMutationResult = ReturnType<typeof useMessagesDelete>;
