export type ToggleFavoriteDtoType = {
  /**
   * @description ID сообщения
   * @type string
   */
  messageId: string
  /**
   * @description Флаг добавления в избранное (true) или удаления из избранного (false)
   * @type boolean
   */
  isFavorite: boolean
}