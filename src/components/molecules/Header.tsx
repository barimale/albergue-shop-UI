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
import { Path as HomePath } from '../screens/ContactScreen';
import styled from "styled-components";
import MenuButtons from '../desktop/MenuButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'unset !important',
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

  return (
    <div className={classes.root} style={{
      position:'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 1000,
      }}>
      <AppBar position="sticky">
          <DeviceContextConsumer>
            {context => (
              <Toolbar style={{
                color:'#303336', 
                backgroundColor:'white', 
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px', 
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'}}>
                {context === DeviceType.isTabletOrMobile && (
                  <MenuWithItems/>
                )}
                  <Typography
                    variant={context === DeviceType.isDesktopOrLaptop ? "h4" : "h4"}
                    className={classes.title}
                    align={context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}
                    style={{
                      fontWeight: 'bold',
                      WebkitTapHighlightColor: 'transparent',
                      fontSize: context === DeviceType.isDesktopOrLaptop ? '44px':'32px',
                      textAlign: context === DeviceType.isDesktopOrLaptop ? "left" : 'center'}}>
                        {'SH'}
                        {/* <StyledLink 
                          className={context === DeviceType.isDesktopOrLaptop ? "pointerOverEffect" : ""}
                          to={HomePath}>
                          
                        </StyledLink> */}
                        <img src={'logo.webp'} style= {{height: '30px', width: '30px'}}/>
                        {'P'}
                  </Typography>
                  {context === DeviceType.isDesktopOrLaptop && (
                    <MenuButtons />
                  )}
                <Cart
                  className={context === DeviceType.isDesktopOrLaptop ? "pointerOverEffect" : ""}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : '10px',
                    paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
                  }}/>
              </Toolbar>
            )}
          </DeviceContextConsumer>
      </AppBar>
    </div>
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
