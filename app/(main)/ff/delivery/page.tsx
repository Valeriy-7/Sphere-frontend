import { Card } from '@/components/ui/card';
import Image from 'next/image';
import DeliveryNewPage from './new/page';
import DeliveryAcceptancePage from './acceptance/page';
import DeliveryAcceptedPage from './accepted/page';
export default function DeliveryPage() {
  return (
    <div className={'border-primary'}>
      <DeliveryNewPage></DeliveryNewPage>
      <DeliveryAcceptancePage></DeliveryAcceptancePage>
      <DeliveryAcceptedPage></DeliveryAcceptedPage>
    </div>
  );
}
