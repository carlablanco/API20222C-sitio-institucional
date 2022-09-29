import React, { lazy, Suspense } from 'react';

const LazyLogoutComponent = lazy(() => import('./LogoutComponent'));

const LogoutComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLogoutComponent {...props} />
  </Suspense>
);

export default LogoutComponent;
