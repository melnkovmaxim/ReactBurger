import { IIngredient } from "../../models/IIngredient";

export interface IIngredientListProps {
  ingredients: Array<IIngredient>;
  name?: string;
  type: string;
  handleScroll: (type: string) => (inView: boolean, entry:  IntersectionObserverEntry) => void;
}