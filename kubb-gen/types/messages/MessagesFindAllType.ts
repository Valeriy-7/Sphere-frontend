export type MessagesFindAllQueryParamsType = {
  /**
   * @description ID чата
   * @type string
   */
  chatId: string;
  /**
   * @description Количество сообщений на странице
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
 * @description Список сообщений успешно получен
 */
export type MessagesFindAll200Type = any;

export type MessagesFindAllQueryResponseType = MessagesFindAll200Type;

export type MessagesFindAllTypeQuery = {
  Response: MessagesFindAll200Type;
  QueryParams: MessagesFindAllQueryParamsType;
  Errors: any;
};
