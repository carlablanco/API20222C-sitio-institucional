import React, { lazy, Suspense } from 'react';

const LazyResetPasswordComponent = lazy(() => import('./ResetPasswordComponent'));

const ResetPasswordComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyResetPasswordComponent {...props} />
  </Suspense>
);

export default ResetPasswordComponent;
