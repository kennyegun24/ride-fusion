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
    key: "driversLicense",
    label: "Driver's License",
    options: [
      { label: "SA", value: "south-africe" },
      { label: "Foreign", value: "foreign" },
    ],
    placeholder: "Select your license type",
    required: true,
  },
  {
    key: "basicDetails",
    label: "Basic Details (Name, Address, etc.)",
    placeholder: "Enter your residential address",
    required: true,
  },
  {
    key: "proofOfAddress",
    label: "Proof of Address",
    placeholder: "Upload a utility bill or bank statement",
    required: true,
  },
  {
    key: "faceCaptureVerification",
    label: "Face Capture & License Comparison",
    placeholder: "Take a selfie for identity verification",
    required: true,
  },
  {
    key: "validPlatformAccounts",
    label: "Screenshots of Bolt/Uber/Indrive (or Not Registered)",
    placeholder: "Upload relevant screenshots or select 'Not Registered'",
    required: true,
  },
  {
    key: "yearsOfExperience",
    label: "Years of Driving Experience",
    placeholder: "Enter number of years",
    required: true,
  },
];
