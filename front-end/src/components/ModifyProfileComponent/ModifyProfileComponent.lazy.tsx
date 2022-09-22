import React, { lazy, Suspense } from 'react';

const LazyModifyProfileComponent = lazy(() => import('./ModifyProfileComponent'));

const ModifyProfileComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModifyProfileComponent {...props} />
  </Suspense>
);

export default ModifyProfileComponent;
