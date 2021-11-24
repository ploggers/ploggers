import { StyleSheet } from 'react-native';
import * as S from '../Styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    pointCircle1: {
        zIndex: -1,
        height: 500,
        width: 500,
        borderRadius: 250,
        borderColor: S.colors.primary,
        borderWidth: 2,
        position: 'absolute',
        top: 400,
        left: -250,
        backgroundColor: S.colors.primary,
        opacity: 0.5,
    },
    pointCircle2: {
        zIndex: -1,
        height: 400,
        width: 400,
        borderRadius: 200,
        borderColor: S.colors.sub,
        borderWidth: 2,
        position: 'absolute',
        top: -80,
        right: -100,
        backgroundColor: S.colors.sub,
        opacity: 0.8,
    },
});