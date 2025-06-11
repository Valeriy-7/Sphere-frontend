import { useState, useEffect } from 'react';
import { useCabinetsGetPartners } from '@/kubb-gen/hooks/cabinets/useCabinetsGetPartners';

interface WbCabinetInfo {
  id: string;
  companyName?: string;
  legalCompanyName?: string;
  avatarUrl?: string;
  contactPhone?: string;
  createdAt?: string;
}

export function useWbCabinetInfo() {
  const [linkedWbCabinets, setLinkedWbCabinets] = useState<string[]>([]);
  const [wbCabinetInfo, setWbCabinetInfo] = useState<WbCabinetInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch WB partner cabinets
  const { data: partnersData } = useCabinetsGetPartners({
    type: 'wildberries',
    limit: 100
  });

  // Fetch linked WB cabinets
  useEffect(() => {
    const fetchLinkedCabinets = async () => {
      try {
        const response = await fetch('/api/ff-account/linked-wb-cabinets');
        if (response.ok) {
          const data = await response.json();
          setLinkedWbCabinets(data);
        }
      } catch (error) {
        console.error('Failed to fetch linked WB cabinets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinkedCabinets();
  }, []);

  // Get WB cabinet information from linked cabinets
  useEffect(() => {
    if (linkedWbCabinets.length > 0 && partnersData?.items) {
      // Find the first linked WB cabinet in the partners data
      const linkedCabinet = partnersData.items.find(cabinet => 
        linkedWbCabinets.includes(cabinet.id)
      );
      
      if (linkedCabinet) {
        setWbCabinetInfo({
          id: linkedCabinet.id,
          companyName: linkedCabinet.companyName,
          legalCompanyName: linkedCabinet.legalCompanyName,
          avatarUrl: linkedCabinet.avatarUrl,
          contactPhone: linkedCabinet.companyPhone,
          createdAt: linkedCabinet.createdAt
        });
      }
    }
  }, [linkedWbCabinets, partnersData]);

  return {
    wbCabinetInfo,
    isLoading: isLoading || !partnersData,
    linkedWbCabinets
  };
} 