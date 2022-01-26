import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenteredDiv } from '../common/divs';
import { ContentLayout } from '../layouts/MainLayout';

export const LoadingInProgress = () => (
  <ContentLayout>
    <CenteredDiv>
      <CircularProgress color="secondary" />
    </CenteredDiv>
  </ContentLayout>
);
