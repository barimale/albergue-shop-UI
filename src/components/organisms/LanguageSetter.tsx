import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import sizeMe from 'react-sizeme';
import { useTranslation } from 'react-i18next';
import { Fade, useTheme } from '@material-ui/core';
import { Languages } from '../molecules/Languages';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import TranslateIcon from '@material-ui/icons/Translate';

const LanguageSetter = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { i18n: externali18n } = useTranslation('externals');
  const { i18n } = useTranslation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DeviceContextConsumer>
    { context =>
      <>
        <div style={{
          left: context === DeviceType.isDesktopOrLaptop ? 'unset' : '90%',
          position: context === DeviceType.isDesktopOrLaptop ? 'relative' : 'absolute',
          WebkitTransform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
          transform: context === DeviceType.isDesktopOrLaptop ? 'unset' : 'translate(-50%, 0%)',
          float: props.style?.float
        }}>
          <IconButton
            style={{
              color: `${theme.palette.common.black}`,
              borderRadius: '0px'
            }}
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <div 
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center'
            }}>
              <div
                className={"pointerOverEffect"}
                style={{
                  fontSize: context.valueOf() === DeviceType.isDesktopOrLaptop ?  16 : 14,
                  width: context.valueOf() === DeviceType.isDesktopOrLaptop ? '100px': '62px',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  verticalAlign: 'center',
                  alignContent: 'baseline',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  color: 'white'
              }}>
                <TranslateIcon fontSize="small" style={{paddingRight: '10px', height: '100%'}}/>
                {i18n.language.toUpperCase()}
              </div>
            </div>
          </IconButton>
        </div>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          marginThreshold={0}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorReference={context.valueOf() === DeviceType.isDesktopOrLaptop ? "anchorEl": "anchorPosition"}
          anchorPosition={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            undefined :
            {
              top: props.top,
              left: props.width - 100
            }}
          anchorOrigin={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            {
            vertical: 'bottom',
            horizontal: 'center',
          }: undefined}
          transformOrigin={
            context.valueOf() === DeviceType.isDesktopOrLaptop ?
            {
            vertical: 'top',
            horizontal: 'center',
            }: 
            undefined}
          >
            <Languages 
              handleClose={handleClose}
              onLanguageChanged={async (lng: string) => {
                await externali18n.changeLanguage(lng.toLowerCase())
                  .then(()=>{
                    console.log('Language for externali changed to: ' + externali18n.language);
                  })
                  .catch((error: any)=>{
                    console.log(error);
                  });
              }}
               />
        </Menu>
      </>
    }
    </DeviceContextConsumer>
  );
}

export default sizeMe({ monitorWidth: true })(LanguageSetter);
