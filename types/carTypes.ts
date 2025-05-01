import { ImageSourcePropType } from "react-native";

export interface CarObjProps {
  owner_name: string;
  owner_image: ImageSourcePropType;
  car_name: string;
  car_year: number;
  rent_amount: number;
  car_image: ImageSourcePropType[];
  description: string;
  details: string[];
  rating: number;
  all_reviews: any[];

  images: string[];
  model?: string;
  downloadURL?: string;
  fullName?: string;
  rentalPricePerDay?: number;
  available?: boolean;
  user?: any;
  _id?: string;
}
