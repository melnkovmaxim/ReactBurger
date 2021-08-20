import componentStyles from './IngredientIconList.module.css';
import IngredientIcon from "../IngredientIcon/IngredientIcon";

const IngredientIconList = ({ ingredients }) => {
  const ingredientsById = new Map();
  const bun = ingredients.find(item => item.type === "bun");
  const maxIngredientIconIndex = 50;

  ingredients.forEach(item => {
    if (item.type !== "bun") {
      const value = ingredientsById.has(item.id) ? [...ingredientsById.get(item.id), item] : [item];
      ingredientsById.set(item.id, value);
    }
  });

  const sortIngredientsByCount = (a, b) => {
    const firstTypeIngredientsCount = ingredientsById.get(a).length;
    const secondTypeIngredientsCount = ingredientsById.get(b).length;

    if (firstTypeIngredientsCount > secondTypeIngredientsCount) return 1;
    if (secondTypeIngredientsCount > firstTypeIngredientsCount) return -1;

    return 0;
  }
  return (<div className={ componentStyles.container }>
    { bun && (<div style={ { zIndex: maxIngredientIconIndex } }><IngredientIcon image_mobile={ bun.image_mobile } name={ bun.name }
                                                                                count={ 1 }/></div>) }
    { Array.from(ingredientsById.keys()).sort(sortIngredientsByCount).slice(0, 7).map((key, index) =>
      (<div key={ ingredientsById.get(key)[0].id } className={ componentStyles.listElement }
            style={ { zIndex: maxIngredientIconIndex - index - 1 } }>
        <IngredientIcon image_mobile={ ingredientsById.get(key)[0].image_mobile } name={ ingredientsById.get(key)[0].name }
                        count={ ingredientsById.get(key).length }/>
      </div>)
    ) }
  </div>)
}

export default IngredientIconList;