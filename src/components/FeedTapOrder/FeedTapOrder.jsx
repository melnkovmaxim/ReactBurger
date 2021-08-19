import componentStyles from './FeedTapOrder.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIconList from "../IngredientIconList/IngredientIconList";
import getOrderReadableDate from "../../utils/Date";

const FeedTapOrder = ({ order, originalIngredients }) => {
  const mappedIngredients = order.ingredients && order.ingredients.map(item => {
    const originalIngredient = originalIngredients.find(original => original._id === item);
    return {
      id: originalIngredient._id,
      name: originalIngredient.name,
      link: originalIngredient.image_mobile,
      type: originalIngredient.type,
      price: originalIngredient.price
    };
  });
  const bun = mappedIngredients.find(item => item.type === "bun");
  const bunPrice = bun ? bun.price : 0;

//{format(zonedDate, pattern, { timeZone })} Сегодня, 16:20 i-GMT+3
  return (<div className={ `pt-6 pb-6 pl-6 pr-6 ${ componentStyles.container }` }>
        <div className={ componentStyles.spaceBetween }>
          <p className="text text_type_digits-default">#{ order.number }</p>
          <p className="text text_type_main-default text_color_inactive">{getOrderReadableDate(order.createdAt)}</p>
        </div>
        <p className="mt-6 text text_type_main-medium">
          {order.name}
        </p>
        <div className={ `mt-6 ${ componentStyles.spaceBetween }` }>
          { mappedIngredients && <IngredientIconList ingredients={ mappedIngredients }/> }
          <div className={ `ml-6 ${ componentStyles.spaceBetween }` }>
            <p className="mr-2 text text_type_digits-default">{mappedIngredients.reduce((total, current) => total + current.price, 0) + bunPrice}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
  );
}

export default FeedTapOrder;