import { useState, useEffect, useCallback } from 'react';
import { StorageData, StorageSupplier } from '@/types/storage';
import client from '@/modules/auth/axios-client';

interface UseStorageDataReturn {
  data: StorageData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseSupplierStorageDataReturn {
  data: StorageSupplier | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseAllStorageDataReturn {
  data: any[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStorageData(): UseStorageDataReturn {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/ff-account/storage');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch storage data');
      }

      const storageData = await response.json();
      setData(storageData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching storage data:', err);
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

export function useAllStorageData(): UseAllStorageDataReturn {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/ff-account/storage/all');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch storage data');
      }

      const storageData = await response.json();
      setData(storageData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching all storage data:', err);
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

export function useSupplierStorageData(supplierId: string | null): UseSupplierStorageDataReturn {
  const [data, setData] = useState<StorageSupplier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!supplierId) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/ff-account/storage/suppliers/${supplierId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch supplier storage data');
      }

      const supplierData = await response.json();
      setData(supplierData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching supplier storage data:', err);
    } finally {
      setLoading(false);
    }
  }, [supplierId]);

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

// New hook for updating storage location
export function useUpdateStorageLocation() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStorageLocation = useCallback(async (
    { productId, sizeId, storageLocation }: { 
      productId?: string; 
      sizeId?: string; 
      storageLocation: string 
    }
  ) => {
    try {
      setIsUpdating(true);
      setError(null);

      const url = sizeId 
        ? `/ff-account/storage/sizes/${sizeId}/location`
        : `/ff-account/storage/products/${productId}/location`;

      const response = await client({
        method: 'POST',
        url: url,
        data: { storageLocation },
      });

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error updating storage location:', err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    updateStorageLocation,
    isUpdating,
    error,
  };
} 