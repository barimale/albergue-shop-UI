import React, { useState } from "react";
import { ItemDetails } from "../common/BuyItems";
import ProductDetailsModal from "../common/ProductDetailsModal";
import SearchIcon from '@material-ui/icons/Search';
import { DeviceContextConsumer, DeviceType } from "../../contexts/DeviceContext";
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

type ItemDetailsTextButtonProps = {
    item: ItemDetails;
    id: string;
}

export const ItemDetailsTextButton = (props: ItemDetailsTextButtonProps) => {
    const [isModalDisplayed, setIsModalDisplayed] = useState<boolean>(false);
    const { item } = props;
    const { t } = useTranslation();

    return(
    <DeviceContextConsumer>
    {context =>
        <>
            <Typography 
                id={props.id}
                onClick={(event:any)=>{
                    event.stopPropagation();
                    setIsModalDisplayed(true);
                }}
                paragraph={false} 
                style={{
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    cursor: 'pointer',
                }}>
                    <SearchIcon
                    style={{
                        verticalAlign: 'middle',
                        paddingRight: context === DeviceType.isDesktopOrLaptop ? '10px' : '6px'
                    }}/>
                    {t(`${item.id}.name`)}
            </Typography>
            <ProductDetailsModal 
                item={item}
                isDisplayed={isModalDisplayed}
                onHide={()=>{
                    setIsModalDisplayed(false);
                }}
            />
        </>
    }
    </DeviceContextConsumer>
    );
}