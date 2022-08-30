import React, { lazy, Suspense } from 'react';

const LazyDropdownComponent = lazy(() => import('./DropdownComponent'));

const DropdownComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDropdownComponent {...props} />
  </Suspense>
);

export default DropdownComponent;
