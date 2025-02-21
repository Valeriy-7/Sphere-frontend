import DeliveryMpNewPage from '@/app/(main)/ff/delivery/new/page';
import DeliveryMpAcceptancePage from '@/app/(main)/ff/delivery/acceptance/page';
import DeliveryMpAcceptedPage from '@/app/(main)/ff/delivery/accepted/page';
import Services from '@/app/(main)/ff/services//service/page';
import Storage from '@/app/(main)/ff/storage/page';
import StorageFF from '@/app/(main)/wb/storage/ff/page';
import PreparePage from '@/app/(main)/ff/prepare/page';
export default function FFHomePage() {
  return (
    <>
      <Storage />
      <DeliveryMpNewPage />
      <DeliveryMpAcceptancePage />
      <DeliveryMpAcceptedPage />

      <StorageFF />
      <PreparePage />
      <Services />
    </>
  );
}
