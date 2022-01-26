/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { Typography } from '@material-ui/core';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import externali18n from '../../externali18n';
import { AskButton } from '../molecules/AskButton';
import { BuyButton } from '../molecules/Cart';
import maini18n from '../../i18n';
import { ItemDetails, ItemImageDetails } from './BuyItems';
import { ModalTitle } from '../molecules/ModalTitle';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    scrollbarColor: 'rgba(203,203,203,0.5) white',
  },
  gridList: {
    width: window.innerWidth * 0.8 - 70,
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    overflowX: 'auto',
    scrollbarColor: 'rgba(203,203,203,0.5) white',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[2],
  },
}));

type ProductDetailsModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
    item: ItemDetails;
}

export default function ProductDetailsModal (props: ProductDetailsModalProps) {
  const { isDisplayed, onHide, item } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.9;
  const { images } = item;
  const theme = useTheme();

  useEffect(() => {
    setOpen(isDisplayed);
  }, [isDisplayed]);

  const handleClose = () => {
    setOpen(false);
    onHide();
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          disableBackdropClick
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 100,
          }}
        >
          <Fade in={open}>
            <div
              className={classes.paper}
              style={{
                borderLeft: `20px solid ${theme.palette.primary.main}`,
                maxHeight,
                width: context === DeviceType.isDesktopOrLaptop ? (images.length === 1 ? '50%' : '75%') : '95%',
              }}
            >
              <I18nextProvider i18n={externali18n}>
                <ModalTitle
                  title={`${item.id || ''}.name`}
                  close={(event: any) => {
                    event.stopPropagation();
                    handleClose();
                  }}
                />
              </I18nextProvider>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <GridList
                  cellHeight={window.innerHeight * 0.34}
                  className={classes.gridList}
                  cols={context === DeviceType.isDesktopOrLaptop ? (images.length > 1 ? (images.length > 2 ? 1.5 : 2) : 1) : (images.length > 1 ? 1.5 : 1)}
                >
                  {images.map((tile: ItemImageDetails, index: number) => (
                    <GridListTile
                      key={index}
                      cols={1}
                      style={{
                        width: 'max-content !important',
                      }}
                    >
                      <img
                        src={tile.imageData}
                        alt={`${item.id!}_${index}`}
                        style={{
                          height: '100%',
                          width: 'auto',
                          textAlign: 'center',
                        }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
                <div
                  style={{
                    padding: '20px',
                    paddingTop: '10px',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ? '18px' : '20px',
                      paddingBottom: '10px',
                      paddingTop: '3px',
                    }}
                  >
                    <I18nextProvider i18n={maini18n}>
                      <TranslatablePrice priceKey="Price" item={item} />
                    </I18nextProvider>
                  </Typography>
                  <div
                    className={classes.scroolableContent}
                    style={{
                      height: window.innerHeight * 0.15,
                      border: '0.5px solid gray',
                      padding: '10px',
                      marginRight: '30px',
                    }}
                  >
                    <I18nextProvider i18n={maini18n}>
                      <TranslatableDescription descriptionKey="Description" />
                    </I18nextProvider>
                    <p style={{
                      maxHeight,
                      textAlign: 'justify',
                      fontFamily: 'Signoria-Bold',
                      overflowY: 'auto',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                      whiteSpace: 'pre-line',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px',
                    }}
                    >
                      <I18nextProvider i18n={externali18n}>
                        <TranslatableContainer content={`${item.id || ''}.description`} />
                      </I18nextProvider>
                    </p>
                    <I18nextProvider i18n={maini18n}>
                      <TranslatableDetails detailsKey="Details" />
                    </I18nextProvider>
                    <p style={{
                      maxHeight,
                      textAlign: 'justify',
                      fontFamily: 'Signoria-Bold',
                      overflowY: 'auto',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                      whiteSpace: 'pre-line',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px',
                    }}
                    >
                      <I18nextProvider i18n={externali18n}>
                        <TranslatableContainer content={`${item.id || ''}.shortDescription`} />
                      </I18nextProvider>
                    </p>
                  </div>
                  <div style={{
                    paddingTop: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                  >
                    <I18nextProvider i18n={maini18n}>
                      {item.active === false ? (
                        <AskButton />
                      ) : (
                        <BuyButton
                          onClicked={(event: any) => {
                            event?.stopPropagation();
                            handleClose();
                          }}
                          item={item}
                        />
                      )}
                    </I18nextProvider>
                    <I18nextProvider i18n={maini18n}>
                      <TranslatableCloseButton handleClose={handleClose} closeKey="Close" />
                    </I18nextProvider>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
}

type TranslatablePriceProps = {
  priceKey: string;
  item: ItemDetails;
}
const TranslatablePrice = (props: TranslatablePriceProps) => {
  const { priceKey, item } = props;
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: 'max-content',
      }}
    >
      {`${t(priceKey)}: ${item.price.toFixed(2)}`}
      <EuroSymbolIcon
        style={{
          paddingLeft: '4px',
          height: '18px',
          color: 'black',
          width: 'auto',
        }}
      />
    </div>
  );
};

type TranslatableContainerProps = {
  content: string;
}
const TranslatableContainer = (props: TranslatableContainerProps) => {
  const { content } = props;
  const { t } = useTranslation('externals');

  return (
    <div dangerouslySetInnerHTML={{
      __html: t(content),
    }}
    />
  );
};

type TranslatableDetailsProps = {
  detailsKey: string;
}

const TranslatableDetails = (props: TranslatableDetailsProps) => {
  const { detailsKey } = props;
  const { t } = useTranslation();

  return (
    <h4
      style={{
        fontFamily: 'Signoria-Bold',
        margin: '0px',
        paddingTop: '0px',
      }}
    >
      {t(detailsKey)}
    </h4>
  );
};

type TranslatableDescriptionProps = {
  descriptionKey: string;
}

const TranslatableDescription = (props: TranslatableDescriptionProps) => {
  const { descriptionKey } = props;
  const { t } = useTranslation();

  return (
    <h4
      style={{
        fontFamily: 'Signoria-Bold',
        margin: '0px',
        paddingTop: '0px',
      }}
    >
      {t(descriptionKey)}
    </h4>
  );
};

type TranslatableCloseButtonProps = {
  closeKey: string;
  handleClose: () => void;
}

const TranslatableCloseButton = (props: TranslatableCloseButtonProps) => {
  const { closeKey, handleClose } = props;
  const { t } = useTranslation('translation');
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Button
          className="pointerOverEffect"
          variant="contained"
          style={{
            color: `${theme.palette.common.black}`,
            borderRadius: '0px',
            paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
            paddingRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
            marginRight: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
            backgroundColor: `${theme.palette.common.white}`,
            fontSize: '16px',
          }}
          onClick={(event: any) => {
            event.stopPropagation();
            handleClose();
          }}
        >
          {t(closeKey).toUpperCase()}
        </Button>
      )}
    </DeviceContextConsumer>
  );
};
