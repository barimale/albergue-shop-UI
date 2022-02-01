/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import React, { useContext, useState } from 'react';
import { Button, Checkbox, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import RulesModal from '../RulesModal';
import PrivayTermsModal from '../PrivacyTermsModal';
import { useEmailClient } from '../../../hooks/useEmailClient';
import { CartContext } from '../../../contexts/CartContext';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { useGroupedItems } from '../../../hooks/useGroupedItems';
import { theme } from '../../../customTheme';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
    fontFamily: 'Signoria-Bold',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

type SummaryContentProps = {
  handleNext: () => void;
  scrollToBottom?: () => void;
}

export default function SummaryContent (props: SummaryContentProps) {
  const { scrollToBottom } = props;
  const { send } = useEmailClient();
  const classes = useStyles();
  const [isOrderInProgress, setIsOrderInProgress] = useState<boolean>(false);
  const { handleNext } = props;
  const { total } = useGroupedItems();
  const [isPolicyTermAgreed, setIsPolicyTermAgreed] = useState<boolean>(false);
  const [isCaptchaAgreed, setIsCaptchaAgreed] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const { clear, getAddressDetails, setOrderStatus } = useContext(CartContext);
  const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(false);
  const [isModal2Displayed, setIsModal2Displayed] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  let captcha : ReCAPTCHA | null = null;

  return (
    <DeviceContextConsumer>
      {() => (
        <div
          style={{
            width: '80%',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'max-content',
            maxHeight: window.innerHeight * 0.4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {t('Total')}
                  </Typography>
                  <Typography
                    gutterBottom
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {`${t('Your order costs ') + total().toFixed(2)}`}
                    <EuroSymbolIcon
                      style={{
                        height: '16px',
                        width: 'auto',
                        paddingLeft: '4px',
                      }}
                    />
                  </Typography>
                </div>
                <Divider />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {t('Shippment cost')}
                  </Typography>
                  <Typography gutterBottom>{t('WIP')}</Typography>
                </div>
                <Divider />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" gutterBottom className={classes.title}>
                    {t('Shippment details')}
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    {getAddressDetails().firstName !== '' && (
                    <Typography gutterBottom>{`${getAddressDetails().firstName} ${getAddressDetails().lastName}`}</Typography>
                    )}
                    {getAddressDetails().zipCode !== '' && (
                    <Typography gutterBottom>{`${getAddressDetails().zipCode} ${getAddressDetails().city}`}</Typography>
                    )}
                    {getAddressDetails().addressLine1 !== '' && (
                    <Typography gutterBottom>{getAddressDetails().addressLine1}</Typography>
                    )}
                    {getAddressDetails().addressLine2 !== '' && (
                    <Typography gutterBottom>{getAddressDetails().addressLine2}</Typography>
                    )}
                    {getAddressDetails().country !== '' && (
                    <Typography gutterBottom>{`${getAddressDetails().country}, ${getAddressDetails().region}`}</Typography>
                    )}
                    {getAddressDetails().email !== '' && (
                    <Typography gutterBottom>{getAddressDetails().email}</Typography>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Checkbox
                  color="primary"
                  onChange={(event: any, checked: boolean) => {
                    setIsPolicyTermAgreed(checked);
                    if (checked === false) {
                      setCaptchaToken(null);
                      setIsCaptchaAgreed(false);
                      if (captcha !== null) {
                        captcha.reset();
                      } else {
                        // eslint-disable-next-line no-unused-expressions
                        scrollToBottom !== undefined && scrollToBottom();
                      }
                    }
                  }}
                />
                <Typography
                  noWrap={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {`${t('I hereby accept')}` + ' '}
                  <a
                    style={{
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      cursor: 'pointer',
                      color: `${theme.palette.primary.main}`,
                      textDecoration: 'unset',
                    }}
                    onClick={(event:any) => {
                      event.stopPropagation();
                      setIsModal2Displayed(true);
                    }}
                  >
                    {t('shop rules')}
                  </a>
                  {`${t('and fully agree with')}`}
                  <a
                    style={{
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      cursor: 'pointer',
                      color: `${theme.palette.primary.main}`,
                      textDecoration: 'unset',
                    }}
                    onClick={(event:any) => {
                      event.stopPropagation();
                      setIsModalDisplayed(true);
                    }}
                  >
                    {`${t('privacy policy')}.`}
                  </a>
                </Typography>
              </div>
              <PrivayTermsModal
                isDisplayed={isModalDisplayed}
                onHide={() => {
                  setIsModalDisplayed(false);
                }}
              />
              <RulesModal
                isDisplayed={isModal2Displayed}
                onHide={() => {
                  setIsModal2Displayed(false);
                }}
              />
            </Grid>
            <Grid
              style={{
                textAlign: 'center', display: isPolicyTermAgreed ? 'inline-block' : 'none',
              }}
              item
              xs={12}
            >
              <div style={{
                display: 'inline-block',
              }}
              >
                <ReCAPTCHA
                  ref={(el:any) => { captcha = el; }}
                  hl={i18n.language.toLowerCase()}
                  theme="dark"
                  sitekey="6LcjoCgaAAAAAB7P7CzAN8jUbsXaS1cGht_CSsb0"
                  onChange={(token: string | null) => {
                    setCaptchaToken(token);
                    setIsCaptchaAgreed(true);
                  }}
                  onExpired={() => {
                    setIsCaptchaAgreed(false);
                    setCaptchaToken(null);
                  }}
                  onErrored={() => {
                    setIsCaptchaAgreed(false);
                    setCaptchaToken(null);
                  }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                disabled={(!isPolicyTermAgreed) || isOrderInProgress || (!isCaptchaAgreed)}
                variant="contained"
                color="primary"
                className="pointerOverEffect"
                onClick={async () => {
                  setIsOrderInProgress(true);

                  const result = await send(
                    getAddressDetails().email,
                    `${t('Order').toUpperCase()} - Albergue De Peregrinos Porto - Shop`,
                    captchaToken || '',
                  );

                  setOrderStatus(result);
                  setIsOrderInProgress(false);
                  if (result === 'success') {
                    clear();
                  }
                  handleNext();
                }}
              >
                {isOrderInProgress === true && (
                <CircularProgress
                  color="inherit"
                  style={{
                    height: '26px', width: '26px', marginRight: '10px',
                  }}
                />
                )}
                {t('Order').toUpperCase()}
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </DeviceContextConsumer>
  );
}
