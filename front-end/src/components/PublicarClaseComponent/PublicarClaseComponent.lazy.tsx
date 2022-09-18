import React, { lazy, Suspense } from 'react';

const LazyPublicarClaseComponent = lazy(() => import('./PublicarClaseComponent'));

const PublicarClaseComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPublicarClaseComponent {...props} />
  </Suspense>
);

export default PublicarClaseComponent;
