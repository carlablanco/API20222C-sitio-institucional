import React, { lazy, Suspense } from 'react';

const LazySolicitarClaseComponent = lazy(() => import('./SolicitarClaseComponent'));

const SolicitarClaseComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySolicitarClaseComponent {...props} />
  </Suspense>
);

export default SolicitarClaseComponent;
