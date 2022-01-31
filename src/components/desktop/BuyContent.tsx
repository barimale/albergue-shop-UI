/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useTranslation } from 'react-i18next';
import { ItemDetails } from '../common/BuyItems';
import OfferItem from '../common/OfferItem';
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: '32px',
    paddingTop: '0px',
    maxHeight: '100%',
    height: 'inherit',
  },
  gridList: {
    margin: '0px !important',
    width: 'auto',
    height: 'auto',
    maxHeight: '100%',
    overflowX: 'hidden',
    scrollbarColor: '#636362 #010306',
  },
  icon: {
    background: 'rgba(206, 17, 38, 0.68)',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Signoria-Bold !important',
    whiteSpace: 'break-spaces',
  },
  titleBar: {
    background: 'rgba(206, 17, 38, 0.68)',
    fontFamily: 'Signoria-Bold',
  },
}));

export type BuyContentProps = {
  items: Array<ItemDetails>;
}

function BuyContent (props: BuyContentProps) {
  const { items } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  // WIP add category api and set at this level category tabs by localstorage
  return (
    <DeviceContextConsumer>
      {(context) => (
        items === undefined || items.length === 0 ? (
          <div style={{
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            paddingBottom: 0,
            fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px',
          }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'end',
            }}
            >
              {t('There are no items available in that category').toUpperCase()}
            </div>
          </div>
        ) : (
          <div style={{
            height: '100%',
            maxHeight: '100%',
            width: '100%',
            scrollBehavior: 'smooth',
          }}
          >
            <GridList
              cellHeight={context.valueOf() === DeviceType.isDesktopOrLaptop ? 400 : 200}
              className={classes.gridList}
              cols={context.valueOf() === DeviceType.isDesktopOrLaptop ? 3 : ((window.innerWidth / 2 > 200) ? 2 : 1)}
            >
              {items.map((tile: ItemDetails, index:number) => (
                <GridListTile
                  style={{
                    cursor: 'pointer',
                  }}
                  className="pointerOverEffect"
                  key={index}
                  cols={1}
                  onClick={() => {
                    const element = document.getElementById((context.valueOf() === DeviceType.isDesktopOrLaptop ? 'ccm' : 'ccd') + index);

                    if (element !== null) {
                      element.click();
                    }
                  }}
                >
                  <OfferItem tile={tile} index={index} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        )
      )}
    </DeviceContextConsumer>
  );
}

export default BuyContent;
