'use client'


import MenuItem from "./MenuItem"
import { useEffect, useState } from "react"
import MenuItemModal from "@/app/modals/MenuItemModal"

interface MenuListProps {
  menuItemsList: string[]
}


const MenuList: React.FC<MenuListProps> = ({
  menuItemsList
}) => {

  const [menuItems, setMenuItems] = useState<MenuItemModal[]>([]);


  useEffect(() => {
    let list: MenuItemModal[] = [];
    menuItemsList.map((item) => {
      try {
        let pizzas = item.split(';');
        let pizza = pizzas.toString().split('&');
        let menuItem = new MenuItemModal(pizza[0], pizza[1], pizza[2], parseInt(pizza[3]), pizza[4].replace(/,/g, ''));
        console.log(`MENU ITEM -> ${menuItem.image}`);
        list.push(menuItem);
        
      }
      catch (e) {
        console.log(e);
      }  
    })

    setMenuItems(list);

  }, [menuItemsList]);

  
  return (
    <div className='flex items-center space-y-4 flex-col w-full px-4 py-4'>
        {menuItems.map((item) => (
          <MenuItem 
            key={item.id}
            cardId={item.id}
            cardTitle={item.name}
            cardDescription={item.description}
            cardImage={item.image}
            cardPrice={item.price}
          />
        ))}
    </div>
  )
}

export default MenuList
