export interface IIngredientProps {
  id: string;
  name: string;
  image: string;
  price: string;
  type: string;
  showIngredientDetails: (id: string) => void;
}