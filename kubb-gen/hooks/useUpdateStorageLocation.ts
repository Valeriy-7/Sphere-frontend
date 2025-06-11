import { useMutation } from '@tanstack/react-query';
import client from '@/modules/auth/axios-client';

export const useUpdateStorageLocation = () => {
  return useMutation({
    mutationFn: async ({ sizeId, storageLocation }: {
      sizeId: string;
      storageLocation: string;
    }) => {
      const response = await client({
        method: 'POST',
        url: `/ff-account/storage/sizes/${sizeId}/location`,
        data: { storageLocation },
      });

      return response.data;
    },
  });
}; 