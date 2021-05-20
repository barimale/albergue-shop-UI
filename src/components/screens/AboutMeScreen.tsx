import { lazy, Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CenteredDiv from '../common/CenteredDiv';

const AboutMeScreenContent = lazy(() => import("../common/AboutMeScreenContent"));

export const Path = "/aboutme";
export const Title = "O mnie";

export function AboutMeScreen(){
    return(
        <Suspense fallback={
            <CenteredDiv>
                <CircularProgress color="secondary" />
            </CenteredDiv>
        }>
            <AboutMeScreenContent/>
        </Suspense>);
}
