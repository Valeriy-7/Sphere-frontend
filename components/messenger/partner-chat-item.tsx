import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';
import { PartnerCabinetDtoType } from '@/kubb-gen';

interface PartnerChatItemProps {
  partner: PartnerCabinetDtoType & {
    unreadMessages?: number;
    lastMessage?: string;
    messageStatus?: 'read' | 'sent' | 'delivered' | 'pending';
  };
  isSelected: boolean;
  onClick: () => void;
}

const PartnerChatItem = ({ partner, isSelected, onClick }: PartnerChatItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  const getAvatarFallback = () => {
    return partner.companyName?.charAt(0).toUpperCase() || 'П';
  };

  const formatTime = (date: string | Date) => {
    const now = new Date();
    const partnerDate = new Date(date);

    // If it's today, show time
    if (partnerDate.toDateString() === now.toDateString()) {
      return partnerDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    // If it's yesterday, show "Вчера"
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (partnerDate.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    }

    // Otherwise show date
    return partnerDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  // Получаем тип кабинета
  const getCabinetTypeText = (type: string): string => {
    switch (type) {
      case 'fulfillment':
        return 'Фулфилмент';
      case 'wildberries':
        return 'Wildberries';
      default:
        return 'Не указан';
    }
  };

  // Получаем аббревиатуру юридического названия компании
  const getCompanyAbbreviation = (legalName: string = ''): string => {
    if (!legalName) return 'ООО';
    if (legalName.startsWith('ООО ')) {
      return 'ООО';
    }
    return legalName.substring(0, 3);
  };

  // Получаем короткое название компании (без юридической формы)
  const getShortCompanyName = (companyName: string = '', legalName: string = ''): string => {
    // Если название пустое или состоит только из ОБЩ - возвращаем оригинал
    if (!companyName || companyName.trim() === 'ОБЩ') {
      return legalName || 'Неизвестная компания';
    }

    // Убираем префикс "ОБЩ" в начале, если он есть
    if (companyName.toUpperCase().startsWith('ОБЩ ')) {
      companyName = companyName.substring(4).trim();
    }

    // Получаем аббревиатуру (ООО, ИП, и т.д.)
    const abbr = getCompanyAbbreviation(legalName);

    // Если название начинается с "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ" или подобного
    if (companyName.toUpperCase().startsWith('ОБЩЕСТВО С')) {
      // Ищем кавычки в названии
      const quoteStart = companyName.indexOf('"');
      const quoteEnd = companyName.lastIndexOf('"');

      if (quoteStart !== -1 && quoteEnd !== -1 && quoteStart < quoteEnd) {
        // Извлекаем название в кавычках
        return `${abbr} ${companyName.substring(quoteStart + 1, quoteEnd)}`;
      }

      // Если кавычек нет, пытаемся взять последнее слово или часть строки
      const parts = companyName.split(' ');
      if (parts.length > 3) {
        return `${abbr} ${parts.slice(3).join(' ')}`;
      }
    }

    // Проверяем, есть ли в названии компании уже аббревиатура
    if (companyName.toUpperCase().startsWith(abbr.toUpperCase())) {
      return companyName;
    }

    // Просто добавляем аббревиатуру к названию
    return `${abbr} ${companyName}`;
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted/50',
        isSelected && 'bg-primary/10',
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Чат с ${partner.companyName}`}
    >
      <div className="relative">
        <Avatar
          className={cn(
            'h-10 w-10 border',
            partner.type === 'fulfillment'
              ? 'border-purple-200 bg-purple-50'
              : 'border-muted/30 bg-muted/10',
          )}
        >
          <AvatarImage src={partner.avatarUrl || undefined} />
          <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
        </Avatar>
        {(partner.unreadMessages ?? 0) > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {partner.unreadMessages}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate text-sm font-medium">
            {getShortCompanyName(partner.companyName, partner.legalCompanyName)}
          </h3>
          <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
            {formatTime(partner.createdAt)}
          </span>
        </div>
        <div className="mt-0.5 flex items-center justify-between">
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {partner.lastMessage || getCabinetTypeText(partner.type)}
          </p>
          {partner.messageStatus === 'read' && (
            <CheckCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
          )}
          {partner.messageStatus === 'sent' && (
            <Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerChatItem;
