'use client'

import { useState } from "react";


export function useCalculate() {

  const [itemsQuantity, setItemsQuantity] = useState<number>(1);  

  const onReduceQuantity = () => {
    if (itemsQuantity >= 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  }

  const onIncreaseQuantity = () => {
    setItemsQuantity(itemsQuantity + 1);
  }

  const totalSum = (price: number) => {
    return itemsQuantity * price!;
  }
  
  return { itemsQuantity, onReduceQuantity, onIncreaseQuantity, totalSum };
}



