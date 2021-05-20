import React, { useEffect, useState } from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { lazy, Suspense } from 'react';
import CenteredDiv from '../common/CenteredDiv';

const MobileProductsContent = lazy(() => import("../mobile/ProductsContent"));
const DesktopProductsContent = lazy(() => import("../desktop/ProductsContent"));

export const Path = "/";
export const Title = "Karty";

export const ProductsScreen = () => {
    const [ isShowing, setIsShowing ] = useState<boolean>(true);
    const timeInSeconds = 4;

    useEffect(()=>{
        setTimeout(()=>{
            setIsShowing(false);
        }, timeInSeconds * 1000);
    },[]);

    return (
        <DeviceContextConsumer>
            {context => 
            <div style={{
                display: 'flex', 
                flexDirection:'column', 
                height: '100%',
                width: '100%'}}>
                <div 
                style={{
                    zIndex: 100,
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                    verticalAlign: 'middle',
                    alignItems: 'center',
                    left: "50%", 
                    transform: 'translateX(-50%)',
                    visibility: isShowing ? "visible" : "collapse",
                    color: 'silver',
                    animation: 'fadein '+ timeInSeconds + 's',
                    paddingTop: context === DeviceType.isDesktopOrLaptop ? '32px': '10px',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '32px': '18px'}}>
                        KLIKNIJ W KARTĘ BY ODWRÓCIĆ
                </div>
                <CenteredDiv>
                    {(context === DeviceType.isDesktopOrLaptop) ? (
                            <Suspense fallback={
                                <CircularProgress color="secondary" />
                            }>
                                <DesktopProductsContent/>
                            </Suspense>     
                        ):(<Suspense fallback={
                            <CircularProgress color="secondary" />
                        }>
                            <MobileProductsContent/>
                        </Suspense>
                        )}
                </CenteredDiv>
            </div>
        }
    </DeviceContextConsumer>
    );
}