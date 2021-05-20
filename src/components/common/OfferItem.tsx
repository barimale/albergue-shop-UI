import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { ItemDetails } from './BuyItems';
import React, { useEffect, useRef } from 'react';
import { ItemDetailsTextButton } from '../molecules/ItemDetailsTextButton';
import useTheme from "@material-ui/core/styles/useTheme";
import { cacheImages } from "../../customTheme";
import useHover from '../../hooks/useHover';
import useTouched from '../../hooks/useTouched';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { useState } from 'react';
import { LoadingInProgress } from '../molecules/LoadingInProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: 'white',
      fontWeight: 'bold',
      whiteSpace: 'break-spaces',
      width: '100%',
      WebkitTapHighlightColor: 'transparent',
    },
    titleBar: {
      background: 'rgba(206, 17, 38, 0.68)',
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
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    cacheImages(tile.img).then(()=>{
      setIsLoading(false);
    });
  }, [tile.img]);

  return (
    <DeviceContextConsumer>
      {context =>
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
            width: '100%'
        }}>
          {isLoading === true ? (
            <div style={{
              width:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : '100%',
              height:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : 'unset'
            }}>
              <LoadingInProgress />
            </div>
          ):(
            <img src={tile.img[0]} alt={tile.title} style={{
              WebkitTapHighlightColor: 'transparent',
              maxHeight: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'unset': '100%',
              objectFit: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'cover' : 'cover',
              width:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : '100%',
              height:context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : 'unset'
            }}/>
          )}
          <GridListTileBar
            key={index}
            title={<ItemDetailsTextButton item={tile} id={(context.valueOf() === DeviceType.isDesktopOrLaptop ? "ccm" : "ccd")+tile.id}/>}
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
          />
        </div>
      }
    </DeviceContextConsumer>
  );
}

export default OfferItem;