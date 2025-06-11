'use client';

import { useState } from 'react';
import PrepareInprogressPage from './inprogress/page';
import PrepareNewPage from './new/page';
import PrepareCompletedPage from './completed/page';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function PreparePage() {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Подготовка</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList className="bg-transparent p-0 flex gap-2">
            <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">Новые</Button>
            </TabsTrigger>
            <TabsTrigger value="inprogress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">В работе</Button>
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">Выполнено</Button>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === 'new' && <PrepareNewPage />}
      {activeTab === 'inprogress' && <PrepareInprogressPage />}
      {activeTab === 'completed' && <PrepareCompletedPage />}
    </div>
  );
}
