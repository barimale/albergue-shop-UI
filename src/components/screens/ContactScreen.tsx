import React, { lazy, Suspense } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from '../common/CenteredDiv';

const ContactScreenContent = lazy(() => import('../common/ContactScreenContent'));

export const Path = '/';
export const Title = 'Welcome';

export function ContactScreen () {
  return (
    <Suspense fallback={(
      <CenteredDiv>
        <CircularProgress color="secondary" />
      </CenteredDiv>
          )}
    >
      <ContactScreenContent />
    </Suspense>
  );
}
