import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ItemDetails } from '../common/BuyItems';
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
      fontFamily: 'Signoria-Bold !important',
      whiteSpace: 'break-spaces'
    },
    titleBar: {
      background: 'rgba(206, 17, 38, 0.68)',
      fontFamily: 'Signoria-Bold'
    }
  }),
);

export type CategoriesContentProps = {
  items: Array<ItemDetails>;
}

function CategoriesContent(props: CategoriesContentProps){
  const { items } = props;
  const classes = useStyles();
  const isHorizontalMobile = useMediaQuery({ minDeviceWidth: 444, maxDeviceHeight: 500 });
  
  return (
    <div className={classes.root}>
      <GridList 
        spacing={isHorizontalMobile ? undefined : 15}
        cellHeight={items.length > 1 ? window.innerHeight*0.35 : window.innerHeight*0.7} 
        className={classes.gridList} 
        cols={items.length > 1 ? 2 : 1}
        style={{
          width: items.length > 1 ? 'auto' : '80%',
          height: items.length > 1 ? 'auto' : 'inherit',
        }}>
        {items?.map((tile: ItemDetails, index: number) => (
          <GridListTile key={tile.id || index} 
            style={{
              width: items.length > 1 ? '50%' : '100%',
              padding: '10px', 
              outlineOffset: '-10px', 
              outline: 'solid 3px gray'}}>
            <OfferItem tile={tile} index={index}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default CategoriesContent;