import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  border_d_color?: string;
  border_l_color?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  border_l_color,
  border_d_color,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const borderColor = useThemeColor(
    { light: border_l_color, dark: border_d_color },
    "borderColor"
  );

  return (
    <View style={[{ backgroundColor, borderColor }, style]} {...otherProps} />
  );
}
