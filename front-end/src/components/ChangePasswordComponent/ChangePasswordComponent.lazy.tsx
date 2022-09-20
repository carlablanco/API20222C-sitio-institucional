import React, { lazy, Suspense } from 'react';

const LazyChangePasswordComponent = lazy(() => import('./ChangePasswordComponent'));

const ChangePasswordComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyChangePasswordComponent {...props} />
  </Suspense>
);

export default ChangePasswordComponent;
