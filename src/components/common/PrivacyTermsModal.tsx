import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { content, title } from "../../privacy-terms";
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

type PrivayTermsModalProps = {
    isDisplayed: boolean;
    onHide: () => void;
}

export default function PrivayTermsModal(props: PrivayTermsModalProps) {
  const classes = useStyles();
  const { isDisplayed, onHide } = props;
  const [open, setOpen] = React.useState(false);
  const maxHeight = window.innerHeight * 0.7;

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
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}
      >
        <Fade in={open}>
          <div 
            className={classes.paper}
            style={{
              fontFamily: 'Montserrat !important',
              textAlign: 'center',
              width: context === DeviceType.isDesktopOrLaptop ? '50%' : '100%'
            }}>
            <h2 style={{fontFamily: 'Montserrat'}}>{title.toUpperCase()}</h2>
            <p style={{
              maxHeight: maxHeight,
              textAlign: 'justify',
              fontFamily: 'Montserrat',
              overflowY: 'auto',
              paddingLeft: '5px',
              paddingRight: '5px',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px'
            }}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </p>
            <Button
              className={"pointerOverEffect"}
              style={{
                fontFamily: 'Montserrat',
                marginBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                marginTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'}}
              variant={"contained"}
              color="secondary"
              onClick={()=>{
                handleClose();
              }}>
              {'ZAMKNIJ'}
            </Button>
          </div>
        </Fade>
      </Modal>
      }
    </DeviceContextConsumer>
  );
}