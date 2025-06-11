'use client';

import { useAllStorageData } from '@/hooks/useStorageData';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StorageTestPage() {
  const { data, loading, error, refetch } = useAllStorageData();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Storage Test Data</h1>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
          <span className="text-red-800">Error: {error}</span>
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <p>Found {data.length} suppliers</p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {!data && !loading && (
        <div className="text-center text-gray-500 py-8">
          No data available
        </div>
      )}
    </div>
  );
} 