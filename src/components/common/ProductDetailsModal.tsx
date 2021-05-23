import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ItemDetails, ItemImageDetails } from './BuyItems';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { BuyButton } from '../molecules/Cart';
import { AskButton } from "../molecules/AskButton";
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';

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
      scrollbarColor: `rgba(203,203,203,0.5) white`
    },
    gridList: {
      width: 'auto',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
      overflowX: 'auto',
      scrollbarColor: `rgba(203,203,203,0.5) white`,
      flexWrap: 'nowrap',
      transform: 'translateZ(0)'
    },
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type ProductDetailsModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
    item: ItemDetails;
}

export default function ProductDetailsModal(props: ProductDetailsModalProps) {
  const classes = useStyles();
  const { isDisplayed, onHide, item } = props;
  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.9;
  const images = item.images;
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(()=>{
    setOpen(isDisplayed);
  }, [ isDisplayed ]);

  const handleClose = () => {
    setOpen(false);
    onHide();
  };

  return (
    <DeviceContextConsumer>
    {context =>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={open}>
        <>
          <div 
            className={classes.paper}
            style={{
              borderLeft: `20px solid ${theme.palette.primary.main}`,
              maxHeight: maxHeight,
              width: context === DeviceType.isDesktopOrLaptop ? (images.length === 1 ? '50%' : '75%') : '95%'
            }}>
            <h2 
            style={{
              fontSize: context === DeviceType.isDesktopOrLaptop ? '24px' : '14px',
              marginTop: '5px'
              }}>{item.translatableDetails[0].name}</h2>
            <GridList 
              cellHeight={window.innerHeight*0.25} 
              className={classes.gridList} 
              cols={context === DeviceType.isDesktopOrLaptop ?(images.length > 1 ? (images.length > 2 ? 2.5 : 2) : 1):(images.length > 1 ? 1.5 : 1)}>
              {images.map((tile: ItemImageDetails, index: number) => (
                <GridListTile key={index} cols={1}>
                  <img src={tile.imageData} alt={item.id! + '_' + index}/>
                </GridListTile>
              ))}
            </GridList>
            <h4 style={{
              }}>{t('Price') + ': ' + (item.active.valueOf() === false ? '-' : item.price + 'EUR') }
              </h4>
            <div 
              className={classes.scroolableContent}
              style={{
                height:window.innerHeight*0.3
              }}>
            <h4 style={{
              fontFamily: 'Signoria-Bold',
              margin: '0px'
            }}>{t("Description")}</h4>
            <p style={{
              maxHeight: maxHeight,
              textAlign: 'justify',
              fontFamily: 'Signoria-Bold',
              overflowY: 'auto',
              paddingLeft: '5px',
              paddingRight: '5px',
              whiteSpace: 'pre-line',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
            }}>
              {/* //WIP descriptionKey */}
              <div dangerouslySetInnerHTML={{ __html: item.translatableDetails[0].description }} />
            </p>
            <h4 style={{fontFamily: 'Signoria-Bold', margin: '0px'}}>{t('Details')}</h4>
            <p style={{
              maxHeight: maxHeight,
              textAlign: 'justify',
              fontFamily: 'Signoria-Bold',
              overflowY: 'auto',
              paddingLeft: '5px',
              paddingRight: '5px',
              whiteSpace: 'pre-line',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
            }}>
              <div dangerouslySetInnerHTML={{ __html: item.translatableDetails[0].shortDescription }} />
            </p>
            </div>
            <div style={{
              paddingTop: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'}}>
            {item.active === false ? (
              <AskButton/>
            ):(
              <BuyButton 
              onClicked={()=>{
                handleClose();
              }}
              item={item}/>
            )}
            <Button
              className={"pointerOverEffect"}
              variant="contained"
              style={{
                color: `${theme.palette.common.black}`,
              }}
              onClick={(event: any)=>{
                event.stopPropagation();
                handleClose();
              }}>{t('Close').toUpperCase()}</Button>
              </div>
          </div>
        </>
        </Fade>
      </Modal>}
    </DeviceContextConsumer>
  );
}