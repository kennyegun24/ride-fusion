import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface RolecontextType {
  role: string | undefined;
  setUserRole: (role: string) => void;
}

const RoleContext = createContext<RolecontextType>({
  role: undefined,
  setUserRole: (e: string) => {},
});

export const RoleProvider = ({ children }: PropsWithChildren) => {
  const [role, setRole] = useState<string | undefined>(undefined);

  const setUserRole = (role: string) => {
    setRole(role);
  };

  return (
    <RoleContext.Provider value={{ role, setUserRole }}>
      <View style={{ flex: 1 }}>{children}</View>
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
