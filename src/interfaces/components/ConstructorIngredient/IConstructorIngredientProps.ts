export interface IConstructorIngredientProps {
  constructorIngredientId: string;
  ingredientType: string;
  text: string;
  price: number;
  thumbnail: string;
  id?: string;
  type?: string;
  index?: number;
  children?: JSX.Element;
  isLocked?: boolean;
}