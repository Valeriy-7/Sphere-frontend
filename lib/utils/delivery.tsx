import {DeliveryStatusType} from "@/kubb-gen";

export const DELIVERY_STATUS_MAP:Record<DeliveryStatusType, string> = {
    CREATED:'Создано',
    IN_PROGRESS:'В работе',
    ACCEPTED:'Принято',
    PREPARATION:'Подготовка',
    COMPLETED:'Выполнено'
}
export const DELIVERY_COLOR_MAP:Record<DeliveryStatusType, string> = {
    CREATED:'bg-yellow-500',
    IN_PROGRESS:'bg-yellow-500',
    ACCEPTED:'bg-yellow-500',
    PREPARATION:'bg-yellow-500',
    COMPLETED:'bg-green-500'
}