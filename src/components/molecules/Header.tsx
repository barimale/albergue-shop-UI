import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import { MenuWithItems } from "../mobile/MenuWithItems";
import sizeMe from 'react-sizeme';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import MenuButtons from '../desktop/MenuButtons';
import { useShopStatus } from '../../hooks/useShopStatus';
import LanguageSetter from '../organisms/LanguageSetter';
import { thirdMain } from '../../customTheme';
import { Ornament } from './Ornament';
import useTheme from "@material-ui/core/styles/useTheme";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black'
  },
}));

function TopMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const status = useShopStatus();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
    {context => (
      <>
    <div className={classes.root} style={{
      position:'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 1000,
      background: `${thirdMain}`
      }}>
      <AppBar position="sticky" style={{
         paddingTop: context === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
         paddingBottom: '5px',
         boxShadow: 'unset',
         borderBottom: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
         borderTop: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
        backgroundColor: 'transparent'}}>
              <Ornament />
              <Toolbar style={{
                color:'white', 
                backgroundColor:'transparent', 
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px', 
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'}}>
                  {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
                    <>
                {context === DeviceType.isTabletOrMobile && (
                  <MenuWithItems/>
                )}</>
                  )}
                  <Typography
                    className={classes.title}
                    align={context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                      WebkitTapHighlightColor: 'transparent',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '33px':'32px',
                      textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}}>
                        {t('Albergue de Peregrinos Porto - Shop')}
                  </Typography>
                  {status !== undefined && status.isAtLeastOneCategoryDefined.valueOf() === true && (
                    <>
                  {context === DeviceType.isDesktopOrLaptop && (
                    <MenuButtons />
                  )}
                  <LanguageSetter />
                  {/* // top={size?.size?.height || 0} width={size.size.width}/> */}
                  <Cart
                  className={context === DeviceType.isDesktopOrLaptop ? "pointerOverEffect" : ""}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
                  }}/>
                  </>
                )}
              </Toolbar>
            <Ornament />
          </AppBar>
        </div>
      </>
    )}
  </DeviceContextConsumer>
  );
}

export const StyledLink = styled(Link)
`
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color : 'transparent';
  :hover, :active {
    color: inherit;
    -webkit-tap-highlight-color : 'transparent';
 }
`;

export default sizeMe({ monitorHeight: true })(TopMenu);
