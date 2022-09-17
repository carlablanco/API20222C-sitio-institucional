import React, { lazy, Suspense } from 'react';

const LazyModalComentarComponent = lazy(() => import('./ModalComentarComponent'));

const ModalComentarComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModalComentarComponent {...props} />
  </Suspense>
);

export default ModalComentarComponent;
