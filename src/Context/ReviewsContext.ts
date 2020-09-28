import { createContext } from "react";
import { Review } from "../types/review";

export type ReviewsContextValue = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewsContextValue>({
  reviews: [],
  setReviews: () => {},
});