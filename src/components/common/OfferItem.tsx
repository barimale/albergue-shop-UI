/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { ItemDetails } from './BuyItems';
import { ItemDetailsTextButton } from '../molecules/ItemDetailsTextButton';
import useHover from '../../hooks/useHover';
import useTouched from '../../hooks/useTouched';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { LoadingInProgress } from '../molecules/LoadingInProgress';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    color: `${theme.palette.common.black}`,
    fontWeight: 'bold',
    whiteSpace: 'break-spaces',
    width: '100%',
    WebkitTapHighlightColor: 'transparent',
  },
  titleBar: {
    background: 'gray',
    WebkitTapHighlightColor: 'transparent',
  },
}));

export type ClothesItemProps = {
  tile: ItemDetails;
  index: number;
}

function OfferItem (props: ClothesItemProps) {
  const classes = useStyles();
  const { tile, index } = props;
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const isTouched = useTouched(hoverRef);
  const [isLoading] = useState<boolean>(false);
  const { i18n: defaulti18n } = useTranslation();
  const [lng, setLng] = useState<string>(defaulti18n.language.toLowerCase());

  defaulti18n.on('languageChanged', (lng) => setLng(lng.toLowerCase()));

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Fade in timeout={500}>
          <Box
            boxShadow={2}
            style={{
              height: '100%',
              width: 'auto',
            }}
          >
            <div
              ref={hoverRef}
              onClick={() => {
                const element = document.getElementById((context.valueOf() === DeviceType.isDesktopOrLaptop ? 'ccm' : 'ccd') + tile.id);

                if (element !== null) {
                  element.click();
                }
              }}
              style={{
                WebkitTapHighlightColor: 'transparent',
                opacity: context === DeviceType.isDesktopOrLaptop ? (isHover ? '0.67' : '1') : isTouched ? '0.67' : '1',
                cursor: 'pointer',
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
              }}
            >
              {isLoading === true ? (
                <div style={{
                  width: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : '100%',
                  height: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'inherit' : 'unset',
                }}
                >
                  <LoadingInProgress />
                </div>
              ) : (
                <img
                  src={tile.images[0].imageData}
                  alt={tile.id || 'title here'}
                  loading="eager"
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
                  }}
                />
              )}
              <GridListTileBar
                key={index}
                title={
                  <ItemDetailsTextButton lng={lng} item={tile} id={(context.valueOf() === DeviceType.isDesktopOrLaptop ? 'ccm' : 'ccd') + tile.id} />
              }
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </div>
          </Box>
        </Fade>
      )}
    </DeviceContextConsumer>
  );
}

export default OfferItem;
