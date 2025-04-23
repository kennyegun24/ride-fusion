import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface StarProps {
  fill: number; // from 0 to 1
  size: number;
  fullColor: string;
  emptyColor: string;
}

const Star: React.FC<StarProps> = ({ fill, size, fullColor, emptyColor }) => {
  return (
    <View style={{ width: size, height: size }}>
      {/* Background (empty star) */}
      <FontAwesome
        name="star-o"
        size={size}
        color={emptyColor}
        style={StyleSheet.absoluteFillObject}
      />
      {/* Foreground (filled star clipped by fill %) */}
      <View
        style={{
          width: `${fill * 100}%`,
          overflow: "hidden",
          position: "absolute",
          height: "100%",
        }}
      >
        <FontAwesome
          name="star"
          size={size}
          color={fullColor}
          style={{ position: "absolute" }}
        />
      </View>
    </View>
  );
};

interface DynamicStarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  fullColor?: string;
  emptyColor?: string;
}

const DynamicStarRating: React.FC<DynamicStarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 24,
  fullColor = "#FFD700",
  emptyColor = "#E0E0E0",
}) => {
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    const diff = rating - i;
    const fill = diff >= 1 ? 1 : diff > 0 ? diff : 0;

    stars.push(
      <Star
        key={i}
        fill={fill}
        size={size}
        fullColor={fullColor}
        emptyColor={emptyColor}
      />
    );
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default DynamicStarRating;
