import React, { lazy, Suspense } from 'react';

const LazyComentariosListComponent = lazy(() => import('./ComentariosListComponent'));

const ComentariosListComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyComentariosListComponent {...props} />
  </Suspense>
);

export default ComentariosListComponent;
