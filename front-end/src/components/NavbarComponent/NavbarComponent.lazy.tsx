import React, { lazy, Suspense } from 'react';

const LazyNavbarComponent = lazy(() => import('./NavbarComponent'));

const NavbarComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNavbarComponent {...props} />
  </Suspense>
);

export default NavbarComponent;
