import { Shop } from "./shop";

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Shop: { shop: Shop };
  Search: undefined;
  User: undefined;
  CreateReview: { shop: Shop };
};
