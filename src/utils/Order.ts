import { IIngredient } from "../interfaces/models/IIngredient";

export function getOrderTotalCost(ingredients) {
  return ingredients.reduce((total, current) => total + current.price, 0);
}

export function getReadableOrderStatus(orderStatus: string): string {
  switch (orderStatus) {
    case 'created': {
      return 'Создан';
    }
    case 'pending': {
      return 'Готовится';
    }
    case 'done': {
      return 'Выполнен';
    }
    default: {
      return orderStatus;
    }
  }
}

export function getUniqueOrderIngredients(ingredients: Array<IIngredient>): Map<string, Array<IIngredient>> {
  const uniqueIngredients = new Map<string, Array<IIngredient>>();

  ingredients.forEach(item => {
    const value = uniqueIngredients.has(item._id) ? [...uniqueIngredients.get(item._id) as Array<IIngredient>, item] : [item];
    uniqueIngredients.set(item._id, value);
  });

  return uniqueIngredients;
}