import { initialProfile  } from "@/lib/initial-profile"
import Navigation from "@/components/navigation/NavigationMenu"
import OrderItem from "@/components/order/OrderItem"
import { db } from "@/lib/db"


interface IParams {
    query: string
}

const CartPage = async ({params}: {params: IParams}) => {

  const queryString = params.query

  const decodedString = decodeURIComponent(queryString);

  // Parse the decoded string using URLSearchParams
  const urlParams = new URLSearchParams(decodedString);

  // Get individual query parameters
  const userId = urlParams.get('userId');
  const orderItemId = urlParams.get('orderItemId');
  const orderId = urlParams.get('orderId');
  const quantity = urlParams.get('quantity');
  const totalPrice = urlParams.get('totalPrice');

  const id = orderItemId ? orderItemId : ''

  let orders: { id: string; name: Promise<string | undefined>; description: Promise<string | undefined>; price: Promise<number | undefined>; imageUrl: Promise<string | null | undefined>; quantity: number; totalSum: number }[] = []

  try {
    const order_item_updated = await db.orderItem.update({
      where: {
        id: id.toString()
      },
      data: {
        quantity: parseInt(quantity!),
        totalSum: parseInt(totalPrice!)
      }
    })

    console.log(`Order item updated: ${order_item_updated.menuItemId}`)

    if(orderId) {
      const is_order = await db.order.update({
        where: {
          id: orderId.toString()
        },
        data: {
          orderItems: {
            // Assuming orderItems is an array in your order model
            set: [order_item_updated]
          }
        }
      })

      console.log(`Order updated: ${is_order.id}`)
   }
  }
  catch(error) {
    console.log(`Error updating order: ${error}`)
  }
  

  try {
    if(orderId) {
      const order_items = await db.orderItem.findMany({
        where: {
          orderId: orderId.toString()
        }
      })

      order_items.forEach((order_item) => {
        const menu_item = db.menuItem.findFirst({
          where: {
            id: order_item.menuItemId.toString()
          }
        })

        const order = {
          id: order_item.id,
          name: menu_item.then((menu_item) => {
            return menu_item?.name
          }),
          description: menu_item.then((menu_item) => {
            return menu_item?.description
          }),
          price: menu_item.then((menu_item) => {
            return menu_item?.price
          }),
          imageUrl: menu_item.then((menu_item) => {
            return menu_item?.imageUrl
          }),
          quantity: order_item.quantity,
          totalSum: order_item.totalSum
        }

        orders.push(order)
      })

    }
  }
  catch(error) {
    console.log(`Error updating order: ${error}`)
  }

  
  return (
    <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
      <div className='flex flex-col space-y-3 items-center'>
        <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
        <Navigation />
      </div> 

      <div className="flex flex-col space-y-3">
        {
          orders.map(async (order) => {
            const name = await order.name.then((name) => {
              return name
            })
            const description = await order.description.then((description) => {
              return description
            })
            const imageUrl = await order.imageUrl.then((imageUrl) => {
              return imageUrl
            })
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
            )
          })
        }
      </div> 
    </div>
  )
}

export default CartPage

