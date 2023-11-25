import React from 'react'
import { Button } from "../ui/button"
import { Divide } from 'lucide-react'

interface OrderItemProps {
    orderId?: string | null,
    itemsQuantity?: number | null,
    name?: string | undefined | null,
    description?: string | null,
    imageUrl?: string | null,
    onReduceQuantity?: () => void | null,
    onIncreaseQuantity?: () => void | null,
    handleAddMenuItem?: () => void,
    totalSum: number,
    hidden: boolean
}

const OrderItem:React.FC<OrderItemProps> = ({
    orderId,
    hidden = false,
    itemsQuantity,
    name,
    description,
    imageUrl,
    onReduceQuantity,
    onIncreaseQuantity,
    handleAddMenuItem,
    totalSum
}) => {

  const img = imageUrl ? imageUrl : ''

  return (
    <div className="flex flex-col justify-center p-4 w-fit overflow-hidden space-y-2">

      <div className="flex flex-row items-top lg:space-x-4 space-x-2">
        <img src={img} alt="Pizza" className="h-20 w-20 object-cover rounded-md"/>
        <div className="flex flex-col space-y-1">
          <p className="text-xl text-bold">{name}</p>
          <p className="text-md text-light">{description}</p>
        </div>
        {hidden && (
          <div className="flex flex-row items-center justify-center space-x-3">
            {/* <Button className='text-white' variant='quantity' size='sm' onClick={onReduceQuantity}>-</Button> */}
            <p>({itemsQuantity})</p>
            {/* <Button className='text-white' variant='quantity' size='sm' onClick={onIncreaseQuantity}>+</Button> */}
            <p className="text-xl text-bold">{totalSum}$</p>
          </div>
        )}
      </div>

      {!hidden && (
        <div className="flex flex-row justify-between items-center pt-4">
          <div className="flex flex-row space-x-3 items-center">
            <Button className='text-white' variant='quantity' size='sm' onClick={onReduceQuantity}>-</Button>
            <p>{itemsQuantity}</p>
            <Button className='text-white' variant='quantity' size='sm' onClick={onIncreaseQuantity}>+</Button>
            <p className="text-xl text-bold">{totalSum}$</p>
          </div>
        
          <Button className='text-white' onClick={handleAddMenuItem} variant='default' size='default'>Add</Button>
        </div>
      )}
      </div>
      
  )
}

export default OrderItem
