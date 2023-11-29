
import { atom, selector } from 'recoil';

// Define atoms for each piece of state
export const orderIdState = atom({
  key: 'orderIdState',
  default: '',
});

export const menuItemIdState = atom({
  key: 'menuItemIdState',
  default: '',
});

export const itemsQuantityState = atom({
  key: 'itemsQuantityState',
  default: '',
});

export const totalPriceState = atom({
  key: 'totalPriceState',
  default: '',
});

// Define a selector to combine the states into a single object
export const orderDataSelector = selector({
  key: 'orderDataSelector',
  get: ({ get }) => {
    return {
      orderId: get(orderIdState),
      menuItemId: get(menuItemIdState),
      itemsQuantity: get(itemsQuantityState),
      totalPrice: get(totalPriceState),
    };
  },
});

// No need to create a separate store in Recoil, as it automatically manages state
