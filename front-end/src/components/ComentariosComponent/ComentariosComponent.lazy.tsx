import React, { lazy, Suspense } from 'react';

const LazyComentariosComponent = lazy(() => import('./ComentariosComponent'));

const ComentariosComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyComentariosComponent {...props} />
  </Suspense>
);

export default ComentariosComponent;
