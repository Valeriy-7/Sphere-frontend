import { Metadata } from 'next';
import MessengerUI from '@/components/messenger/messenger-ui';

export const metadata: Metadata = {
  title: 'Мессенджер',
  description: 'Общайтесь с командой в реальном времени',
};

export default function MessengerPage() {
  return (
    <div className="h-full">
      <MessengerUI />
    </div>
  );
}
