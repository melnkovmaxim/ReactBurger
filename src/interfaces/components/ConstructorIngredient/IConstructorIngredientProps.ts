export interface IConstructorIngredientProps {
  constructorIngredientId: string;
  ingredientType: string;
  text: string;
  price: number;
  thumbnail: string;
  id?: string;
  type?: "top" | "bottom";
  index?: number;
  children?: JSX.Element;
  isLocked?: boolean;
}