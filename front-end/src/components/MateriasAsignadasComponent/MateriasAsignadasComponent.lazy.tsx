import React, { lazy, Suspense } from 'react';

const LazyMateriasAsignadasComponent = lazy(() => import('./MateriasAsignadasComponent'));

const MateriasAsignadasComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMateriasAsignadasComponent {...props} />
  </Suspense>
);

export default MateriasAsignadasComponent;
