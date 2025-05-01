import { z } from "zod";

export const driverSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z
      .string()
      .min(7, { message: "Phone number is required" })
      .regex(/^\+?\d{7,15}$/, {
        message: "Enter a valid phone number",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    driversLicenseType: z.enum(["South-Africa", "Foreign"], {
      required_error: "Driver's License type is required",
    }),
    address: z.string().min(5, {
      message: "Address is required",
    }),
    // proofOfAddress: z.string().min(3, {
    //   message: "Proof of address is required",
    // }),
    // faceCaptureVerification: z.string().min(3, {
    //   message: "Face capture is required",
    // }),
    // driversLicense: z.string(),
    validPlatformAccounts: z.enum(
      [
        "Bolt and Uber",
        "Bolt and Indrive",
        "Uber and Indrive",
        "Bolt, Uber and Indrive",
        "Bolt",
        "Uber",
        "Indrive",
        "None",
      ],
      {
        required_error: "Valid Platform Account is required",
      }
    ),
    yearsOfExperience: z
      .string()
      .min(1, { message: "Years of experience is required" })
      .regex(/^[0-9]+$/, {
        message: "Please enter a valid number of years",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const ownerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter",
      })
      .regex(/[\W_]/, {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
    address: z.string().min(5, {
      message: "Address is required",
    }),
    // proofOfOwnership: z
    //   .string()
    //   .min(1, { message: "Proof of ownership is required" }),
    // faceCaptureVerification: z
    //   .string()
    //   .min(1, { message: "Face capture is required" }),
    // carPictureWithPlate: z
    //   .string()
    //   .min(1, { message: "Car picture is required" }),
    // registrationDisk: z
    //   .string()
    //   .min(1, { message: "Registration disk is required" }),
    // decra: z.string().min(1, { message: "DECRA report is required" }),

    // isInsured: z.boolean({ required_error: "Insurance status is required" }),
    // hasTracker: z.boolean({ required_error: "Tracker info is required" }),
    // hasDashCam: z.boolean({ required_error: "Dash cam info is required" }),

    // mileage: z.string().min(1, { message: "Mileage is required" }),
    // engineSize: z.string().min(1, { message: "Engine size is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Must contain at least one lowercase letter",
    })
    .regex(/[\W_]/, {
      message: "Must contain at least one special character",
    }),
});
