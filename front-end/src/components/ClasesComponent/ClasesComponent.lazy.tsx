import React, { lazy, Suspense } from 'react';

const LazyClasesComponent = lazy(() => import('./ClasesComponent'));

const ClasesComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyClasesComponent {...props} />
  </Suspense>
);

export default ClasesComponent;
