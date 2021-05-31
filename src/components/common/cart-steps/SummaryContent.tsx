import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useGroupedItems } from "../../../hooks/useGroupedItems";
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import Divider from "@material-ui/core/Divider";
import React, { useContext, useState } from 'react';
import { CartContext } from '../../../contexts/CartContext';
import { Button } from '@material-ui/core';
import PrivayTermsModal from '../PrivacyTermsModal';
import RulesModal from "../RulesModal";
import { Checkbox } from '@material-ui/core';
import { useEmailClient } from '../../../hooks/useEmailClient';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0)
    },
    total: {
      fontWeight: 700,
      fontFamily: 'Signoria-Bold'
    },
    title: {
      marginTop: theme.spacing(2)
    },
  }));

type SummaryContentProps = {
  handleNext: () => void;
}

export default function SummaryContent(props: SummaryContentProps){
  const { send } = useEmailClient();
  const classes = useStyles();
  const [ isOrderInProgress, setIsOrderInProgress ] = useState<boolean>(false);
  const { handleNext } = props;
  const { total } = useGroupedItems();
  const [ isPolicyTermAgreed, setIsPolicyTermAgreed ] = useState<boolean>(false);
  const [ isCaptchaAgreed, setIsCaptchaAgreed ] = useState<boolean>(false);
  const [ captchaToken, setCaptchaToken ] = useState<string | null>(null);
  const { clear, getAddressDetails, items, setOrderStatus } = useContext(CartContext);
  const [ isModalDisplayed, setIsModalDisplayed ] = useState<boolean>(false);
  const [ isModal2Displayed, setIsModal2Displayed ] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  let captcha : ReCAPTCHA | null = null;

return(
  <DeviceContextConsumer>
    {context => 
    <div style={{width: '80%'}}>
      <Grid container spacing={2}>
        <Grid 
          item 
          xs={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              {t('Total')}
            </Typography>
            <Typography gutterBottom>{`${t('Your order costs ') + total()} Euros.`}</Typography>
            <Divider/>
        </Grid>
        <Grid 
          item 
          xs={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              {t('Shippment cost')}
            </Typography>
            <Typography gutterBottom>{t('WIP')}</Typography>
            <Divider/>
        </Grid>
        <Grid
          item 
          xs={12}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            {t('Shippment details')}
          </Typography>
          {getAddressDetails().firstName !== "" && (
            <Typography gutterBottom>{getAddressDetails().firstName + ' ' + getAddressDetails().lastName}</Typography>
          )}
          {getAddressDetails().zipCode !== "" && (
            <Typography gutterBottom>{getAddressDetails().zipCode + ' ' + getAddressDetails().city}</Typography>
          )}
          {getAddressDetails().addressLine1 !== "" && (
            <Typography gutterBottom>{getAddressDetails().addressLine1}</Typography>
          )}
          {getAddressDetails().addressLine2 !== "" && (
            <Typography gutterBottom>{getAddressDetails().addressLine2}</Typography>
          )}
          {getAddressDetails().country !== "" && (
            <Typography gutterBottom>{getAddressDetails().country + ', ' + getAddressDetails().region}</Typography>
          )}
          {getAddressDetails().email !== "" && (
            <Typography gutterBottom>{getAddressDetails().email}</Typography>
          )}
          <Divider/>
        </Grid>
        <Grid item 
          xs={12}>
          <Checkbox
            onChange={(event: any, checked: boolean)=>{
              setIsPolicyTermAgreed(checked);
              if(checked === false){
                setCaptchaToken(null);
                setIsCaptchaAgreed(false);
                if(captcha !== null){
                  captcha.reset();
                }
              }
            }}
            color="secondary"/>
          <span>
            {t('I hereby accept ')}
            <a 
              style={{
                cursor: 'pointer',
                color: '#0B3976',
                textDecoration: 'underline'
              }}
              onClick={(event:any)=>{
              event.stopPropagation();
              setIsModal2Displayed(true);
            }}>
            {t('shop rules')}</a>
            {t(' and fully agree with ')}
            <a 
              style={{
                cursor: 'pointer',
                color: '#0B3976',
                textDecoration: 'underline'
              }}
              onClick={(event:any)=>{
              event.stopPropagation();
              setIsModalDisplayed(true);
            }}>
              {t('privacy policy.')}</a>
          </span>
          <PrivayTermsModal 
            isDisplayed={isModalDisplayed} 
            onHide={()=>{
            setIsModalDisplayed(false);
          }}/>
          <RulesModal
            isDisplayed={isModal2Displayed} 
            onHide={()=>{
            setIsModal2Displayed(false);
          }}/>
        </Grid>
        <Grid
          style={{textAlign: 'center', display: isPolicyTermAgreed ? "inline-block" : "none"}}
          item 
          xs={12}>
          <div style={{display: 'inline-block'}}>
            <ReCAPTCHA
            ref={el => { captcha = el; }}
              hl={i18n.language.toLowerCase()}
              // WIP
              sitekey="6LcjoCgaAAAAAB7P7CzAN8jUbsXaS1cGht_CSsb0"
              onChange={(token: string | null)=>{
                setCaptchaToken(token);
                setIsCaptchaAgreed(true);
              }}
              onExpired={()=>{
                setIsCaptchaAgreed(false);
                setCaptchaToken(null);
              }}
              onErrored={()=>{
                setIsCaptchaAgreed(false);
                setCaptchaToken(null);
              }}/>
          </div>
        </Grid>
        <Grid
          item 
          xs={12}>
          <Button
            disabled={(!isPolicyTermAgreed) || isOrderInProgress || (!isCaptchaAgreed)}
            variant={"contained"}
            color="primary"
            className={"pointerOverEffect"}
            onClick={async ()=>{
              setIsOrderInProgress(true);

              const result = await send(
                getAddressDetails().email, 
                `${t("Order").toUpperCase()} - Albergue De Peregrinos Porto - Shop`, 
                captchaToken || ""
              );

              setOrderStatus(result);
              setIsOrderInProgress(false);
              if(result === "success"){
                clear();
              }
              handleNext();
            }}>
            {isOrderInProgress === true && (
              <CircularProgress color={'inherit'} style={{height: '26px', width: '26px', marginRight: '10px'}}/>
            )}
            {t("Order").toUpperCase()}
          </Button>
        </Grid>
      </Grid>
    </div>
    }
  </DeviceContextConsumer>
);
}
