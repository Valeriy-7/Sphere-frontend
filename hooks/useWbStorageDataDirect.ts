import { useState, useEffect, useCallback } from 'react';
import client from '@/modules/auth/axios-client';

interface WbStorageData {
  summary: {
    currentStock: { 
      products: number; 
      items: number; 
      defects: number; 
      returnsFromPickup: number;
      totalTovars: number;
      totalProducts: number;
    };
    consumables: { ff: number; stores: number };
    received: { items: number; defects: number; consumables: number };
    shipped: { toWB: number; otherMarketplaces: number; defects: number };
  };
  stores: WbStorageStore[];
}

interface WbStorageStore {
  id: string;
  name: string;
  legalName?: string;
  address?: string;
  imageUrl?: string;
  totals: {
    products: number;
    items: number;
    defects: number;
    consumables: number;
    returnsFromPickup: number;
    totalTovars: number;
    totalProducts: number;
  };
  products: WbStorageProduct[];
}

interface WbStorageProduct {
  id: string;
  name: string;
  article: string;
  storageLocation?: string;
  totalQuantity: number;
  totalDefects: number;
  totalTovars: number;
  totalProducts: number;
  imageUrl?: string;
  color?: string;
  category?: string;
  brand?: string;
  sizes: WbStorageProductSize[];
  deliveryId?: string;
  deliveryStatus?: string;
  ffDeliveryStatus?: string;
}

interface WbStorageProductSize {
  id: string;
  sizeKey: string;
  sizeDisplay: string;
  wbSize?: string;
  techSize?: string;
  storageLocation?: string;
  factQuantity: number;
  defects: number;
}

interface UseWbStorageDataReturn {
  data: WbStorageData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWbStorageDataDirect(): UseWbStorageDataReturn {
  const [data, setData] = useState<WbStorageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Call backend directly using the configured axios client
      const response = await client({
        method: 'GET',
        url: '/wb/storage',
      });

      setData(response.data as WbStorageData);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching WB storage data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
} 