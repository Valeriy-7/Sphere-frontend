import { atom } from 'nanostores';
import { type LogisticsPriceDtoType, logisticsPriceGetLogisticsPrice } from '@/kubb-gen';

export const $logisticsPrice = atom<LogisticsPriceDtoType[]>([]);

/*export function addLogisticsPrice(supplierId: string) {
  logisticsPriceGetLogisticsPrice({ supplierId, toPointType: 'FULFILLMENT' }).then((response) => {
    $logisticsPrice.set([...$logisticsPrice.get(), response]);
  });
}*/
