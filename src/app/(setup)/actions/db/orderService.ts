// orderService.ts
import { db } from "@/lib/db";



export async function createOrUpdateOrder(profileId: string, menuItemId: string) {
  try {
    let order = await db.order.findFirst({
      where: {
        profileId: profileId,
      },
    });

    console.log(`Order found: ${order?.id}`);

    if (!order) {
      order = await db.order.create({
        data: {
          profileId: profileId,
          status: 'ACTIVE',
        },
      });
    }

    return order?.id
    
  } catch (error) {
    console.log(`Error creating order: ${error}`);
    throw error;
  }
}

export async function getMenuItemDetails(menuItemId: string) {
  try {
    const data = await db.menuItem.findUnique({
      where: {
        id: menuItemId,
      },
    });

    return {
      name: data?.name,
      description: data?.description,
      price: data?.price,
      imageUrl: data?.imageUrl ? data.imageUrl!.replace(/,/g, '') : '',
    };
  } catch (error) {
    console.log(`Error retrieving menu item: ${error}`);
    throw error;
  }
}


async function checkIfOrderItemWithSameMenuItemExists(menuItemId: string, orderId: string, totalSum: number, qu: number) {
  try {
    const orderItem = await db.orderItem.findFirst({
      where: {
        orderId: orderId,
        menuItemId: menuItemId,
      }
    });

    if (orderItem) {
      await db.orderItem.update({
        where: {
          id: orderItem.id,
        },
        data: {
          quantity: qu,
          totalSum: totalSum,
        },
      });
      return true;
    }

    return false;
  } catch (error) {
    console.log(`Error updating order item: ${error}`);
    throw error;
  }
}

export async function updateOrderWithOrderItem(orderId: string, menuItemId: string, totalSum: number, qu: number) {
    try {
      if(!await checkIfOrderItemWithSameMenuItemExists(menuItemId, orderId, totalSum, qu)) {
        const isOrderUpdated = await db.order.update({
          where: {
            id: orderId,
          },
          data: {
            orderItems: {
              create: [
                {
                  menuItemId: menuItemId,
                  quantity: qu,
                  totalSum: totalSum,
                },
              ],
            },
          },
        });
    
        console.log(`Order updated: ${isOrderUpdated.id}`);
    }
    } catch (error) {
      console.log(`Error updating order: ${error}`);
      throw error;
    }
  }
  
  

export async function getOrderItems(orderId: string) {
  try {
    const orderItems = await db.orderItem.findMany({
      where: {
        orderId: orderId,
      },
    });

    return orderItems;
  } catch (error) {
    console.log(`Error getting order items: ${error}`);
    throw error;
  }
}

