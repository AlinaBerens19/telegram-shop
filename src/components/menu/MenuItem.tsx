'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import { useClerk } from '@clerk/clerk-react';
  
interface MenuItemProps {
  cardId: string,
  cardTitle?: string,
  cardDescription?: string,
  cardImage?: string,
  cardPrice?: number,      
}


const MenuItem:React.FC<MenuItemProps> = ({
    cardId,
    cardTitle,
    cardDescription,
    cardImage,
    cardPrice,
}) => {

  const router = useRouter();

  const { user } = useClerk();
  const userId  = user?.id.toString();

  const handleNavigate = () => {
    if (!userId) {
      throw new Error('User ID is not defined');
    }
    router.push(`/order/${cardId}`);
  };

  let priceColor = 'text-gray-700'; // default color

  if (typeof localStorage !== 'undefined') {
    const theme = localStorage.getItem('theme');
    priceColor = theme === 'dark' ? 'text-white' : 'text-gray-700';
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
            <img src={cardImage} alt="Pizza" className="h-full w-full object-cover rounded-md"/>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNavigate} className="mr-4 bg-gray-800" variant='outline' size='default'>Order</Button>
          <p className="text-xl text-bold priceColor">{cardPrice}$</p>
        </CardFooter>

     </Card>

  )
}

export default MenuItem
