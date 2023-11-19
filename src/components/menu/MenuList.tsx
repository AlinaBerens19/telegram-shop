'use client'

import MenuItem from "./MenuItem"


interface MenuListProps {
    
}


const MenuList: React.FC<MenuListProps> = () => {
  return (
    <div className='flex items-center space-y-4 flex-col w-full px-4 py-4'>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </div>
  )
}

export default MenuList
