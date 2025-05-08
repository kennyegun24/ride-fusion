import { getAuth } from "firebase/auth";
import useSWR from "swr";
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

const useNewNearCars = () => {
  const { data, error, isValidating, mutate } = useSWR(
    `${API_ROUTE}cars/top-newest`,
    fetcherWithToken
  );

  const cars = {
    newCars: data?.newestCars || [],
    nearCars: data?.nearbyCars || [],
  };

  const loading = !data && !error;

  // ✅ Manual refresh function
  const refresh = () => {
    mutate(); // SWR will re-fetch
  };

  return { cars, loading: loading || isValidating, error, refresh };
};

export default useNewNearCars;
