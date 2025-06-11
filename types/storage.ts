export interface StorageSummary {
  currentStock: {
    products: number;
    items: number;
    defects: number;
    returnsFromPickup: number;
    totalProdukts: number;
    totalTovars: number;
  };
  consumables: {
    ff: number;
    stores: number;
  };
  received: {
    items: number;
    defects: number;
    consumables: number;
  };
  shipped: {
    toWB: number;
    otherMarketplaces: number;
    defects: number;
  };
}

export interface StorageProductSize {
  id: string;
  sizeKey: string;
  sizeDisplay: string;
  wbSize?: string;
  techSize?: string;
  storageLocation?: string;
  factQuantity: number;
  defects: number;
  goods: number;
  tovarQuantity: number;
  produktQuantity: number;
  preparationStatus: 'pending' | 'completed';
}

export interface StorageProduct {
  id: string;
  name: string;
  article: string;
  imageUrl?: string;
  storageLocation?: string;
  totalQuantity: number;
  totalDefects: number;
  totalGoods: number;
  totalProdukts: number;
  totalTovars: number;
  sizes: StorageProductSize[];
  deliveryId?: string;
  deliveryStatus?: string;
  ffDeliveryStatus?: string;
}

export interface StorageSupplier {
  id: string;
  name: string;
  address?: string;
  legalName?: string;
  imageUrl?: string;
  totalProducts: number;
  totalItems: number;
  totalDefects: number;
  totalConsumables: number;
  totalReturns: number;
  totalProdukts: number;
  totalTovars: number;
  products: StorageProduct[];
  dailyChanges?: {
    products: { gained: number; lost: number; };
    items: { gained: number; lost: number; };
    defects: { gained: number; lost: number; };
    consumables: { gained: number; lost: number; };
    returns: { gained: number; lost: number; };
  };
}

export interface StorageData {
  summary: StorageSummary;
  suppliers: StorageSupplier[];
}

// API Response types
export interface StorageApiResponse {
  data?: StorageData;
  message?: string;
  error?: string;
}

export interface SupplierStorageApiResponse {
  data?: StorageSupplier;
  message?: string;
  error?: string;
} 