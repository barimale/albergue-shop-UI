/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { content, title } from '../../rules';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

type PrivayTermsModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
}

export default function RulesModal (props: PrivayTermsModalProps) {
  const classes = useStyles();
  const { isDisplayed, onHide } = props;
  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.7;
  const { t } = useTranslation();

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
                fontFamily: 'Signoria-Bold !important',
                textAlign: 'center',
                width: context === DeviceType.isDesktopOrLaptop ? '50%' : '100%',
              }}
            >
              <h2 style={{
                fontFamily: 'Signoria-Bold',
              }}
              >
                {title.toUpperCase()}
              </h2>
              <p style={{
                maxHeight,
                textAlign: 'justify',
                fontFamily: 'Signoria-Bold',
                overflowY: 'auto',
                paddingLeft: '5px',
                paddingRight: '5px',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px',
              }}
              >
                <div dangerouslySetInnerHTML={{
                  __html: content,
                }}
                />
              </p>
              <Button
                className="pointerOverEffect"
                style={{
                  fontFamily: 'Signoria-Bold',
                  marginBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                  marginTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleClose();
                }}
              >
                {t('Close').toUpperCase()}
              </Button>
            </div>
          </Fade>
        </Modal>
      )}
    </DeviceContextConsumer>
  );
}
