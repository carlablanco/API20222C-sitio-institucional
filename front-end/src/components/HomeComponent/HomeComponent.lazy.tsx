import React, { lazy, Suspense } from 'react';

const LazyHomeComponent = lazy(() => import('./HomeComponent'));

const HomeComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHomeComponent {...props} />
  </Suspense>
);

export default HomeComponent;
