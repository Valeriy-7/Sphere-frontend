import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ChevronDown } from 'lucide-react';
import * as ReactDOM from 'react-dom';

interface LogisticsTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newLogisticsType: { id: string; name: string }) => void;
  anchorElement?: HTMLElement | null;
}

const LOGISTICS_TYPES = [
  'Собственный транспорт ФФ',
  'Наёмный транспорт',
  'Курьерская служба',
  'Транспортная компания',
  'Почта России',
  'СДЭК',
  'Яндекс',
  'Самовывоз',
];

export function LogisticsTypeModal({ 
  open, 
  onOpenChange, 
  onSuccess,
  anchorElement 
}: LogisticsTypeModalProps) {
  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [logisticsType, setLogisticsType] = useState('');
  const [tgValue, setTgValue] = useState('');
  const [showLogisticsTypes, setShowLogisticsTypes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
          anchorElement && !anchorElement.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onOpenChange, anchorElement]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Название логистики обязательно',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/ff-account/logistics-providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          contactName: contactName.trim() || undefined,
          phone: phone.trim() || undefined,
          carModel: carModel.trim() || undefined,
          carNumber: carNumber.trim() || undefined,
          capacity: capacity.trim() || undefined,
          logisticsType: logisticsType || undefined,
          tgValue: tgValue || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка при создании типа логистики');
      }

      const newLogistics = await response.json();
      
      toast({
        title: 'Успех',
        description: 'Тип логистики успешно добавлен',
      });
      
      // Reset form
      setName('');
      setContactName('');
      setPhone('');
      setCarModel('');
      setCarNumber('');
      setCapacity('');
      setLogisticsType('');
      setTgValue('');
      
      // Close form
      onOpenChange(false);
      
      // Notify parent component
      if (onSuccess) {
        onSuccess(newLogistics);
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось создать тип логистики',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;
  
  // Use portal to render the modal at the document level
  return ReactDOM.createPortal(
    <div 
      ref={modalRef}
      className="fixed z-[9999] bg-white border rounded-lg shadow-lg"
      style={{ 
        top: "calc(50% - 200px)",
        left: "calc(50% - 120px)",
        minWidth: '240px',
        maxWidth: '280px'
      }}
    >
      <div className="p-2 space-y-2">
        <div className="text-center py-1 px-2 bg-zinc-100 rounded-md text-xs">
          Добавить логистику
        </div>
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название:"
          disabled={isSubmitting}
        />
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          placeholder="Имя:"
          disabled={isSubmitting}
        />
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Номер телефона:"
          disabled={isSubmitting}
        />
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          placeholder="Марка авто"
          disabled={isSubmitting}
        />
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          placeholder="Гос номер"
          disabled={isSubmitting}
        />
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Вместимость (V - объём)"
          disabled={isSubmitting}
        />
        
        <div className="relative">
          <div 
            className="w-full flex justify-between items-center px-2 py-1 text-xs bg-zinc-100 rounded-md cursor-pointer"
            onClick={() => setShowLogisticsTypes(!showLogisticsTypes)}
          >
            <span>{logisticsType || "Тип логистики"}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
          
          {showLogisticsTypes && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-sm">
              {LOGISTICS_TYPES.map((type) => (
                <div 
                  key={type}
                  className="px-2 py-1 text-xs hover:bg-zinc-100 cursor-pointer"
                  onClick={() => {
                    setLogisticsType(type);
                    setShowLogisticsTypes(false);
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <input
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md border-none"
          value={tgValue}
          onChange={(e) => setTgValue(e.target.value)}
          placeholder="ТГ"
          disabled={isSubmitting}
        />
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full px-2 py-1 text-xs bg-zinc-100 rounded-md cursor-pointer hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Сохранение...</span>
            </div>
          ) : (
            'Сохранить'
          )}
        </button>
      </div>
    </div>,
    document.body
  );
} 