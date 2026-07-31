'use client';

import { useEffect, useRef, useState } from 'react';
import tokenManager from '~/utils/tokenManager';
import { lcStorage } from '~/utils/storage';

export default function AuthMobile({ children }: { children: React.ReactNode }) {
  // const [ready, setReady] = useState(false);
  // // const token = tokenManager.getAccessToken();
  // let token;
  // useEffect(() => {
  //   const accessToken = lcStorage.getItem('token');
  //   const refreshToken = lcStorage.getItem('refreshToken');
  //   token = accessToken;
  //   if (accessToken) {
  //     tokenManager.setAccessToken(accessToken);
  //   }
  //   if (refreshToken) {
  //     tokenManager.setRefreshToken(refreshToken);
  //   }
  //   setReady(true);
  // }, []);
  // if (!ready) return null;
  // return { children };
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   // console.log(1324);
  //   const accessToken = lcStorage.getItem('token');
  //   const refreshToken = lcStorage.getItem('refreshToken');
  //   // console.log('local', accessToken);
  //   if (accessToken) {
  //     tokenManager.setAccessToken(accessToken);
  //   }
  //   if (refreshToken) {
  //     tokenManager.setRefreshToken(refreshToken);
  //   }
  //   initialized.current = true;
  // }
  // return <>{children}</>;
}
