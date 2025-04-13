import { Metadata } from 'next';
import MessengerUI from '@/components/messenger/messenger-ui';
import { WebSocketProvider } from '@/components/messenger/websocket-context';

export const metadata: Metadata = {
  title: 'Мессенджер',
  description: 'Общайтесь с командой в реальном времени',
};

export default function MessengerPage() {
  return (
    <div className="messenger-page h-full w-full overflow-hidden">
      <WebSocketProvider>
        <MessengerUI />
      </WebSocketProvider>
    </div>
  );
}
