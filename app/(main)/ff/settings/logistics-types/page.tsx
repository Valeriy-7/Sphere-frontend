'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AppSpinner } from '@/components/app-spinner';

interface LogisticsProvider {
  id: string;
  name: string;
  contactName?: string;
  phone?: string;
}

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-10">
    <AppSpinner size="large" />
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

export default function LogisticsTypesManagementPage() {
  const [logisticsProviders, setLogisticsProviders] = useState<LogisticsProvider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLogistics, setNewLogistics] = useState<Omit<LogisticsProvider, 'id'>>({ 
    name: '', 
    contactName: '',
    phone: '' 
  });
  const [editForm, setEditForm] = useState<LogisticsProvider>({ 
    id: '', 
    name: '', 
    contactName: '',
    phone: '' 
  });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch logistics providers on component mount
  useEffect(() => {
    fetchLogisticsProviders();
  }, []);

  const fetchLogisticsProviders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ff-account/logistics-providers');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLogisticsProviders(data);
    } catch (e: any) {
      console.error("Failed to fetch logistics providers:", e);
      setError(e.message || 'An unknown error occurred');
    }
    setIsLoading(false);
  };

  const handleCreateLogisticsProvider = async () => {
    if (!newLogistics.name.trim()) {
      toast({
        title: "Error",
        description: "Название типа логистики обязательно",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/ff-account/logistics-providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLogistics),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const createdLogistics = await response.json();
      setLogisticsProviders([...logisticsProviders, createdLogistics]);
      setIsAdding(false);
      setNewLogistics({ name: '', contactName: '', phone: '' });
      
      toast({
        title: "Успех",
        description: "Тип логистики успешно создан",
      });
    } catch (e: any) {
      console.error("Failed to create logistics provider:", e);
      toast({
        title: "Ошибка",
        description: e.message || 'Не удалось создать тип логистики',
        variant: "destructive"
      });
    }
  };

  const handleUpdateLogisticsProvider = async () => {
    if (!editForm.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Название типа логистики обязательно",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`/api/ff-account/logistics-providers/${editForm.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          contactName: editForm.contactName,
          phone: editForm.phone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedLogistics = await response.json();
      setLogisticsProviders(logisticsProviders.map(lp => 
        lp.id === updatedLogistics.id ? updatedLogistics : lp
      ));
      setEditingId(null);
      
      toast({
        title: "Успех",
        description: "Тип логистики успешно обновлен",
      });
    } catch (e: any) {
      console.error("Failed to update logistics provider:", e);
      toast({
        title: "Ошибка",
        description: e.message || 'Не удалось обновить тип логистики',
        variant: "destructive"
      });
    }
  };

  const handleDeleteLogisticsProvider = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот тип логистики?")) {
      return;
    }

    try {
      const response = await fetch(`/api/ff-account/logistics-providers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setLogisticsProviders(logisticsProviders.filter(lp => lp.id !== id));
      
      toast({
        title: "Успех",
        description: "Тип логистики успешно удален",
      });
    } catch (e: any) {
      console.error("Failed to delete logistics provider:", e);
      toast({
        title: "Ошибка",
        description: e.message || 'Не удалось удалить тип логистики',
        variant: "destructive"
      });
    }
  };

  const startEditing = (logisticsProvider: LogisticsProvider) => {
    setEditingId(logisticsProvider.id);
    setEditForm({ ...logisticsProvider });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Управление типами логистики
        </h1>
        <p className="text-gray-600 mt-2">
          Создавайте и управляйте типами логистики, которые используются в поставках.
        </p>
      </header>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Типы логистики</CardTitle>
            <Button 
              onClick={() => setIsAdding(!isAdding)} 
              variant="outline" 
              className="flex items-center gap-1"
            >
              {isAdding ? <X size={16} /> : <Plus size={16} />}
              {isAdding ? 'Отмена' : 'Добавить тип логистики'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <div className="bg-gray-50 p-4 rounded-md mb-6 flex flex-col gap-4">
              <Input
                placeholder="Название"
                value={newLogistics.name}
                onChange={(e) => setNewLogistics({ ...newLogistics, name: e.target.value })}
                className="flex-1"
              />
              <Input
                placeholder="Контактное лицо (необязательно)"
                value={newLogistics.contactName || ''}
                onChange={(e) => setNewLogistics({ ...newLogistics, contactName: e.target.value })}
                className="flex-1"
              />
              <Input
                placeholder="Телефон (необязательно)"
                value={newLogistics.phone || ''}
                onChange={(e) => setNewLogistics({ ...newLogistics, phone: e.target.value })}
                className="flex-1"
              />
              <Button onClick={handleCreateLogisticsProvider} className="flex-shrink-0 flex items-center gap-1 w-full md:w-auto">
                <Save size={16} />
                Сохранить
              </Button>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              {logisticsProviders.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Контактное лицо</TableHead>
                      <TableHead>Телефон</TableHead>
                      <TableHead className="w-[150px] text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logisticsProviders.map((logistics) => (
                      <TableRow key={logistics.id}>
                        <TableCell>
                          {editingId === logistics.id ? (
                            <Input
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                          ) : (
                            logistics.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === logistics.id ? (
                            <Input
                              value={editForm.contactName || ''}
                              onChange={(e) => setEditForm({ ...editForm, contactName: e.target.value })}
                            />
                          ) : (
                            logistics.contactName || '—'
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === logistics.id ? (
                            <Input
                              value={editForm.phone || ''}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            />
                          ) : (
                            logistics.phone || '—'
                          )}
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          {editingId === logistics.id ? (
                            <>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>
                                <X size={16} />
                              </Button>
                              <Button size="sm" onClick={handleUpdateLogisticsProvider}>
                                <Save size={16} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline" onClick={() => startEditing(logistics)}>
                                <Pencil size={16} />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteLogisticsProvider(logistics.id)}>
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Нет типов логистики</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Создайте новый тип логистики, чтобы использовать его в поставках.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Инструкция</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>Управляйте списком типов логистики, которые будут доступны при создании поставок:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Нажмите <strong>Добавить тип логистики</strong> для создания нового.</li>
              <li>Заполните название и, при необходимости, контактные данные, затем нажмите <strong>Сохранить</strong>.</li>
              <li>Используйте кнопки редактирования и удаления для управления существующими типами логистики.</li>
              <li>Созданные здесь типы логистики будут доступны для выбора в выпадающем списке при создании поставок.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 