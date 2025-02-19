import DeliveryFF from "./delivery/ff/page";
import DeliveryFFCreatePage from "./delivery/ff/create/page";
import StorageFF from "./storage/ff/page";
import StorageWB from "./storage/wb/page";

export default function WBHomePage() {
  return (
    <>
      <StorageFF />
      <StorageWB />
      <DeliveryFF />
      <DeliveryFFCreatePage />
    </>
  );
}
