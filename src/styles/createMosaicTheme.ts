import { ThemeOptions, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { colors } from './colors';

export const createMosaicTheme = (options: ThemeOptions): Theme => {
  return createTheme({
    colors,
    ...options
  });
};
