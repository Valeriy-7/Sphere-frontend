'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFFAccountDeliveriesGetDeliveries } from '@/kubb-gen/hooks/ff-account/useFFAccountDeliveriesGetDeliveries';
import { DeliveryStatusType } from '@/kubb-gen/types/DeliveryStatusType';
import { AppSpinner } from '@/components/app-spinner';
import { DeliveryMpTable } from './delivery-mp-table';
import { columns, acceptanceColumns } from './columns';
import { formatDeliveryData } from './utils/format-delivery-data';
import { Input } from '@/components/ui/input';
import { DeliveryAcceptanceTable } from './delivery-acceptance-table';
import { useWbCabinetInfo } from './hooks/useWbCabinetInfo';
import { makeData, DataRow } from '@/lib/makeData';

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGrouped, setIsGrouped] = useState(false);

  // Fetch WB cabinet information
  const { wbCabinetInfo, isLoading: isWbCabinetLoading } = useWbCabinetInfo();

  // Map tab values to DeliveryStatus values
  const getStatusForTab = (tab: string): DeliveryStatusType => {
    switch (tab) {
      case 'new': return 'CREATED';
      case 'acceptance': return 'IN_PROGRESS';
      case 'accepted': return 'ACCEPTED';
      default: return 'CREATED';
    }
  };

  // Fetch deliveries based on the active tab
  const { data: deliveriesData, isLoading: isDeliveriesLoading } = useFFAccountDeliveriesGetDeliveries({
    status: getStatusForTab(activeTab),
    deliveryNumber: searchQuery.length > 0 ? searchQuery : undefined,
  });

  // Format the data for the table with WB cabinet info
  const tableData = deliveriesData?.items ? formatDeliveryData(deliveriesData.items, wbCabinetInfo) : [];

  const isLoading = isDeliveriesLoading || isWbCabinetLoading;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Поставки на ФФ</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList className="bg-transparent p-0 flex gap-2">
            <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">Новые</Button>
            </TabsTrigger>
            <TabsTrigger value="acceptance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">Приёмка</Button>
            </TabsTrigger>
            <TabsTrigger value="accepted" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" asChild>
              <Button variant="outline">Принято</Button>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <AppSpinner size="large" />
        </div>
      ) : (
        <>
          {activeTab === 'acceptance' ? (
            <DeliveryAcceptanceTable 
              data={tableData} 
              columns={acceptanceColumns}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              wbCabinetInfo={wbCabinetInfo}
            />
          ) : (
            <DeliveryMpTable 
              data={tableData} 
              columns={columns} 
              isAcceptance={activeTab === 'acceptance'}
              isAccepted={activeTab === 'accepted'}
              defaultGrouped={activeTab === 'acceptance' || activeTab === 'accepted'}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              wbCabinetInfo={wbCabinetInfo}
            />
          )}
        </>
      )}
    </div>
  );
} 