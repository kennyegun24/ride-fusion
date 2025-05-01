export const basicCarInfoFields = [
  {
    label: "Car Name",
    placeholder: "Toyota Corolla",
    type: "text",
    key: "car_name",
  },
  {
    label: "Car Type",
    placeholder: "Sedan",
    type: "dropdown",
    options: [
      { label: "Sedan", value: "Sedan" },
      { label: "SUV", value: "SUV" },
      { label: "Truck", value: "Truck" },
      { label: "Coupe", value: "Coupe" },
    ],
    key: "carType",
  },
  {
    label: "Car Brand",
    placeholder: "Toyota",
    type: "text",
    key: "brand",
  },
  { label: "Car Model", placeholder: "2022", type: "number", key: "model" },
  { label: "No of seats", placeholder: "5", type: "number", key: "seats" },
  {
    label: "Transmission",
    placeholder: "Automatic",
    type: "dropdown",
    options: [
      { label: "Automatic", value: "Automatic" },
      { label: "Manual", value: "Manual" },
    ],
    key: "transmission",
  },
  {
    label: "Fuel Type",
    placeholder: "Petrol",
    type: "dropdown",
    options: [
      { label: "Petrol", value: "Petrol" },
      { label: "Diesel", value: "Diesel" },
      { label: "Electric", value: "Electric" },
      { label: "Hybrid", value: "Hybrid" },
    ],
    key: "fuelType",
  },
];

export const availabilityPricingFields = [
  {
    label: "Location",
    placeholder: "Ikeja, Lagos",
    type: "location",
    key: "location",
  },
  {
    label: "State",
    placeholder: "Ikeja, Lagos",
    type: "state",
    key: "state",
  },
  {
    label: "Availability",
    placeholder: "Always Available",
    type: "dropdown",
    options: [
      { label: "Always Available", value: "Always Available" },
      { label: "Weekdays", value: "Weekdays" },
      { label: "Weekends", value: "Weekends" },
    ],
    key: "available",
  },
  {
    label: "Rental Price per day",
    placeholder: "NGN 30,000/d",
    type: "number",
    key: "rentalPricePerDay",
  },
  {
    label: "Rental Deposit",
    placeholder: "NGN 3000",
    type: "number",
    key: "rental_deposit",
  },
  {
    label: "Rental Terms (optional)",
    placeholder: "No smoking",
    type: "text",
    key: "rentalTerms",
  },
  {
    label: "Description",
    placeholder: "Enter description",
    type: "textarea",
    maxLength: 5000,
    key: "description",
  },
];
