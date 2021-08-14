import componentStyles from './FeedTapOrder.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIconList from "../IngredientIconList/IngredientIconList";
import { useSelector } from "react-redux";

const FeedTapOrder = () => {
  const ingredients = useSelector(store => store.ingredients.constructorItems);
  const mappedIngredients = ingredients.map(item => ({
    id: item._id,
    name: item.name,
    link: item.image_mobile,
    type: item.type
  }));

  return (
    <div className={ `pt-6 pb-6 pl-6 pr-6 ${ componentStyles.container }` }>
      <div className={ componentStyles.spaceBetween }>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className="mt-6 text text_type_main-medium">
        Death Star Starship Main Бургер
      </p>
      <div className={ `mt-6 ${ componentStyles.spaceBetween }` }>
        <IngredientIconList ingredients={ mappedIngredients }/>
        <div className={ `ml-6 ${ componentStyles.spaceBetween }` }>
          <p className="mr-2 text text_type_digits-default">480</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}

export default FeedTapOrder;