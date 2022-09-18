import React, { lazy, Suspense } from 'react';

const LazySolicitudesComponent = lazy(() => import('./SolicitudesComponent'));

const SolicitudesComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySolicitudesComponent {...props} />
  </Suspense>
);

export default SolicitudesComponent;
