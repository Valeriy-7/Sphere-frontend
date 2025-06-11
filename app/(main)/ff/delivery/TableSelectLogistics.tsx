import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogisticsTypeModal } from './LogisticsTypeModal';
import { useQueryClient } from '@tanstack/react-query';

interface LogisticsProvider {
  id: string;
  name: string;
}

interface TableSelectLogisticsProps {
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

export function TableSelectLogistics(props: TableSelectLogisticsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  
  // Determine the effective value - either props.value or props.defaultValue
  const effectiveValue = props.value !== undefined ? props.value : props.defaultValue;
  
  // Fetch logistics providers
  const { data: logisticsProviders = [], isLoading } = useQuery<LogisticsProvider[]>({
    queryKey: ['ff-account-logistics-providers'],
    queryFn: async () => {
      const response = await fetch('/api/ff-account/logistics-providers');
      if (!response.ok) {
        throw new Error('Failed to fetch logistics providers');
      }
      return response.json();
    },
    staleTime: 30000, // Cache data for 30 seconds
  });
  
  // Find the selected provider based on the current value
  const selectedProvider = effectiveValue 
    ? logisticsProviders.find(p => p.id === effectiveValue) 
    : undefined;
    
  const handleAddNewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
    setIsSelectOpen(false);
  };

  const handleModalSuccess = (newLogisticsType: LogisticsProvider) => {
    // Invalidate the logistics providers query to fetch the updated list
    queryClient.invalidateQueries({ queryKey: ['ff-account-logistics-providers'] });
    
    // Set the newly created logistics type as the selected value if there's an onValueChange handler
    if (props.onValueChange) {
      props.onValueChange(newLogisticsType.id);
    }
    
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <Select 
        disabled={isLoading || props.disabled}
        value={effectiveValue}
        onValueChange={(value) => {
          if (props.onValueChange) {
            props.onValueChange(value);
          }
        }}
        open={isSelectOpen}
        onOpenChange={setIsSelectOpen}
      >
        <SelectTrigger size={'xs'}>
          <SelectValue placeholder="Выбрать" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-1 py-1">
            <Button 
              ref={buttonRef}
              variant="ghost" 
              className="w-full justify-start text-sm font-normal flex items-center gap-2 mb-2"
              onClick={handleAddNewClick}
            >
              <Plus size={16} />
              Добавить тип логистики
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-xs text-center text-gray-500 p-2">Загрузка...</div>
          ) : logisticsProviders.length > 0 ? (
            <div className="max-h-40 overflow-y-auto">
              {logisticsProviders.map((provider) => (
                <SelectItem 
                  key={provider.id} 
                  value={provider.id}
                >
                  {provider.name}
                </SelectItem>
              ))}
            </div>
          ) : (
            <div className="text-xs text-center text-gray-500 p-2">Нет доступных типов логистики</div>
          )}
        </SelectContent>
      </Select>

      {isModalOpen && (
        <LogisticsTypeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSuccess={handleModalSuccess}
          anchorElement={buttonRef.current}
        />
      )}
    </div>
  );
}
