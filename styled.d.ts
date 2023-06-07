import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string,
      backgroundInverse: string,
      positive: string,
      negative: string,
      primary: string,
      primaryDark: string,
      secondary: string
      tertiary: string,
      text: string,
    },
    spacing: {
      padding: {
        small: number;
        medium: number;
        large: number;
      };
      borderRadius: {
        small: number;
        default: number;
      };
    };
    typography: {
      type: {
        primary: string;
        code: string;
      };
      weight: {
        regular: string;
        bold: string;
        extrabold: string;
        black: string;
      };
      size: {
        s1: number;
        s2: number;
        s3: number;
        m1: number;
        m2: number;
        m3: number;
        l1: number;
        l2: number;
        l3: number;
      };
    };
  }
}
