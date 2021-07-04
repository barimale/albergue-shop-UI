import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { Button, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import maini18n from "../../i18n";
import { I18nextProvider } from 'react-i18next';
import useLanguages from '../../hooks/useLanguages';
import { useEffect, useState } from 'react';
import { LoadingInProgress } from './LoadingInProgress';

type LanguagesProps ={  
  handleClose: () => void;
  onLanguageChanged: (lng: string) => void;
}

export const Languages = (props: LanguagesProps) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const {languages} = useLanguages();

  useEffect(()=>{
    setIsLoading(false);
  }, [languages]);

  return (
  <>
    {isLoading.valueOf() === true ? (
      <LoadingInProgress/>
    ):(
      <>
        {languages?.flatMap((p: string) => p).sort((a: string, b: string) => b.localeCompare(a))?.map((language: string, index: number) => {
          return  (
            <I18nextProvider i18n={maini18n}>
              <MenuItem key={index}>
                  <Language 
                    language={language} 
                    handleClose={props.handleClose}
                    onLanguageChanged={props.onLanguageChanged} />
              </MenuItem>
              <>
              {index !== (languages.length-1) && (
                <Divider orientation="horizontal" />
              )}
              </>
            </I18nextProvider>
            );
          }
        )}
      </>
    )}
  </>);
}

interface LanguageProps extends LanguagesProps{
  language: string;
  onLanguageChanged: (lng: string) => void;
}

const Language = (props: LanguageProps) => {
  const { i18n } = useTranslation();
  const {language } = props;
  const theme = useTheme();

  return (
    <Button 
      className={"pointerOverEffect"}
      style={{
        height:'100%',
        width: '100%',
        color: `${theme.palette.secondary.main}`,
        textDecoration: 'none',
        textAlign: 'center',
        paddingLeft:'10px',
        paddingRight: '10px'
      }}
      onClick={async () => {
        props.handleClose();
        await i18n.changeLanguage(language.toLowerCase())
        .finally(()=>{
          props.onLanguageChanged(i18n.language);
        });
      }}>
        <img id='myImage' src={`http://www.geonames.org/flags/x/${language.toLowerCase() === 'en' ? 'gb' : language.toLowerCase()}.gif`} style={{height: '14px', width: '20px', borderRadius: '0%', paddingRight: '10px'}}/>
        {/* <img id='myImage' src={`http://www.geonames.org/flags/x/${language}.gif`} style={{height: '20px', width: '20px', borderRadius: '50%', paddingRight: '5px'}}/> */}
        {language.toUpperCase()}
    </Button>
  );
}
