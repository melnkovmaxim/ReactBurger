export function getOrderTotalCost(ingredients) {
  return ingredients.reduce((total, current) => total + current.price, 0);
}

export function getReadableOrderStatus(orderStatus) {
  switch (orderStatus) {
    case 'created': {
      return 'Принят';
    }
    case 'pending': {
      return 'В работе';
    }
    case 'done': {
      return 'Выполнен';
    }
    default: {
      return orderStatus;
    }
  }
}

export function getUniqueOrderIngredients(ingredients) {
  const uniqueIngredients = new Map();

  ingredients.forEach(item => {
    const value = uniqueIngredients.has(item._id) ? [...uniqueIngredients.get(item._id), item] : [item];
    uniqueIngredients.set(item._id, value);
  });

  return uniqueIngredients;
}