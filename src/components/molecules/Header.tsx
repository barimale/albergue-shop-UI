import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import sizeMe from 'react-sizeme';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useTheme from '@material-ui/core/styles/useTheme';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MenuWithItems } from '../mobile/MenuWithItems';
import Cart from './Cart';
import MenuButtons from '../desktop/MenuButtons';
import { ShopStatus, useShopStatus } from '../../hooks/useShopStatus';
import LanguageSetter from '../organisms/LanguageSetter';
import { thirdMain } from '../../customTheme';
import { Ornament } from './Ornament';
import { Logo } from '../common/Logo';
import externali18n from '../../externali18n';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
}));

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color : 'transparent';
  :hover, :active {
    color: inherit;
    -webkit-tap-highlight-color : 'transparent';
 }
`;

function TopMenu () {
  const classes = useStyles();
  const theme = useTheme();
  const status = useShopStatus();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          className={classes.root}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            height: (status === undefined || status.isAtLeastOneCategoryDefined.valueOf() === false) ? '0px' : 'inherit',
            visibility: (status === undefined || status.isAtLeastOneCategoryDefined.valueOf() === false) ? 'collapse' : 'visible',
            background: `${thirdMain}`,
          }}
        >
          <AppBar
            position="sticky"
            style={{
              paddingTop: context === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
              paddingBottom: '5px',
              boxShadow: 'unset',
              borderBottom: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
              borderTop: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
              backgroundColor: 'transparent',
            }}
          >
            <Ornament />
            <Toolbar
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
              }}
            >
              {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
                context === DeviceType.isTabletOrMobile && (
                <MenuWithItems />
                )
              )}
              <Logo />
              <Title />
              <TopRightSectionWrapper>
                <TopRightSection status={status} />
                <CategoriesSection status={status} />
              </TopRightSectionWrapper>
            </Toolbar>
            <Ornament />
          </AppBar>
        </div>
      )}
    </DeviceContextConsumer>
  );
}

const TopRightSectionWrapper = (props: any) => (
  <DeviceContextConsumer>
    {(context) => (
      <Toolbar
        style={{
          color: 'white',
          backgroundColor: 'transparent',
          paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
          paddingRight: '0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          alignItems: 'right',
        }}
      >
        {props.children}
      </Toolbar>
    )}
  </DeviceContextConsumer>
);

const Title = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'max-content',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            className={classes.title}
            align={context === DeviceType.isDesktopOrLaptop ? 'left' : 'center'}
            style={{
              paddingLeft: '30px',
              fontWeight: 'bold',
              color: 'white',
              WebkitTapHighlightColor: 'transparent',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '64px' : '32px',
              textAlign: context === DeviceType.isDesktopOrLaptop ? 'left' : 'left',
            }}
          >
            {t('Header title:Shop').toUpperCase()}
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '14px',
            }}
          >
            <Typography
              align="left"
              style={{
                paddingLeft: '10px',
                fontWeight: 'bold',
                color: 'white',
                WebkitTapHighlightColor: 'transparent',
                fontSize: 'inherit',
                textAlign: 'left',
              }}
            >
              {t('Header title.Line1')}
            </Typography>
            <Typography
              noWrap
              align="left"
              style={{
                paddingLeft: '10px',
                fontWeight: 'bold',
                color: 'white',
                WebkitTapHighlightColor: 'transparent',
                fontSize: 'inherit',
                textAlign: 'left',
              }}
            >
              {t('Header title.Line2')}
            </Typography>
            <Typography
              align="left"
              style={{
                paddingLeft: '10px',
                fontWeight: 'bold',
                color: 'white',
                WebkitTapHighlightColor: 'transparent',
                fontSize: 'inherit',
                textAlign: 'left',
              }}
            >
              {t('Header title.Line3')}
            </Typography>
          </div>
        </div>

      )}
    </DeviceContextConsumer>
  );
};

type TopRightSectionProps = {
  status: ShopStatus | undefined;
}

const TopRightSection = (props: TopRightSectionProps) => {
  const { status } = props;
  const { i18n: externali18n } = useTranslation('externals');

  return (
    <DeviceContextConsumer>
      {(context) => (
        status !== undefined && status.isAtLeastOneCategoryDefined && (
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: 'max-content',
            }}
          >
            <I18nextProvider i18n={externali18n}>
              <LanguageSetter />
            </I18nextProvider>
            <Cart
              className={context === DeviceType.isDesktopOrLaptop ? 'pointerOverEffect' : ''}
              style={{
                height: '100%',
                WebkitTapHighlightColor: 'transparent',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
              }}
            />
          </div>
        )
      )}
    </DeviceContextConsumer>
  );
};

type BottomSectionProps = {
  status: ShopStatus | undefined;
}

const CategoriesSection = (props: BottomSectionProps) => {
  const { status } = props;

  return (
    <DeviceContextConsumer>
      {(context) => (
        <I18nextProvider i18n={externali18n}>
          {status !== undefined && status.isAtLeastOneCategoryDefined && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {context === DeviceType.isDesktopOrLaptop && (
            <MenuButtons
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}
            />
            )}
          </div>
          )}
        </I18nextProvider>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorHeight: true,
})(TopMenu);
