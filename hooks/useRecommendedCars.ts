import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import axios from "axios";

const useRecommendedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserToken = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      return token;
    }
    return null;
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const token = await getUserToken();
      if (!token) return;

      // const response = await axios.get(
      //   "http://172.20.10.3:4000/api/cars/recommendations?page=1",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`, // ⬅️ send token in headers
      //     },
      //   }
      // );
      const response = await axios.get(
        "http://172.20.10.3:4000/api/cars/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⬅️ send token in headers
          },
        }
      );

      setCars(response.data.newestCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars(); // ✅ fetch cars when screen comes into focus
    }, [])
  );

  return { cars, loading };
};

export default useRecommendedCars;
