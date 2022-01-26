/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import sizeMe from 'react-sizeme';
import PrivayTermsModal from '../common/PrivacyTermsModal';
import RulesModal from '../common/RulesModal';
import { title as RulesTitle } from '../../rules';
import { title as PivacyTermsTitle } from '../../privacy-terms';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';
import { useShopStatus } from '../../hooks/useShopStatus';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'rgba(100,100,100,0.15)',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  title: {
    flexGrow: 1,
    fontSize: 10,
    color: 'white',
    fontFamily: 'Signoria-Bold',
  },
}));

function Footer () {
  const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(false);
  const [isModal2Displayed, setIsModal2Displayed] = useState<boolean>(false);
  const status = useShopStatus();
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      {() => (
        <footer
          className={classes.root}
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
          }}
        >
          <div className={classes.title}>
            <span>
              &copy; 2021
              {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
              <>
                <a
                  className="pointerOverEffect"
                  style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    textDecoration: 'underline',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onClick={(event:any) => {
                    event.stopPropagation();
                    setIsModalDisplayed(true);
                  }}
                >
                  {t(PivacyTermsTitle)}
                </a>
                <a
                  className="pointerOverEffect"
                  style={{
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    textDecoration: 'underline',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onClick={(event:any) => {
                    event.stopPropagation();
                    setIsModal2Displayed(true);
                  }}
                >
                  {t(RulesTitle)}
                </a>
              </>
              )}
            </span>
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
          </div>
        </footer>
      )}
    </DeviceContextConsumer>
  );
}

export default sizeMe({
  monitorHeight: true,
})(Footer);
