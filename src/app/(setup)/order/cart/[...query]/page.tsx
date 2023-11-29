import { initialProfile  } from "@/lib/initial-profile"
import Navigation from "@/components/navigation/NavigationMenu"
import OrderItem from "@/components/order/OrderItem"
import { db } from "@/lib/db"
import { getOrderItems, updateOrderWithOrderItem } from "@/app/(setup)/actions/db/orderService"
import { useCrypto } from "@/hooks/useEncrypt"
import { extractValuesFromUrl } from '@/lib/extract_values_from_url'

interface IParams {
  query: string;
}

const CartPage = async ({params}: {params: IParams}) => {

  const { validateAndDecrypt } = useCrypto();

  const my_secret_key: string | undefined = process.env.NEXT_PUBLIC_MY_SECRET_KEY!;

  const queryString = params.query
  console.log(`queryString: ${params.query}`)

  const decodedString = decodeURIComponent(queryString);

  // Parse the decoded string using URLSearchParams
  const urlParams = new URLSearchParams(decodedString);

  let orderId = urlParams.get('orderId');
  let quantity = urlParams.get('quantity');
  let totalPrice = urlParams.get('price');
  let menuItemId = urlParams.get('menuItemId');
  let orderIdIv = urlParams.get('orderIdIv');
  let quantityIv = urlParams.get('quantityIv');
  let totalPriceIv = urlParams.get('priceIv');
  let menuItemIdIv = urlParams.get('menuItemIdIv');

  try {
    orderId = validateAndDecrypt(orderId!, orderIdIv!);
    quantity = validateAndDecrypt(quantity!, quantityIv!);
    totalPrice = validateAndDecrypt(totalPrice!, totalPriceIv!);
    menuItemId = validateAndDecrypt(menuItemId!, menuItemIdIv!);

    console.log(`orderId: ${orderId}`);
    console.log(`quantity: ${quantity}`);
    console.log(`totalPrice: ${totalPrice}`);
    console.log(`menuItemId: ${menuItemId}`);
  }
  catch (e) {
    console.log(`Error decrypting: ${e}`);
  }

  let orders: { 
    id: string; 
    name: string | Promise<string | undefined>; 
    description: string | Promise<string | undefined>; 
    price: number | Promise<number | undefined>; 
    imageUrl: string | Promise<string | null | undefined>; 
    quantity: number; 
    totalSum: number 
  }[] = [];
  

  try {

    if (orderId && menuItemId && totalPrice && quantity) {
      await updateOrderWithOrderItem(orderId.toString(), menuItemId!.toString(), parseInt(totalPrice!), parseInt(quantity!));
    }

  } catch (error) {
    console.log(`Error updating order and order item: ${error}`);
    // Handle error if necessary
  }

  try {
    if (orderId) {
      const orderItems = await getOrderItems(orderId.toString());

      for (const orderItem of orderItems) {
        const menuItem = await db.menuItem.findFirst({
          where: {
            id: orderItem.menuItemId.toString(),
          },
        });
      
        const order = {
          id: orderItem.id,
          name: menuItem?.name ?? Promise.resolve(undefined),
          description: menuItem?.description ?? Promise.resolve(undefined),
          price: menuItem?.price ?? Promise.resolve(undefined),
          imageUrl: menuItem?.imageUrl ?? Promise.resolve(null),
          quantity: orderItem.quantity,
          totalSum: orderItem.totalSum,
        };
      
        orders.push(order);
      }
      
    }
  } catch (error) {
    console.log(`Error updating order: ${error}`);
    // Handle error if necessary
  }

  
  return (
    <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
      <div className='flex flex-col space-y-3 items-center'>
        <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
        <Navigation />
        <p>inside</p>
      </div> 
  
      <div className="flex flex-col space-y-3">
        {await Promise.all(orders.map(async (order) => {
          const name = await Promise.resolve(order.name);
          const description = await Promise.resolve(order.description);
          const imageUrl = await Promise.resolve(order.imageUrl);
  
          return (
            <OrderItem 
              key={order.id}
              hidden={true}
              orderId={orderId?.toString()!}
              name={name}
              description={description}
              imageUrl={imageUrl}
              totalSum={order.totalSum}
              itemsQuantity={order.quantity}
            />
          );
        }))}
      </div> 
    </div>
  );
}  

export default CartPage

