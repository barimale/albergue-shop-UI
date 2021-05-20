import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { tileData, ItemDetails, GetIdBybCategoryTitle } from './BuyItems';
import { Path as ContactPath } from "../screens/ContactScreen";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button/Button';
import { BuyScreenProps } from '../screens/BuyScreen';
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      overflowX: 'auto',
      scrollbarColor: `#636362 #010306`,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      paddingTop: '10px',
      paddingBottom: '0px',
      margin: '0px !important'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: '32px',
        paddingTop: '0px',
        maxHeight: '80%',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scroolableContent: {
        width: '100%',
        maxHeight: '100%',
        overflowX: 'hidden',
        scrollbarColor: '#636362 #010306'
      },
      paper: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: 'rgba(206, 17, 38, 0.4)',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }),
);

function TusScreenContent(props: BuyScreenProps){
    const classes = useStyles();
    const maxHeight = window.innerHeight * 0.9;
    const filtered = tileData.filter((p: ItemDetails)=> p.categoryId === GetIdBybCategoryTitle(props.filterByCategory));
    const item = filtered[0];
    const images = item.img;
    const history = useHistory();

    return (
    <DeviceContextConsumer>
        {context =>
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: context === DeviceType.isDesktopOrLaptop ? 'unset': '90%',
            height: '100%'
        }}>
          <>
          <div
            className={classes.paper}
            style={{
              maxHeight: maxHeight,
              width: context === DeviceType.isDesktopOrLaptop ? '75%' : 'unset',
              textAlign: 'left',
              height: window.innerHeight*0.8
            }}>
            <div
            style={{
              textAlign: 'left',
              fontFamily: 'Montserrat',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '24px' : '14px',
              marginTop: '5px'
              }}>{item.title}</div>
            <div style={{padding: '0px', paddingBottom: '20px'}}>
            <GridList
              cellHeight={context === DeviceType.isDesktopOrLaptop ? window.innerHeight*0.28 : window.innerHeight*0.28}
              className={classes.gridList}
              cols={context === DeviceType.isDesktopOrLaptop ?(images.length > 1 ? (images.length > 2 ? 2.5 : 2) : 1):(images.length > 1 ? 1.5 : 1)}>
              {images.map((tile: string, index: number) => (
                <GridListTile key={index} cols={1}>
                  <img src={tile} alt={item.title + '_' + index} style={{
                      WebkitTapHighlightColor: 'transparent',
                      height: '100%',
                      objectFit: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'cover' : 'cover',
                      width:context.valueOf() === DeviceType.isDesktopOrLaptop ? '100%' : '100%',
                  }}/>
                </GridListTile>
              ))}
            </GridList>
            </div>
            <div
              className={classes.scroolableContent}
              style={{
                textAlign: 'left',
                height: context === DeviceType.isDesktopOrLaptop ? window.innerHeight*0.28: window.innerHeight*0.28,
              }}>
                <div style={{
                  fontFamily: 'Montserrat',
                  paddingTop: '10px',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '18px' : '12px',
                }}>
                  {'Cena'}
                </div>
                <p 
                  style={{
                    textAlign: 'justify',
                    fontFamily: 'Montserrat',
                    overflowY: 'auto',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    whiteSpace: 'pre-line',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
                }}>
                  <div dangerouslySetInnerHTML={{ __html: item.priceDescription }} />
                </p>
                <div style={{
                  fontFamily: 'Montserrat',
                  margin: '0px',
                  paddingTop: '10px',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '18px' : '12px',
                }}>Opis</div>
                <p style={{
                  textAlign: 'justify',
                  fontFamily: 'Montserrat',
                  overflowY: 'auto',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  whiteSpace: 'pre-line',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
                }}>
                  <div dangerouslySetInnerHTML={{ __html: item.description }} style={{paddingTop: '0px'}}/>
                </p>
                <div 
                  style={{
                    textAlign: 'left',
                    fontFamily: 'Montserrat',
                    paddingTop: '10px',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '18px' : '12px',
                    margin: '0px'
                }}>
                  Szczegóły
                </div>
                <p style={{
                  textAlign: 'justify',
                  fontFamily: 'Montserrat',
                  overflowY: 'auto',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  whiteSpace: 'pre-line',
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
                }}>
                  <div dangerouslySetInnerHTML={{ __html: item.shortDescription }} />
                </p>
              </div>
              <div style={{
                height: window.innerHeight*0.08,
                }}>
                <Button
                  className={"pointerOverEffect"}
                  style={{
                    fontFamily: 'Montserrat',
                    marginBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                    marginTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                  }}
                  variant={"contained"}
                  color="secondary"
                  onClick={(event: any)=>{
                    event.stopPropagation();
                    history.push(ContactPath);
                }}>
                  {'ZAPYTAJ'}
                </Button>
              </div>
            </div>
          </>
        </div>
      }
    </DeviceContextConsumer>
    );
}

export default TusScreenContent;