declare module "react-native-overscroll" {
  import { ScrollViewProps } from "react-native";

  export interface OverScrollViewProps extends ScrollViewProps {
    alwaysBounceVertical?: boolean;
    alwaysBounceHorizontal?: boolean;
  }

  export class OverScrollView extends React.Component<OverScrollViewProps> {}
}
