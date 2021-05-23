import React from 'react';
import Button from '@material-ui/core/Button';
import { configSection, configSectionType, GetFullPathTo } from "../../router/routerConfiguration";
import { useCategories } from '../../hooks/useCategories';

export default function MenuButtons(props: any) {
  const { configSections } = useCategories();

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
              paddingLeft: '10px',
              paddingRight: '10px',
              fontSize: '26px',
              fontWeight: 'bold'}} 
            href={GetFullPathTo(configSections, section.title)}>
              {section.title.toUpperCase()}
            </Button>
        }
      })}
    </div>);
}
