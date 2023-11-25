import Navigation from "../../../components/navigation/NavigationMenu"
import MenuList from "../../../components/menu/MenuList"
import { db } from "../../../lib/db"
import MenuItemModal from "@/app/modals/MenuItemModal"



const MenuPage = async () => {

    let data = await db.menuItem.findMany()

    let menuItemsList: string[] = [];

    data.forEach(item => {
      try {
        let menuItem = new MenuItemModal(item.id, item.name, item.description, item.price, item.imageUrl ? item.imageUrl! : '');
        menuItemsList.push(menuItem.getString());
      }
      catch (e) {
        console.log(e);
      }  
    });


    return (
        <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
          <div className='flex flex-col space-y-3 items-center'>
            <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
            <Navigation />
          </div> 
    
          <div>
            <MenuList menuItemsList={menuItemsList}/>
          </div> 
        </div>
    )
}



export default MenuPage
