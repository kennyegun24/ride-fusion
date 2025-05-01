import { z } from "zod";

export const basicCarSchema = z.object({
  car_name: z.string().min(2, { message: "Car name is required" }),
  brand: z.string().min(2, { message: "Car brand is required" }),
  carType: z.enum(["Sedan", "SUV", "Truck", "Coupe"], {
    required_error: "Car type is required",
  }),
  transmission: z.enum(["Manual", "Automatic"], {
    required_error: "Transmission type is required",
  }),
  fuelType: z.enum(["Petrol", "Diesel", "Electric", "Hybrid"], {
    required_error: "Fuel type is required",
  }),
  model: z.coerce.number().min(1980, {
    message: "Model year should not be less than 1980",
  }),
  seats: z.coerce.number().min(1, {
    message: "Seats cannot be less than 1",
  }),
});

export const availabilitySchema = z
  .object({
    location: z.string().min(2, { message: "Location is required" }),
    rentalPricePerDay: z.coerce
      .number()
      .min(10, { message: "Required and should be more than 10" }),
    rental_deposit: z.coerce.number().min(5, { message: "Required field" }),
    description: z
      .string()
      .min(10, { message: "Description should not be less than 10 chars" })
      .max(300, { message: "Description should not be more than 300 chars" }),
    available: z.enum(["Always Available", "Weekdays", "Weekends"], {
      required_error: "Driver's License type is required",
    }),
    state: z.string().min(3, {
      message: "State is too short",
    }),
    rentalTerms: z.string().min(5, {
      message: "Basic details are required",
    }),
  })
  .refine((data) => data.rentalPricePerDay >= data.rental_deposit, {
    message: "Rental deposit should not be more than rental price",
    path: ["rental_deposit"],
  });
