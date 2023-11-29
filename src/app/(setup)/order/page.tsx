import { initialProfile  } from "@/lib/initial-profile"
import Navigation from "../../../components/navigation/NavigationMenu"
import OrderItem from "@/components/order/OrderItem"


interface IParams {
    query: string
}

const YourOrderPage = async ({params}: {params: IParams}) => {

  const query = params.query

  console.log('Query:', query);
  
  return (
    <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
      <div className='flex flex-col space-y-3 items-center'>
        <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
        <Navigation />
        <p>outside</p>
      </div> 

      <div className="flex flex-col space-y-3">
        <OrderItem 
          hidden={true}
          orderId={null}
          name={null}
          description={null}
          imageUrl={null}
          totalSum={0}
          itemsQuantity={0}
        />
      </div> 
    </div>
  )
}

export default YourOrderPage
