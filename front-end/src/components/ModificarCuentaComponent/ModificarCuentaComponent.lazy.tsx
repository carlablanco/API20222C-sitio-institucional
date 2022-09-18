import React, { lazy, Suspense } from 'react';

const LazyModificarCuentaComponent = lazy(() => import('./ModificarCuentaComponent'));

const ModificarCuentaComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModificarCuentaComponent {...props} />
  </Suspense>
);

export default ModificarCuentaComponent;
