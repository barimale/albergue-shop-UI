import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { tileData, ItemDetails, GetIdBybCategoryTitle } from '../common/BuyItems';
import { BuyScreenProps } from '../screens/BuyScreen';
import React from 'react';
import OfferItem from '../common/OfferItem';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      padding: '32px', 
      paddingTop: '0px',
      maxHeight: '80%',
      height: 'inherit'
    },
    gridList: {
      margin: '0px !important',
      width: 'auto',
      height: 'auto',
      maxHeight: '100%',
      overflowX: 'hidden',
      scrollbarColor: '#636362 #010306'
    },
    icon: {
      background: 'rgba(206, 17, 38, 0.68)'
    },
    title: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Montserrat !important',
      whiteSpace: 'break-spaces'
    },
    titleBar: {
      background: 'rgba(206, 17, 38, 0.68)',
      fontFamily: 'Montserrat'
    }
  }),
);

function BuyContent(props: BuyScreenProps){
  const classes = useStyles();
  const filtered = tileData.filter((p: ItemDetails)=> p.categoryId === GetIdBybCategoryTitle(props.filterByCategory));
  const isHorizontalMobile = useMediaQuery({ minDeviceWidth: 444, maxDeviceHeight: 500 });
  
  return (
    <div className={classes.root}>
      <GridList 
        spacing={isHorizontalMobile ? undefined : 15}
        cellHeight={filtered.length > 1 ? window.innerHeight*0.35 : window.innerHeight*0.7} 
        className={classes.gridList} 
        cols={filtered.length > 1 ? 2 : 1}
        style={{
          width: filtered.length > 1 ? 'auto' : '80%',
          height: filtered.length > 1 ? 'auto' : 'inherit',
        }}>
        {filtered.map((tile: ItemDetails, index: number) => (
          <GridListTile key={tile.title} style={{width: filtered.length > 1 ? '50%' : '100%',padding: '10px', outlineOffset: '-10px', outline: 'solid 1px rgba(206, 17, 38, 0.68)'}}>
            <OfferItem tile={tile} index={index}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default BuyContent;