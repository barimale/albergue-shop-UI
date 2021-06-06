import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { ItemDetails } from './BuyItems';
import React, { useEffect, useRef } from 'react';
import { ItemDetailsTextButton } from '../molecules/ItemDetailsTextButton';
import useHover from '../../hooks/useHover';
import useTouched from '../../hooks/useTouched';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useState } from 'react';
import { LoadingInProgress } from '../molecules/LoadingInProgress';
import { Box } from '@material-ui/core';
import externali18n from '../../externali18n';
import { I18nextProvider } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: `${theme.palette.common.black}`,
      fontWeight: 'bold',
      whiteSpace: 'break-spaces',
      width: '100%',
      WebkitTapHighlightColor: 'transparent'
    },
    titleBar: {
      background: 'gray',
      WebkitTapHighlightColor: 'transparent',
    }
  }),
);

export type ClothesItemProps = {
  tile: ItemDetails;
  index: number;
}

function OfferItem(props: ClothesItemProps){
  const classes = useStyles();
  const { tile, index } = props;
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const isTouched = useTouched(hoverRef); 
  const [ isLoading, setIsLoading] = useState<boolean>(false);
  // const [ isDelayedHover, setIsDelayedHover] = useState<boolean>(false);
  // let timerId: any;

  // useEffect(() =>{
  //   if(isHover.valueOf() === true){
  //     timerId = setTimeout(()=>{
  //       setIsDelayedHover(true);
  //     }, 1000);
  //   }else{
  //     if(timerId !== undefined){
  //       clearTimeout(timerId);
  //     }
  //     setIsDelayedHover(false);
  //   }
  // }, [isHover]);
  // tile.images[tile.images.length > 1 ? (isDelayedHover.valueOf() === true ? 1 : 0) : 0

  return (
    <DeviceContextConsumer>
      {context =>
       <Box boxShadow={2} 
          style={{
            height: '100%',
            width: 'auto'
        }}>
          <div
            ref={hoverRef}
            onClick={()=>{
              var element = document.getElementById((context.valueOf() === DeviceType.isDesktopOrLaptop ? "ccm" : "ccd")+tile.id);
            
              if(element !==null){
                element.click();
              }
            }}
            style={{
              WebkitTapHighlightColor: 'transparent',
              opacity: context === DeviceType.isDesktopOrLaptop ? (isHover ? '0.67' : '1') : isTouched ? '0.67' : '1',
              cursor: 'pointer',
              height: '100%',
              width: '100%',
              backgroundColor: 'black'
          }}>
            {isLoading === true ? (
              <div style={{
                width:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : '100%',
                height:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : 'unset'
              }}>
                <LoadingInProgress />
              </div>
            ):(
              <img 
                src={tile.images[0].imageData} 
                alt={tile.id || "title here"} 
                loading={"eager"}
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  maxHeight: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  border: '1px solid black',
                  background: 'transparent',
                  transition: 'all 0.4s ease',
                  msTransition: 'all 0.4s ease',
                  MozTransition: 'all 0.4s ease',
                  WebkitTransition: 'all 0.4s ease',
                  height: '100%',
              }} />
            )}
            <GridListTileBar
              key={index}
              title={
                <I18nextProvider i18n={externali18n}>
                  <ItemDetailsTextButton item={tile} id={(context.valueOf() === DeviceType.isDesktopOrLaptop ? "ccm" : "ccd")+tile.id} />
                </I18nextProvider>
              }
              classes={{
                root: classes.titleBar,
                title: classes.title
              }}
            />
          </div>
        </Box>
      }
    </DeviceContextConsumer>
  );
}

export default OfferItem;