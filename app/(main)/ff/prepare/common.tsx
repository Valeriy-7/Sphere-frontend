import { getColSizeList } from '@/lib/TableHelpers';

export type DeliveryStatus = 'new' | 'acceptance' | 'accepted';

export type DeliveryStatusProps = {
  status: DeliveryStatus;
};

const { colSizeList } = getColSizeList(['w-[60px]', '', '', '', '', '', '', '']);

export { colSizeList };
