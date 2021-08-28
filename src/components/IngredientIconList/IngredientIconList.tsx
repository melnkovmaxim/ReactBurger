import componentStyles from './IngredientIconList.module.css';
import IngredientIcon from "../IngredientIcon/IngredientIcon";
import PropTypes from "prop-types";
import { IIngredientIconListProps } from "../../interfaces/components/IngredientIconList/IIngredientIconListProps";
import { IIngredient } from "../../interfaces/models/IIngredient";

const IngredientIconList = ({ ingredients }: IIngredientIconListProps): JSX.Element => {
  const uniqueIngredients = new Map<string, Array<IIngredient>>();
  const bun: IIngredient | undefined = ingredients.find(item => item.type === "bun");
  const maxIngredientIconIndex: number = 50;

  ingredients.forEach(item => {
    if (item.type !== "bun") {
      const value: Array<IIngredient> = uniqueIngredients.has(item._id) ? [...uniqueIngredients.get(item._id) as Array<IIngredient>, item] : [item];
      uniqueIngredients.set(item._id, value);
    }
  });

  const sortIngredientsByCount = (a, b) => {
    const firstTypeIngredientsCount: number = a.length;
    const secondTypeIngredientsCount: number = b.length;

    if (firstTypeIngredientsCount > secondTypeIngredientsCount) return 1;
    if (secondTypeIngredientsCount > firstTypeIngredientsCount) return -1;

    return 0;
  }
  return (<div className={ componentStyles.container }>
    { bun && (<div style={ { zIndex: maxIngredientIconIndex } }>
                <IngredientIcon image_mobile={ bun.image_mobile } name={ bun.name } count={ 1 }/>
              </div>) }
    { Array.from(uniqueIngredients.values()).sort(sortIngredientsByCount).slice(0, 7).map((value, index) =>
      (<div key={ value[0]._id } className={ componentStyles.listElement } style={ { zIndex: maxIngredientIconIndex - index - 1 } }>
        <IngredientIcon image_mobile={ value[0].image_mobile } name={ value[0].name } count={ value.length }/>
      </div>)
    ) }
  </div>)
}

export default IngredientIconList;