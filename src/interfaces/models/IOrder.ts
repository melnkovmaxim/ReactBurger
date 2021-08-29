export interface IOrder {
  _id: string;
  name: string;
  ingredients: Array<string>;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  total: number;
  totalToday: number;
}