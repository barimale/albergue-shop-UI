import React from 'react';
import Button from '@material-ui/core/Button';
import { configSection, configSectionType, GetFullPathTo } from "../../router/routerConfiguration";
import { useCategories } from '../../hooks/useCategories';
import { useTranslation } from "react-i18next";

export default function MenuButtons(props: any) {
  const { configSections } = useCategories();
  const { t } = useTranslation('externals');

    return (
    <div {...props}>
      {configSections.map((section: configSection, index: number) => {
        if(section.type === configSectionType.divider){
          return  '|';
        }else{
          return <Button 
            className={"pointerOverEffect"}
            tabIndex={index}
            key={index} 
            color="inherit" 
            style={{
              paddingLeft: '12px',
              // border: '0.5px solid white',
              paddingRight: '12px',
              fontSize: '20px',
              margin: '10px',
              fontWeight: 'bold'}} 
            href={GetFullPathTo(configSections, section.title)}>
              {t(section.title).toUpperCase()}
            </Button>
        }
      })}
    </div>);
}
