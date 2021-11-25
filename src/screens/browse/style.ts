import { Dimensions, StyleSheet } from 'react-native';
import * as S from '../Styles';

const deviceHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    menuContainer: {
      flexGrow: 1,
      borderBottomWidth: 6,
      borderColor: S.colors.sub,
      paddingVertical: 15,
    },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: '5%',
      paddingVertical: '5%',
    },
    iconWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    rankingIcon: {
      color: '#FFD700',
    },
    crewIcon: {
      color: S.colors.primary,
    },
    myCrewContainer: {
      height: deviceHeight * 0.35,
      borderBottomWidth: 6,
      borderColor: S.colors.sub,
      paddingVertical: 15,
    },
    eventContainer: {
      height: deviceHeight * 0.35,
      borderBottomWidth: 6,
      borderColor: S.colors.sub,
      paddingVertical: 15,
    },
    newsContainer: {
      flexGrow: 1,
      borderBottomWidth: 6,
      borderColor: S.colors.sub,
      paddingVertical: 15,
    },
    contentTitle: {
      fontSize: S.fontSize.medium,
      paddingLeft: '5%',
      paddingVertical: '3%',
      textAlign: 'left',
    },
    totalViewText: {
      fontFamily: S.fonts.medium,
      paddingRight: '5%',
      paddingVertical: '3%',
      textAlign: 'left',
      fontSize: 15,
      color: S.colors.secondary,
    },
    menuText: {
      fontFamily: S.fonts.medium,
      fontSize: S.fontSize.small,
      paddingTop: 3,
    },
    categoryContainer: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 5,
      borderRadius: 20,
      borderWidth: 1,
    },
    category: {
      flex: 1,
      justifyContent: 'center',
    },
    categoryText: {
      fontFamily: S.fonts.medium,
      fontSize: 15,
    },
    insertBtn: {
      position: 'absolute',
      bottom: 20,
      right: 10,
      color: S.colors.primary,
      zIndex: 1,
    },
    insertBtnBackground: {
      position: 'absolute',
      bottom: 40,
      right: 30,
      zIndex: 0,
      width: 50,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 20,
    },
    qaContainer: {
      flex: 1,
      paddingHorizontal: '5%',
    },
    questionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    questionText: {
      fontFamily: S.fonts.bold,
      fontSize: 20,
    },
    textInput: {
      fontFamily: S.fonts.medium,
      flex: 1,
      backgroundColor: S.colors.secondary,
      borderRadius: 5,
      paddingHorizontal: 10,
      fontSize: 18,
    },
    validText: {
      fontFamily: S.fonts.light,
      fontWeight: '600',
      flex: 0.5,
      paddingTop: '2%',
    },
    titleTextContainer: {
      flex: 1,
      paddingHorizontal: '5%',
    },
    startText: {
      fontFamily: S.fonts.bold,
      fontSize: 35,
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: '5%',
    },
    text: {
      fontFamily: S.fonts.bold,
      fontSize: 20,
    },
    categoryWrapper: {
      flex: 1,
      alignItems: 'center',
      margin: 15,
      borderRadius: 20,
      borderWidth: 1,
    },
    scoreBox: {
      flex: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    scoreText: {
      fontSize: 18,
      color: S.colors.primary,
    },
    searchContainer: {
      flex: 1,
      paddingHorizontal: '5%',
      paddingBottom: 3,
      height: '100%',
    },
    scrollViewContainer: {
      flex: 12,
      paddingHorizontal: '5%',
    },
    imageWrapper: {
      flex: 1,
      maxWidth: '50%',
      maxHeight: deviceHeight * 0.2,
      padding: 10,
    },
    image: {
      height: '100%',
      justifyContent: 'flex-end',
      padding: 5,
    },
    imageTextWrapper: {
      flex: 0.5,
    },
    titleText: {
      fontFamily: S.fonts.bold,
      fontSize: 25,
      color: 'white',
      paddingVertical: '3%',
    },
    townText: {
      fontFamily: S.fonts.medium,
      fontSize: 15,
      color: 'white',
    },
    rankingCategoryContainer: {
      flex: 0.5,
      paddingHorizontal: '5%',
    },
  });
  