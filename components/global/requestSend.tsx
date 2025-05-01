import React from "react";
import BlurModal from "../BlurModal";
import LoadingIndicator from "./LoadingIndicator";

const RequestSend = () => {
  return (
    <BlurModal background={false}>
      <LoadingIndicator size={50} />
    </BlurModal>
  );
};

export default RequestSend;
