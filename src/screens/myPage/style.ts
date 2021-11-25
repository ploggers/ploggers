import { StyleSheet } from 'react-native';
import * as S from '../Styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  text: {
    fontFamily: S.fonts.bold,
    fontSize: 20,
  },
  colorCircle: {
    borderRadius: 100 / 2,
    margin: 5,
  },
  reviseText: {
    fontFamily: S.fonts.bold,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  followingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: S.colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  followingText: {
    fontFamily: S.fonts.medium,
    fontSize: 12,
    color: 'white',
  },
  profileContainer: {
    flex: 0.5,
  },
  menuContainer: {
    flex: 2,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  bigText: {
    fontFamily: S.fonts.bold,
    textAlign: 'center',
    fontSize: 18,
  },
  mediumText: {
    fontFamily: S.fonts.medium,
    fontSize: 15,
    color: S.colors.primary
  },
});