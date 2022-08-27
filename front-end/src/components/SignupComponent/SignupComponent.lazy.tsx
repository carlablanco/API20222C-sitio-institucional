import React, { lazy, Suspense } from 'react';

const LazySignupComponent = lazy(() => import('./SignupComponent'));

const SignupComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySignupComponent {...props} />
  </Suspense>
);

export default SignupComponent;
