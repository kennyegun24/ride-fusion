import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
import { useRole } from "./RoleProvider";
import Splash from "@/components/global/Splash";

const RoleContext = createContext({
  isAuthenticated: false,
  authenticateUser: (e: string) => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsAuthenticated(true);
    };
    checkAuth();
  });

  const { setUserRole } = useRole();

  const authenticateUser = (e: string) => {
    setIsAuthenticated(true);
    setUserRole(e);
  };

  if (isAuthenticated === undefined) {
    return (
      <View style={{ flex: 1 }}>
        {/* <ActivityIndicator style={{ margin: "auto" }} size={"small"} /> */}
        <Splash />
      </View>
    );
  }

  return (
    <RoleContext.Provider value={{ isAuthenticated, authenticateUser }}>
      <View style={{ flex: 1 }}>{children}</View>
    </RoleContext.Provider>
  );
};

export const useAuthenticate = () => useContext(RoleContext);
