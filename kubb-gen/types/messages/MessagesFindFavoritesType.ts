export type MessagesFindFavoritesQueryParamsType = {
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
 * @description Список избранных сообщений успешно получен
 */
export type MessagesFindFavorites200Type = any;

export type MessagesFindFavoritesQueryResponseType = MessagesFindFavorites200Type;

export type MessagesFindFavoritesTypeQuery = {
  Response: MessagesFindFavorites200Type;
  QueryParams: MessagesFindFavoritesQueryParamsType;
  Errors: any;
};
