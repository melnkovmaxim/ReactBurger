export function getOrderTotalCost(ingredients) {
  return ingredients.reduce((total, current) => total + current.price, 0);
}

export function getReadableOrderStatus(orderStatus) {
  switch (orderStatus) {
    case 'created': {
      return 'Создан';
    }
    case 'pending': {
      return 'В ожидании';
    }
    case 'done': {
      return 'Выполнен';
    }
    default: {
      return orderStatus;
    }
  }
}