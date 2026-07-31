import 'styled-components';
import { theme } from '~/constants';

//Define type for props in styled-components
declare module 'styled-components' {
  type OptionsFlags<Type> = {
    [Property in keyof Type]: any;
  };

  // export type DefaultTheme = typeof theme;

  export interface DefaultTheme {
    colors: OptionsFlags<typeof theme.colors>;
    sizes: OptionsFlags<typeof theme.sizes>;
    shadows: OptionsFlags<typeof theme.shadows>;
    breakpoints: OptionsFlags<typeof theme.breakpoints>;
  }
}
