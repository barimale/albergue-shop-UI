/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import Tab from '@material-ui/core/Tab';
import { ButtonBase } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { StyledCategoryTabs } from '../../customTheme';
import { useCategories } from '../../hooks/useCategories';
import { configSection, configSectionType, GetFullPathTo } from '../../router/routerConfiguration';

const chosenTabAlbergueKey = 'EA90E5C141024F08849B08342AFF84A6';

export default function MenuButtons (props: any) {
  const { configSections } = useCategories();
  const { t } = useTranslation('externals');
  const initialValue = localStorage.getItem(chosenTabAlbergueKey);
  const [value] = React.useState<number>(Number.parseInt(initialValue !== null ? initialValue : '0', 10));

  const handleChange = (event: any, newValue: number) => {
    localStorage.setItem(chosenTabAlbergueKey, JSON.stringify(newValue));
  };

  return (
    <div {...props}>
      <StyledCategoryTabs
        {...props}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="dynamic categories scrooler"
        ScrollButtonComponent={TabScrollButton}
      >
        {configSections.map((section: configSection, index: number) => {
          if (section.type !== configSectionType.divider) {
            return (
              <Tab
                className="pointerOverEffect"
                label={t(section.title).toUpperCase()}
                tabIndex={index}
                key={index}
                style={{
                  paddingLeft: '6px',
                  paddingRight: '6px',
                  fontSize: '20px',
                  color: value === index ? 'white' : 'grey',
                  margin: '5px',
                }}
                href={GetFullPathTo(configSections, section.title)}
              />
            );
          }
        })}
      </StyledCategoryTabs>
    </div>
  );
}

const TabScrollButton = forwardRef((props: any, ref: any) => {
  const { direction, ...other } = props;

  return (
    <ButtonBase
      component="div"
      ref={ref}
      style={{
        opacity: other.disabled ? 0 : 1,
        alignSelf: 'center',
      }}
      {...other}
    >
      {direction === 'left' ? (
        <ArrowBackIosIcon fontSize="large" />
      ) : (
        <ArrowForwardIosIcon fontSize="large" />
      )}
    </ButtonBase>
  );
});
