import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import PrivayTermsModal from '../common/PrivacyTermsModal';
import RulesModal from "../common/RulesModal";
import { title as RulesTitle } from "../../rules";
import { title as PivacyTermsTitle } from "../../privacy-terms";
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';
import { useShopStatus } from '../../hooks/useShopStatus';
import { useTranslation } from 'react-i18next';
import sizeMe from 'react-sizeme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(100,100,100,0.15)',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  title: {
    flexGrow: 1,
    fontSize: 10,
    color: 'white',
    fontFamily: 'Signoria-Bold'
  },
}));

function Footer(){
  const [ isModalDisplayed, setIsModalDisplayed ] = useState<boolean>(false);
  const [ isModal2Displayed, setIsModal2Displayed ] = useState<boolean>(false);
  const status = useShopStatus();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
    {context => 
      <footer className={classes.root} style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%'}}>
        <div className={classes.title}>
          <span>
            <>
              &copy; 2021
            </>
            {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
            <>
                <a 
                  className={"pointerOverEffect"}
                  style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    textDecoration: 'underline',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onClick={(event:any)=>{
                  event.stopPropagation();
                  setIsModalDisplayed(true);
                }}>
                {t(PivacyTermsTitle)}
                </a>
                <a 
                  className={"pointerOverEffect"}
                  style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    textDecoration: 'underline',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onClick={(event:any)=>{
                  event.stopPropagation();
                  setIsModal2Displayed(true);
                }}>
                {t(RulesTitle)}
                </a>
            </>
            )}
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
        </div>
      </footer>
    }   
    </DeviceContextConsumer>
  )
}

export default sizeMe({ monitorHeight: true })(Footer);