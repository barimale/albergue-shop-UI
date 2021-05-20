import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { tileData, ItemDetails, GetIdBybCategoryTitle } from '../common/BuyItems';
import { BuyScreenProps } from '../screens/BuyScreen';
import OfferItem from '../common/OfferItem';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';
import { useRef } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'start ',
      overflow: 'hidden',
      overflowX: 'hidden',
      backgroundColor: 'transparent',
      maxHeight: '100%',
      height: '100%',
      paddingBottom: '52px'
    },
    gridList: {
      transform: 'translateZ(0)',
      padding: '10px !important', 
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Montserrat !important',
      whiteSpace: 'break-spaces'
    },
    titleBar: {
      color: 'white',
      background: 'rgba(206, 17, 38, 0.68)',
      fontFamily: 'Montserrat'
    },
  }),
);

function BuyContent(props: BuyScreenProps){
  const classes = useStyles();
  const isWideDevice = useMediaQuery({ minDeviceWidth: 444 });

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={isWideDevice ? 1 : 1} spacing={10} cellHeight={window.innerHeight*0.35}>
        {tileData.filter((p: ItemDetails)=> p.categoryId === GetIdBybCategoryTitle(props.filterByCategory)).map((tile: ItemDetails, index: number) => (
          <GridListTile key={tile.title} 
            style={{
              WebkitTapHighlightColor: 'transparent',
              marginTop: '10px', 
              outlineOffset: '-5px',
              outline: 'solid 1px rgba(206, 17, 38, 0.68)',
              height: window.innerHeight*0.3
              }}>
            <OfferItem tile={tile} index={index}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default BuyContent;