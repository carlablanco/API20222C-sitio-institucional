import React, { lazy, Suspense } from 'react';

const LazyBloquearComentariosComponent = lazy(() => import('./BloquearComentariosComponent'));

const BloquearComentariosComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBloquearComentariosComponent {...props} />
  </Suspense>
);

export default BloquearComentariosComponent;
