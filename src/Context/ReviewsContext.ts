import { createContext } from "react";
import { Review } from "../types/review";

export type ReviewsContextValue = {
  reviews: Review | null;
  setReviews: (reviews: Review | null) => void;
};

export const UserContext = createContext<ReviewsContextValue>({
  reviews: null,
  setReviews: () => {},
});