import Navigation from "../../../components/navigation/NavigationMenu"
import MenuList from "../../../components/menu/MenuList"

const MenuPage = () => {
    return (
        <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
          <div className='flex flex-col space-y-3 items-center'>
            <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
            <Navigation />
          </div> 
    
          <div>
            <MenuList />
          </div> 
        </div>
    )
}

export default MenuPage
