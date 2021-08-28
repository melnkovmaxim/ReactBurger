export interface IOrder {
  _id: string;
  ingredients: Array<string>;
  status: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  total: number;
  totalToday: number;
}