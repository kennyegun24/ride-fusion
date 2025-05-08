import useSWR from "swr";
import axios from "axios";
import React from "react";
import useAuth from "./userAuth";
import { getAuth } from "firebase/auth";

const PAGE_SIZE = 10; // reviews per batch

export type Review = {
  _id: string;
  user: {
    fullName: string;
  };
  // car?: string;
  // ratedUser?: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

type PaginatedReviewsResponse = {
  reviews: Review[];
};

const fetcher = async (url: string) => {
  const user = await getAuth();
  const token = await user.currentUser?.getIdToken();

  return await axios
    .get<PaginatedReviewsResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function usePaginatedReviews(
  baseUrl: string,
  queryParamName: string,
  id: string
) {
  const [page, setPage] = React.useState(0); // Track the current page
  const { data, error, isValidating } = useSWR(
    `${baseUrl}?id=${id}&skip=${
      page * PAGE_SIZE
    }&limit=${PAGE_SIZE}&type=${queryParamName}`,
    fetcher
  );
  console.log(error);
  // Flatten reviews from the current page and store them in the state
  const reviews: Review[] = data ? data.reviews : [];

  const isLoading = !data && !error;
  const isLoadingMore = isValidating && !!reviews.length;
  const isReachingEnd = reviews.length < PAGE_SIZE;

  const loadMore = () => {
    if (!isReachingEnd) {
      setPage(page + 1); // Move to the next page to load more reviews
    }
  };

  return {
    reviews,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
  };
}
