'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { AppSpinner } from '@/components/app-spinner';

interface Worker {
  id: string;
  name: string;
  position: string;
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

export default function WorkersManagementPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newWorker, setNewWorker] = useState<Omit<Worker, 'id'>>({ name: '', position: '' });
  const [editForm, setEditForm] = useState<Worker>({ id: '', name: '', position: '' });
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch workers on component mount
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ff-account/workers');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWorkers(data);
    } catch (e: any) {
      console.error("Failed to fetch workers:", e);
      setError(e.message || 'An unknown error occurred');
    }
    setIsLoading(false);
  };

  const handleCreateWorker = async () => {
    if (!newWorker.name.trim()) {
      toast({
        title: "Error",
        description: "Worker name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/ff-account/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorker),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const createdWorker = await response.json();
      setWorkers([...workers, createdWorker]);
      setIsAdding(false);
      setNewWorker({ name: '', position: '' });
      
      toast({
        title: "Success",
        description: "Worker created successfully",
      });
    } catch (e: any) {
      console.error("Failed to create worker:", e);
      toast({
        title: "Error",
        description: e.message || 'Failed to create worker',
        variant: "destructive"
      });
    }
  };

  const handleUpdateWorker = async () => {
    if (!editForm.name.trim()) {
      toast({
        title: "Error",
        description: "Worker name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`/api/ff-account/workers/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editForm.name, position: editForm.position }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const updatedWorker = await response.json();
      setWorkers(workers.map(worker => worker.id === updatedWorker.id ? updatedWorker : worker));
      setEditingId(null);
      
      toast({
        title: "Success",
        description: "Worker updated successfully",
      });
    } catch (e: any) {
      console.error("Failed to update worker:", e);
      toast({
        title: "Error",
        description: e.message || 'Failed to update worker',
        variant: "destructive"
      });
    }
  };

  const handleDeleteWorker = async (id: string) => {
    if (!confirm("Are you sure you want to delete this worker?")) {
      return;
    }

    try {
      const response = await fetch(`/api/ff-account/workers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setWorkers(workers.filter(worker => worker.id !== id));
      
      toast({
        title: "Success",
        description: "Worker deleted successfully",
      });
    } catch (e: any) {
      console.error("Failed to delete worker:", e);
      toast({
        title: "Error",
        description: e.message || 'Failed to delete worker',
        variant: "destructive"
      });
    }
  };

  const startEditing = (worker: Worker) => {
    setEditingId(worker.id);
    setEditForm({ ...worker });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Управление сотрудниками
        </h1>
        <p className="text-gray-600 mt-2">
          Создавайте и управляйте сотрудниками, которые могут быть назначены ответственными за поставки.
        </p>
      </header>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Сотрудники</CardTitle>
            <Button 
              onClick={() => setIsAdding(!isAdding)} 
              variant="outline" 
              className="flex items-center gap-1"
            >
              {isAdding ? <X size={16} /> : <Plus size={16} />}
              {isAdding ? 'Отмена' : 'Добавить сотрудника'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <div className="bg-gray-50 p-4 rounded-md mb-6 flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Имя сотрудника"
                value={newWorker.name}
                onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                className="flex-1"
              />
              <Input
                placeholder="Должность (необязательно)"
                value={newWorker.position}
                onChange={(e) => setNewWorker({ ...newWorker, position: e.target.value })}
                className="flex-1"
              />
              <Button onClick={handleCreateWorker} className="flex-shrink-0 flex items-center gap-1">
                <Save size={16} />
                Сохранить
              </Button>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <>
              {workers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Имя</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead className="w-[150px] text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell>
                          {editingId === worker.id ? (
                            <Input
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                          ) : (
                            worker.name
                          )}
                        </TableCell>
                        <TableCell>
                          {editingId === worker.id ? (
                            <Input
                              value={editForm.position}
                              onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                            />
                          ) : (
                            worker.position || '—'
                          )}
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          {editingId === worker.id ? (
                            <>
                              <Button size="sm" variant="outline" onClick={cancelEditing}>
                                <X size={16} />
                              </Button>
                              <Button size="sm" onClick={handleUpdateWorker}>
                                <Save size={16} />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline" onClick={() => startEditing(worker)}>
                                <Pencil size={16} />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteWorker(worker.id)}>
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
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Нет сотрудников</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Создайте нового сотрудника, чтобы назначить его ответственным за поставки.
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
            <p>Управляйте списком сотрудников, которые могут быть назначены ответственными за поставки:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Нажмите <strong>Добавить сотрудника</strong> для создания нового сотрудника.</li>
              <li>Заполните имя и должность (необязательно) и нажмите <strong>Сохранить</strong>.</li>
              <li>Используйте кнопки редактирования и удаления для управления существующими сотрудниками.</li>
              <li>Созданные здесь сотрудники будут доступны для выбора в выпадающем списке при назначении ответственных за поставки.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 