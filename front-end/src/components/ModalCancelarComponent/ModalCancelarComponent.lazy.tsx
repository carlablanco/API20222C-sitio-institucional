import React, { lazy, Suspense } from 'react';

const LazyModalCancelarComponent = lazy(() => import('./ModalCancelarComponent'));

const ModalCancelarComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModalCancelarComponent {...props} />
  </Suspense>
);

export default ModalCancelarComponent;
