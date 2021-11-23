import { Dimensions, StyleSheet } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const headerHeight = windowHeight * 0.05;

export const colors = {
  primary: '#7CAEF7',
  secondary: '#0C61C6',
  sub: '#DAE3EF',
};

export const fonts = {
  bold: 'Pretendard-ExtraBold',
  medium: 'Pretendard-Medium',
  light: 'Pretendard-Light',
};

export const buttonStyles = StyleSheet.create({
  longButton: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
  },
});

export const fontSize = {
  title: 32,
  content: 18,
  medium: 24,
  mediumSmall: 20,
  small: 16,
  tiny: 12,
};

export const colorPalettes = new Array(
  '#E53935', // Red 600
  '#E57373', // Red 300
  '#FF8A80', // Red A100
  '#D81B60', // Pink 600
  '#FF80AB', // Pink A100
  '#FF7043', // Deep Orange 400
  '#F57C00', // Orange 700
  '#FFAB91', // Deep Orange 200
  '#FFD740', // Amber A200
  '#FFD180', // Orange A100
  '#004D40', // Teal 900
  '#0097A7', // Cyan 700
  '#26A69A', // Teal 400
  '#AED581', // Light Green 300
  '#D4E157', // Lime 400
  '#2979FF', // Blue A400
  '#64B5F6', // Blue 300
  '#80D8FF', // Light BLue A100
  '#37474F', // Blue Gray 800
  '#78909C', // Blue Gray 400
  '#616161', // Gray 700
  '#BDBDBD', // Gray 400
  '#3E2723', // Brown 900
  '#795548', // Brown 500
  '#A1887F', // Brown 300
);
