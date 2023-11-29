'use client';


import { useRouter } from "next/navigation";
import OrderItem from "./OrderItem";
import { useCalculate } from "@/hooks/useCalculateOrder";
import { useCrypto } from "@/hooks/useEncrypt";


interface OrderProps {
    hidden: boolean,
    menuItemId: string | null,
    orderId: string | null,
    name?: string | null,
    description?: string | null,
    price?: number | null,
    imageUrl: string 
}

const Order:React.FC<OrderProps> = ({
    hidden = false,
    menuItemId,
    orderId,
    name,
    description,
    price = 0,
    imageUrl
}) => {


  const { itemsQuantity, onReduceQuantity, onIncreaseQuantity, totalSum } = useCalculate();

  const { validateAndEncrypt } = useCrypto();

  const router = useRouter();


  const handleAddMenuItem = async () => {
    try {
      if (!orderId) {
        throw new Error('Order ID is not defined');
      }
      if (!menuItemId) {
        throw new Error('Menu Item ID is not defined');
      }
      if (!itemsQuantity) {
        throw new Error('Items Quantity is not defined');
      }
      if (!price) {
        throw new Error('The Price is not defined');
      }

      const quantityEn = validateAndEncrypt(itemsQuantity.toString());
      const totalPriceEn = validateAndEncrypt(totalSum(price).toString()); // Remove '!' after price
      const orderIdEn = validateAndEncrypt(orderId.toString());
      const menuItemIdEn = validateAndEncrypt(menuItemId.toString());

      console.log(`order encripted value: ${orderIdEn.value}`);

      router.push(`/order/cart/orderId=${orderIdEn.value}&orderIdIv=${(orderIdEn.iv)}&menuItemId=${menuItemIdEn.value}&menuItemIdIv=${menuItemIdEn.iv}&quantity=${quantityEn.value}&quantityIv=${quantityEn.iv}&price=${totalPriceEn.value}&priceIv=${totalPriceEn.iv}`);
    } catch (error) {
      console.log(`Error creating or updating order: ${error}`);
      // Handle error if necessary
    }
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
      totalSum={totalSum(price!)}
    />
  )
}

export default Order
