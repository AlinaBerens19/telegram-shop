'use client';


import { useRouter } from "next/navigation";
import OrderItem from "./OrderItem";
import { useCalculate } from "@/hooks/useCalculateOrder";


interface OrderProps {
    hidden: boolean,
    orderId: string | null,
    userId: string | null,
    orderItemId: string,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    imageUrl: string 
}

const Order:React.FC<OrderProps> = ({
    hidden = false,
    orderId,
    userId,
    orderItemId,
    name,
    description,
    price,
    imageUrl
}) => {

  const { itemsQuantity, onReduceQuantity, onIncreaseQuantity, totalSum } = useCalculate();

  const router = useRouter();

  const my_price = price ? price : 0

  const handleAddMenuItem = async () => {
    const queryString = `orderItemId=${orderItemId}&orderId=${orderId}&quantity=${itemsQuantity}&totalPrice=${totalSum(my_price)}`;
    const urlString = `/order/cart/${queryString}`;
    router.push(urlString);
  };


  return (
    <OrderItem 
      hidden={hidden} 
      name={name}
      description={description}
      imageUrl={imageUrl}
      handleAddMenuItem={handleAddMenuItem}
      itemsQuantity={itemsQuantity}
      onReduceQuantity={onReduceQuantity}
      onIncreaseQuantity={onIncreaseQuantity}
      totalSum={totalSum(my_price)}
    />
  )
}

export default Order
