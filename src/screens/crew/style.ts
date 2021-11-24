import { Dimensions, StyleSheet } from 'react-native';
import * as S from '../Styles';

const deviceHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
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
      calendarViewContainer: {
        flex: 1,
        paddingTop: '5%',
      },
      agendaContainer: {
        paddingHorizontal: '5%',
        paddingTop: '5%',
        height: '100%',
        backgroundColor: 'white',
      },
      agendaText: {
        fontFamily: S.fonts.bold,
        fontSize: S.fontSize.medium,
      },
      profileContainer: {
        height: '30%',
      },
      bigText: {
        fontFamily: S.fonts.bold,
        textAlign: 'center',
        fontSize: 18,
      },
      mediumText: {
        fontFamily: S.fonts.medium,
        fontSize: 15,
      },
      content: {
        fontSize: S.fontSize.small,
        color: '#000',
        marginVertical: '2%',
        fontFamily: S.fonts.light,
      },
      label: {
        fontFamily: S.fonts.medium,
        fontSize: S.fontSize.small,
        color: S.colors.secondary,
        marginVertical: '2%',
        marginRight: '3%',
      },
      searchContainer: {
        flex: 0.4,
        paddingHorizontal: '5%',
        marginBottom: '5%',
        justifyContent: 'center',
      },
      searchBar: {
        flex: 1,
        backgroundColor: S.colors.secondary,
        fontFamily: S.fonts.medium,
        borderRadius: 5,
        fontSize: 18,
        padding: 15,
      },
});