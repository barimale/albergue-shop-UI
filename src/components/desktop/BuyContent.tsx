import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ItemDetails } from '../common/BuyItems';
import OfferItem from '../common/OfferItem';
import { useMediaQuery } from 'react-responsive';
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      padding: '32px', 
      paddingTop: '0px',
      maxHeight: '100%',
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

export type BuyContentProps = {
  items: Array<ItemDetails>;
}

function BuyContent(props: BuyContentProps){
  const { items } = props;
  const classes = useStyles();
  const isHorizontalMobile = useMediaQuery({ minDeviceWidth: 444, maxDeviceHeight: 500 });
  
  return (
    //WIP reuse it for the mobile only
    // <div className={classes.root}>
    //   <GridList 
    //     spacing={isHorizontalMobile ? undefined : 15}
    //     cellHeight={items.length > 1 ? window.innerHeight*0.35 : window.innerHeight*0.7} 
    //     className={classes.gridList} 
    //     cols={items.length > 1 ? 2 : 1}
    //     style={{
    //       width: items.length > 1 ? 'auto' : '80%',
    //       height: items.length > 1 ? 'auto' : 'inherit',
    //     }}>
    //     {items?.map((tile: ItemDetails, index: number) => (
    //       <GridListTile key={tile.id || index} 
    //         style={{
    //           width: items.length > 1 ? '50%' : '100%',
    //           padding: '10px', 
    //           outlineOffset: '-10px', 
    //           outline: 'solid 2px black'}}>
    //         <OfferItem tile={tile} index={index}/>
    //       </GridListTile>
    //     ))}
    //   </GridList>
    // </div>
    <DeviceContextConsumer>
      {context =>
    <div style={{
      height: '100%',
      maxHeight: '100%',
      width: '100%',
      scrollBehavior: 'smooth'
  }}>
      <GridList 
        cellHeight={context.valueOf() === DeviceType.isDesktopOrLaptop ? 400: 200} 
        className={classes.gridList} 
        cols={context.valueOf() === DeviceType.isDesktopOrLaptop ? 3 : ((window.innerWidth /2 > 200 ) ? 2 : 1)} >
         {items.map((tile: ItemDetails, index:number) => (
              <GridListTile 
                  style={{
                      cursor: 'pointer'
                  }}
                  className={"pointerOverEffect"}
                  key={index} 
                  cols={1} 
                  onClick={() =>{
                  var element = document.getElementById((context.valueOf() === DeviceType.isDesktopOrLaptop ? "ccm" : "ccd")+index);

                  if(element !==null){
                    element.click();
                  }
              }}>
                  <OfferItem tile={tile} index={index}/>
              </GridListTile>
            ))}
        </GridList>
    </div>
  }
  </DeviceContextConsumer>
  );
}

export default BuyContent;