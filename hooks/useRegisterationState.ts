// registrationState.ts
import { create } from "zustand";

type RegistrationState = {
  registrationComplete: boolean;
  setRegistrationComplete: (value: boolean) => void;
};

export const useRegistrationState = create<RegistrationState>((set) => ({
  registrationComplete: false,
  setRegistrationComplete: (value) => set({ registrationComplete: value }),
}));
