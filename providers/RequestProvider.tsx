import RequestSend from "@/components/global/requestSend";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { boolean } from "zod";

type requestProps = {
  sending: false;
};

export const RequestContext = createContext({
  triggerLoader: (e: boolean) => {},
  sending: false,
});

export const RequestProvider = ({ children }: PropsWithChildren) => {
  const [sending, setSending] = useState<boolean>(false);

  const triggerLoader = (e: boolean) => {
    setSending(e);
  };
  return (
    <RequestContext.Provider value={{ triggerLoader, sending }}>
      {children}
      {sending && <RequestSend />}
    </RequestContext.Provider>
  );
};

export const useRequest = () => useContext(RequestContext);
