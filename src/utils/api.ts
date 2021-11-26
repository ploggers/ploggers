import axios from 'axios';
import * as U from '@utils';
import * as A from '@store/asyncStorage';
import { getCookie } from '.';
import { useDispatch, useStore } from 'react-redux';

const dispatch = useDispatch();
export const updateToken = async (setAccessToken: (accessToken: string) => void) => {
  U.readFromStorage('refreshJWT').then((refreshJWT: any) => {
    // accessToken 재발급
    axios
      .get('/api/users/refresh-access', {
        headers: { Authorization: `Bearer ${refreshJWT}` },
      })
      .then((response) => {
        const tokens = response.headers['set-cookie'][0];
        const renewedAccessToken = getCookie(tokens, 'accessToken');
        U.writeToStorage('accessJWT', renewedAccessToken);
        dispatch(A.setJWT(renewedAccessToken, refreshJWT));
        setAccessToken(renewedAccessToken);
      });
  });
};

export const joinCrew = async (accessToken: string, path: string, body: any) => {
  axios.post(
    path, body,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
}
