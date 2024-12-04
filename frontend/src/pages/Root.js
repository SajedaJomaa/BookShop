import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/Header/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const EXPIRED_TOKEN = 'EXPIRED';
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === EXPIRED_TOKEN) {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    const timeoutId = setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
    return () => clearTimeout(timeoutId);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
