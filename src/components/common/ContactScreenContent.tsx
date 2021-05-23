import { IconButton, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import { 
  EmailIcon,
  WhatsappIcon,
  FacebookIcon,
  FacebookMessengerIcon } from 'react-share';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useShopStatus } from '../../hooks/useShopStatus';
import { Logo } from './Logo';


export default function ContactScreenContent(){
    const status = useShopStatus();

    return(
        <>
            {status === undefined ? (
                <LinearProgress/>
            ):(
                <>
                    {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true ?(
                        <p>{'Redirect to the first category'}</p>
                    ):(
                        <SystemIsEmpty/>
                    )}
                </>
            )}
        </>
    );

}
 const SystemIsEmpty = () => {

    return (
        <DeviceContextConsumer>
            {context => 
                <div style={{
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white',
                    paddingBottom: 0,
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'end'}}>
                        {"There are no items avalaible in the shop".toUpperCase()}
                    </div>
                    <div style={{
                        alignContent: 'center',
                        paddingTop: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        color: 'white',
                        fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                    }}>
                        <IconButton 
                            className={"pointerOverEffect"}
                            href="https://albergue-3a86a.web.app/" 
                            style={{
                                padding: context === DeviceType.isDesktopOrLaptop ? 20 : 10,
                                borderRadius: '0px'}}>
                            <Logo 
                                style={{
                                height: context === DeviceType.isDesktopOrLaptop ? 64 : 32,
                                width: 'auto'}} 
                            />
                            <Typography 
                                style={{
                                    color: 'white',
                                    paddingLeft: '20px'
                            }}>
                                {"Go back to ALBERGUE DE PEREGRINOS PORTO"}
                            </Typography>
                        </IconButton>
                    </div>
                </div>
            }
        </DeviceContextConsumer>
    );
}