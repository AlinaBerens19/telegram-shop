import Order from "@/components/order/Order"
import Navigation from "../../../../components/navigation/NavigationMenu"
import { db } from "@/lib/db"
import { initialProfile  } from "@/lib/initial-profile"

interface IParams {
    menuItemId: string
}

const OrderPage = async ({params}: {params: IParams}) => {

    const profile = await initialProfile();  
    const { menuItemId } = params

    let name = null
    let description = null
    let price = null
    let imageUrl = ''
    let orderId: string = ''
    let orderItemId: string = ''

    if(!profile?.id) {
        throw new Error('User ID is not defined')
    }
    else {
      try {
          let order = await db.order.findFirst({
            where: {
              profileId: profile?.id.toString()
            }
          })
          console.log(`Order found: ${order?.id}`)
          
          if(!order) {
            order = await db.order.create({
              data: {
                profileId: profile?.id!.toString(),
                status: 'ACTIVE'
              }
            })
          }

          orderId = order?.id
          if(!orderId) {
            throw new Error('Order ID is not defined')
          }
          else {
            console.log('Order ID:', orderId)

            let orderItem = await db.orderItem.findFirst({
              where: {
                orderId: orderId.toString()
              }
            })

            if(!orderItem) {
              orderItem = await db.orderItem.create({
                data: {
                  orderId: orderId.toString(),
                  menuItemId: menuItemId.toString(),
                  quantity: 1,
                  totalSum: 0
                }
              })
            }

            orderItemId = orderItem?.id!

            console.log('Order Item ID:', orderItemId)
          }
        }
        catch (error) {
            console.log(`Error creating order: ${error}`)
        }
      
        
        try {
          let data = await db.menuItem.findUnique({
            where: {
              id: menuItemId.toString()
            }
        })

          name = data?.name
          description = data?.description
          price = data?.price
          imageUrl = data?.imageUrl ? data.imageUrl!.replace(/,/g, ''): ''
        }
        catch (error) {
            console.log(`Error retrieving menu item: ${error}`)
        }
      }

      return (
        <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
          <div className='flex flex-col space-y-3 items-center'>
            <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
            <Navigation />
          </div> 
    
          <div>
            <Order 
              userId={profile?.id!}
              hidden={false}
              orderItemId={orderItemId}
              orderId={orderId}
              name={name}
              description={description}
              price={price}
              imageUrl={imageUrl}
            />
          </div> 
        </div>
    )
}

export default OrderPage