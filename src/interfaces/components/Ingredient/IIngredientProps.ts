export interface IIngredientProps {
  id: string;
  name: string;
  image: string;
  price: number;
  type: string;
  showIngredientDetails: (id: string) => void;
}