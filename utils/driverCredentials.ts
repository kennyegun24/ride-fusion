export const driverCredentials = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "example@mail.com",
    required: true,
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "+27 600 000 000",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Enter a secure password",
    required: true,
  },
  {
    key: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    required: true,
  },
  {
    key: "driversLicenseType",
    label: "Driver's License Type",
    options: [
      { label: "SA", value: "South-Africa" },
      { label: "Foreign", value: "Foreign" },
    ],
    placeholder: "Select your license type",
    required: true,
  },
  {
    key: "address",
    label: "Address",
    placeholder: "Enter your residential address",
    required: true,
  },
  {
    key: "city",
    label: "City",
    placeholder: "Enter your city of residence",
    required: true,
  },
  {
    key: "state",
    label: "State",
    placeholder: "Enter your state of residence",
    required: true,
  },
  // {
  //   key: "proofOfAddress",
  //   label: "Proof of Address",
  //   placeholder: "Upload a utility bill or bank statement",
  //   required: true,
  // },
  // {
  //   key: "faceCaptureVerification",
  //   label: "Face Capture & License Comparison",
  //   placeholder: "Take a selfie for identity verification",
  //   required: true,
  // },
  {
    key: "validPlatformAccounts",
    label:
      "Names of registered driving platforms Bolt/Uber/Indrive (or Not Registered)",

    options: [
      { label: "Bolt X Uber", value: "Bolt and Uber" },
      { label: "Bolt X Indrive", value: "Bolt and Indrive" },
      { label: "Uber X Indrive", value: "Uber and Indrive" },
      { label: "Bolt X Uber X Indrive", value: "Bolt, Uber and Indrive" }, // 🔥 all three
      { label: "Bolt Only", value: "Bolt" },
      { label: "Uber Only", value: "Uber" },
      { label: "Indrive Only", value: "Indrive" },
      { label: "None", value: "None" },
    ],
    placeholder: "Select your registered platform",
    required: true,
  },
  {
    key: "yearsOfExperience",
    label: "Years of Driving Experience",
    placeholder: "Enter number of years",
    required: true,
  },
];
