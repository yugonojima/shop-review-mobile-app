import firebase from "firebase";

type UserRef = {
  id: string;
  name: string;
};
type ShopRef = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  user: UserRef;
  text: string;
  score: number;
  imageUrl: string;
  shop: ShopRef;
  updatedAt: firebase.firestore.Timestamp;
  createdAt: firebase.firestore.Timestamp;
};
