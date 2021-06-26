import React from 'react';
import Button from '@material-ui/core/Button';
import { configSection, configSectionType, GetFullPathTo } from "../../router/routerConfiguration";
import { useCategories } from '../../hooks/useCategories';
import { useTranslation } from "react-i18next";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const chosenTabAlbergueKey = "EA90E5C141024F08849B08342AFF84A6";

export default function MenuButtons(props: any) {
  const { configSections } = useCategories();
  const { t } = useTranslation('externals');
  const initialValue = localStorage.getItem(chosenTabAlbergueKey);
  const [value, setValue] = React.useState<number>(Number.parseInt(initialValue !== null ? initialValue : '0'));
 
  const handleChange = (event: any, newValue: number) => {
    localStorage.setItem(chosenTabAlbergueKey, JSON.stringify(newValue));
    setValue(newValue);
  };

    return (
    <div {...props}>
      <Tabs
          {...props}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          style={{

          }}
      >
        {configSections.map((section: configSection, index: number) => {
          if(section.type !== configSectionType.divider){
            return <Tab 
              className={"pointerOverEffect"}
              label={t(section.title).toUpperCase()}
              tabIndex={index}
              key={index} 
              color="inherit" 
              style={{
                paddingLeft: '12px',
                paddingRight: '12px',
                fontSize: '20px',
                margin: '10px',
                fontWeight: 'bold'}} 
              href={GetFullPathTo(configSections, section.title)}/>
          }
        })}
      </Tabs>
    </div>);
}
