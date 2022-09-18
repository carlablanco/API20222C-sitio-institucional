import React, { lazy, Suspense } from 'react';

const LazyMateriasInscritasComponent = lazy(() => import('./MateriasInscritasComponent'));

const MateriasInscritasComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMateriasInscritasComponent {...props} />
  </Suspense>
);

export default MateriasInscritasComponent;
