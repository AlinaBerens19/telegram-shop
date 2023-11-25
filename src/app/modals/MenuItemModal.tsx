import { UUID } from "crypto";


class MenuItemModal {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
  
    constructor(id: string, name: string, description: string, price: number, image: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = image;
    }

    getString() {
      return `${this.id}&${this.name}&${this.description}&${this.price}&${this.image};`
    }
  }
  
  export default MenuItemModal;
  