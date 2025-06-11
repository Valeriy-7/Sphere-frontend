'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Truck } from 'lucide-react';

// Basic loading and error components (can be styled later)
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

export default function FFSettingsPage() {
  const [linkedWbCabinets, setLinkedWbCabinets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkedCabinets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/ff-account/linked-wb-cabinets');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLinkedWbCabinets(data);
      } catch (e: any) {
        console.error("Failed to fetch linked WB cabinets:", e);
        setError(e.message || 'An unknown error occurred');
      }
      setIsLoading(false);
    };

    fetchLinkedCabinets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Настройки кабинета
        </h1>
        <div className="flex gap-2">
          <Link href="/ff/settings/workers">
            <Button variant="outline" className="flex items-center gap-2">
              <Users size={18} />
              Управление сотрудниками
            </Button>
          </Link>
          <Link href="/ff/settings/logistics-types">
            <Button variant="outline" className="flex items-center gap-2">
              <Truck size={18} />
              Типы логистики
            </Button>
          </Link>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Настройки
          </h2>
          <p className="text-gray-600">
            Раздел для общих настроек кабинета, включая управление ответственными сотрудниками,
            настройки логистики и другие параметры кабинета.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/ff/settings/workers">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Users size={16} />
                Управление сотрудниками
              </Button>
            </Link>
            <Link href="/ff/settings/logistics-types">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Truck size={16} />
                Типы логистики
              </Button>
            </Link>
          </div>
        </section>
        
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
            Привязанные кабинеты Wildberries
          </h2>
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <div className="mt-4">
              {linkedWbCabinets.length > 0 ? (
                <ul className="space-y-2">
                  {linkedWbCabinets.map((cabinetId) => (
                    <li key={cabinetId} className="bg-gray-50 p-3 rounded-md shadow-sm flex items-center justify-between">
                      <span className="text-gray-700 font-medium">
                        WB Cabinet ID:
                      </span>
                      <code className="ml-4 px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-mono">
                        {cabinetId}
                      </code>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Нет привязанных кабинетов</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Нет кабинетов Wildberries, привязанных к данному кабинету FF.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 