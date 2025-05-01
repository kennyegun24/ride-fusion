import React from "react";
import { MotiView } from "moti";

type loadingPropType = {
  size: number;
};

const LoadingIndicator = ({ size }: loadingPropType) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0.5,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1200,
        loop: true,
        repeatReverse: true,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: "#269355",
        shadowColor: "#269355",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        marginHorizontal: "auto",
      }}
    />
  );
};

export default LoadingIndicator;
