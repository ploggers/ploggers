import { StyleSheet } from 'react-native';
import * as S from '../Styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    authContainer: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    earth: {
        position: 'absolute',
        width: 50,
        height: 50,
        zIndex: -1,
    },
    textInputContainer: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    loginText: {
        fontFamily: S.fonts.bold,
        fontSize: 35,
    },
    textInput: {
        fontFamily: S.fonts.medium,
        flex: 1,
        backgroundColor: S.colors.secondary,
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 5,
        marginBottom: 15,
        fontSize: 18,
    },
    passwordInput: {
        fontFamily: S.fonts.medium,
        flex: 1,
        backgroundColor: S.colors.secondary,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingHorizontal: 10,
        marginVertical: 5,
        marginTop: 15,
        marginLeft: 5,
        fontSize: 18,
    },
    showPasswordIcon: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: S.colors.secondary,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingRight: 10,
        marginRight: 5,
        marginVertical: 5,
        marginTop: 15,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    startText: {
        fontFamily: S.fonts.bold,
        fontSize: 35,
    },
    validText: {
        fontFamily: S.fonts.light,
        fontWeight: '600',
        marginHorizontal: 10,
    },
});