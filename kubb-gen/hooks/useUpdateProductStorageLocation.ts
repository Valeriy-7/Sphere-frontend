import { useMutation } from '@tanstack/react-query';
import client from '@/modules/auth/axios-client';

export const useUpdateProductStorageLocation = () => {
  return useMutation({
    mutationFn: async ({ productId, storageLocation }: {
      productId: string;
      storageLocation: string;
    }) => {
      const response = await client({
        method: 'POST',
        url: `/ff-account/storage/products/${productId}/location`,
        data: { storageLocation },
      });

      return response.data;
    },
  });
}; 