import React, { lazy, Suspense } from 'react';

const LazyGridComponent = lazy(() => import('./GridComponent'));

const GridComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGridComponent {...props} />
  </Suspense>
);

export default GridComponent;
