import { FFDeliveryWithRoutesResponseDtoType } from '@/kubb-gen/types/FFDeliveryWithRoutesResponseDtoType';
import { DataRow } from '@/lib/makeData';

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
}

export function formatDeliveryData(
  deliveries: FFDeliveryWithRoutesResponseDtoType[], 
  wbCabinetInfo?: WbCabinetInfo | null
): DataRow[] {
  // Get WB cabinet display info
  const wbStoreName = wbCabinetInfo?.companyName || 'WB Store';
  const wbStoreImage = wbCabinetInfo?.avatarUrl || 'https://placehold.co/100x100?text=WB';

  return deliveries.map(delivery => {
    // Extract supplier info from routes if available
    const firstRoute = delivery.routes[0];
    const firstSupplier = firstRoute?.suppliers?.[0];

    return {
      uuid: delivery.id,
      date1: new Date(delivery.deliveryDate),
      date2: new Date(),
      number: delivery.number,
      number1to3: delivery.planQuantity || 0, // Количество товаров
      number1to5: delivery.cargoPlaces || 0, // Грузовые места
      number1to10: (delivery as any).cargoVolume || 0, // Объём (м3) - Using type assertion until types are regenerated
      status: convertStatusToTableFormat(delivery.status),
      title: wbStoreName, // Now using actual WB cabinet name
      // Required fields that were missing
      group1: 1,
      group2: 1,
      // Additional fields required by the table
      groupDate1: new Date(delivery.deliveryDate), // Use actual delivery date for grouping
      groupStoreName: wbStoreName, // Now using actual WB cabinet name
      groupPlace: firstRoute?.address || '',
      number1: delivery.planQuantity || 0,
      number2: delivery.factQuantity || 0,
      number3: delivery.defects || 0,
      number4: 0,
      number5: 0,
      number6: 0,
      number7: (delivery as any).logisticsProviderId || undefined, // Logistics provider ID
      number8: 0,
      number9: 0,
      number10: 0,
      size: 'm',
      art: delivery.number,
      image: wbStoreImage, // Now using actual WB cabinet image
      description: delivery.deliveryNumber || `Поставка ${delivery.number}`,
      city: firstRoute?.address?.split(',')[0] || '',
      streetAddress: firstRoute?.address || '',
      phone: firstSupplier?.contactPhone || '',
      // Store additional data for UI rendering
      contactPerson: firstSupplier?.contactPerson || '',
      logisticsType: 'Стандарт',
      acceptedAt: (delivery as any).acceptedAt, // Add acceptedAt timestamp with type assertion
      // Add responsible person fields for parsing
      responsiblePersons: (delivery as any).responsiblePersons || undefined,
      responsiblePerson: (delivery as any).responsiblePerson || undefined,
      subRows: [],
    };
  });
}

function convertStatusToTableFormat(status: string): string {
  switch (status) {
    case 'CREATED':
      return 'new';
    case 'IN_PROGRESS':
      return 'acceptance';
    case 'ACCEPTED':
      return 'accepted';
    case 'PREPARATION':
      return 'preparation';
    case 'COMPLETED':
      return 'completed';
    default:
      return 'new';
  }
} 