import {useLogisticsPriceGetLogisticsPrice} from "@/kubb-gen";

export function LogisticsToFFPrice({supplierIds}:string[]){
    const {refetch} = useLogisticsPriceGetLogisticsPrice({},{query:{enabled:false}})
    refetch()


}