/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ItemDetails } from '../common/BuyItems';
import ProductDetailsModal from '../common/ProductDetailsModal';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import externali18n from '../../externali18n';
import useLanguages from '../../hooks/useLanguages';

type ItemDetailsTextButtonProps = {
    item: ItemDetails;
    id: string;
    lng: string;
}

export const ItemDetailsTextButton = (props: ItemDetailsTextButtonProps) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(false);
  const { item } = props;
  const { languages } = useLanguages();
  const { i18n } = useTranslation('externals');
  const [llnngg, setLLnngg] = useState<string>(i18n.language.toLowerCase());

  i18n.on('languageChanged', (lng) => {
    console.log(`ItemDetailsContent languageChanged externali${lng}`);
    setLLnngg(lng);
  });
  i18n.on('loaded', () => console.log('ItemDetailsContent loaded externali'));
  i18n.on('added', () => console.log('ItemDetailsContent added externali'));

  useEffect(() => {
    const loadTranslations = async () => {
      if (languages.length > 0) {
        languages.forEach(async (p) => {
          await externali18n.loadLanguages([p.toLowerCase()])
            .then(async () => {
              console.log(`Language loaded: ${p.toLowerCase()}`);
              await externali18n.reloadResources([p.toLowerCase(), 'externals'])
                .then(() => {
                  console.log(`Resource reloaded for: ${p.toLowerCase()}`);
                })
                .catch((error: any) => console.log(error));
            })
            .catch((error: any) => console.log(error));
        });
      }
    };

    loadTranslations();
  }, [languages]);

  return (
    <DeviceContextConsumer>
      {() => (
        <>
          <I18nextProvider i18n={externali18n}>
            <ItemDetailsContent
              {...props}
              llnngg={llnngg}
              onClick={() => {
                setIsModalDisplayed(true);
              }}
            />
          </I18nextProvider>
          <ProductDetailsModal
            item={item}
            isDisplayed={isModalDisplayed}
            onHide={() => {
              setIsModalDisplayed(false);
            }}
          />
        </>
      )}
    </DeviceContextConsumer>
  );
};

interface ItemDetailsContentProps extends ItemDetailsTextButtonProps{
    onClick: () => void;
    llnngg: string;
}

const ItemDetailsContent = (props: ItemDetailsContentProps) => {
  const { onClick, item } = props;
  const { t } = useTranslation('externals');

  useEffect(() => {
    externali18n.changeLanguage(props.llnngg);
  }, [props.llnngg]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Typography
          id={props.id}
          onClick={(event:any) => {
            event.stopPropagation();
            onClick();
          }}
          paragraph={false}
          style={{
            WebkitTapHighlightColor: 'transparent',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            cursor: 'pointer',
          }}
        >
          <SearchIcon
            style={{
              verticalAlign: 'middle',
              paddingRight: context === DeviceType.isDesktopOrLaptop ? '10px' : '6px',
            }}
          />
          {t(`${item.id}.name`)}
        </Typography>
      )}
    </DeviceContextConsumer>
  );
};
