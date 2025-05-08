import { getAuth } from "firebase/auth";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "@/utils/apiRoute";

const fetcherWithToken = async (url: string) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated");

  const token = await currentUser.getIdToken();
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const useRecommendedCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isValidating, mutate } = useSWR(
    `${API_ROUTE}cars/recommendations?page=${page}&limit=${limit}`,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
    }
  );

  const totalPages = data?.totalPages || 1;

  const recommendedLoading = (!data && !error) || isValidating;

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setCars(data.recommendedCars);
    } else {
      setCars((prevCars) => [...prevCars, ...data.recommendedCars]);
    }
  }, [data, page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    mutate();
  };
  return {
    cars,
    recommendedLoading,
    loadMore,
    hasMore: page < totalPages,
    refreshRecommended: refresh,
    error,
    page,
    setPage,
  };
};

export default useRecommendedCars;
