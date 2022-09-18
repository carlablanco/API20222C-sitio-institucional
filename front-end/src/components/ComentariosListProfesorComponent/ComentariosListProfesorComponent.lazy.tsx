import React, { lazy, Suspense } from 'react';

const LazyComentariosListProfesorComponent = lazy(() => import('./ComentariosListProfesorComponent'));

const ComentariosListProfesorComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyComentariosListProfesorComponent {...props} />
  </Suspense>
);

export default ComentariosListProfesorComponent;
