export const messagesControllerFindEventsQueryParamsFilterEnum = {
  ALL: 'ALL',
  FF: 'FF',
  WB: 'WB',
} as const;

export type MessagesFindEventsQueryParamsFilterEnumType =
  (typeof messagesControllerFindEventsQueryParamsFilterEnum)[keyof typeof messagesControllerFindEventsQueryParamsFilterEnum];

export type MessagesFindEventsQueryParamsType = {
  /**
   * @description ID чата
   * @type string
   */
  chatId: string;
  /**
   * @description Фильтр поставок
   * @default "ALL"
   * @type string
   */
  filter: MessagesFindEventsQueryParamsFilterEnumType;
  /**
   * @description Количество событий на странице
   * @default 20
   * @type number
   */
  limit: number;
  /**
   * @description Смещение (для пагинации)
   * @default 0
   * @type number
   */
  offset: number;
  /**
   * @description Поисковый запрос
   * @type string | undefined
   */
  search?: string;
};

/**
 * @description Список событий успешно получен
 */
export type MessagesFindEvents200Type = any;

export type MessagesFindEventsQueryResponseType = MessagesFindEvents200Type;

export type MessagesFindEventsTypeQuery = {
  Response: MessagesFindEvents200Type;
  QueryParams: MessagesFindEventsQueryParamsType;
  Errors: any;
};
