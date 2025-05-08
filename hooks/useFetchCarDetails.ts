import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import axios from "axios";
import { API_ROUTE } from "@/utils/apiRoute";

type carDetailsProps = {
  car: {
    car_name: string;
    images: string[];
    model: number;
    description: string;
    user: {
      downloadURL: string;
      fullName: string;
      _id: string;
      uid: string;
    };
    rating: number;
    features: {};
    brand: string;
    carType: string;
    rentalTerms: string;
    rentalPricePerDay: number;
  };
  reviews: [];
  averageRating: number;
  totalReviews: number;
  hasMoreReviews: boolean;
  chatExist: boolean;
};

type carprop = {
  car: {
    car_name: string;
    images: string[];
    model: number;
    description: string;
    user: {
      downloadURL: string;
      fullName: string;
      _id: string;
    };
    rating: number;
    features: {};
    brand: string;
    carType: string;
    rentalTerms: string;
    rentalPricePerDay: number;
  };
  averageRating: number;
  totalReviews: number;
};

const useCarDetails = (id: string) => {
  const [carDetails, setCarsDetails] = useState<carDetailsProps>({
    car: {
      car_name: "",
      images: [],
      model: 0,
      description: "",
      user: {
        downloadURL: "",
        fullName: "",
        _id: "",
        uid: "",
      },
      rating: 0,
      features: {},
      brand: "",
      carType: "",
      rentalTerms: "",
      rentalPricePerDay: 0,
    },
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
    hasMoreReviews: false,
    chatExist: true,
  });
  const [loading, setLoading] = useState(true);

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

      const response = await axios.get(`${API_ROUTE}cars/car/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ⬅️ send token in headers
        },
      });

      setCarsDetails(response.data);
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

  return { carDetails, loading };
};

export default useCarDetails;
