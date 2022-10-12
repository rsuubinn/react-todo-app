import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    accentColor: string;
    leftBgColor: string;
    rightBgColor: string;
    categoryBgColor: string;
  }
}
