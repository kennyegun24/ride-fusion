import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useCallback, useState } from "react";
import axios from "axios";

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
  });
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

      const response = await axios.get(
        `http://172.20.10.3:4000/api/cars/car/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⬅️ send token in headers
          },
        }
      );

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
