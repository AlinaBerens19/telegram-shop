import Order from "@/components/order/Order"
import Navigation from "../../../../components/navigation/NavigationMenu"
import { initialProfile  } from "@/lib/initial-profile"
import { createOrUpdateOrder, getMenuItemDetails } from "../../actions/db/orderService"

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

    if (!profile?.id) {
      throw new Error('User ID is not defined');
    } else {
      
      try {
        orderId = await createOrUpdateOrder(
          profile.id!.toString(),
          menuItemId.toString()
        );
  
        // orderId = orderIdResult;
        // orderItemId = orderItemIdResult;
      } catch (error) {
        console.log(`Error creating or updating order: ${error}`);
        // Handle error if necessary
      }
  
      try {
        const menuItemDetails = await getMenuItemDetails(menuItemId.toString());
  
        name = menuItemDetails.name;
        description = menuItemDetails.description;
        price = menuItemDetails.price;
        imageUrl = menuItemDetails.imageUrl;
      } catch (error) {
        console.log(`Error retrieving menu item details: ${error}`);
        // Handle error if necessary
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
              hidden={false}
              menuItemId={menuItemId}
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