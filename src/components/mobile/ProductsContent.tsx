import { useState } from 'react';
import { Card } from "../common/Products";
import { Products, ProductData } from "../common/Products";
import ProductsContentWrapper from "./ProductsContentWrapper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    alignItems: "center",
    display: 'flex'
  }
}));

export default function ProductsContent() {
  const [cardWidth, setCardWidth] = useState<number>(10);
  const [cardHeight, setCardHeight] = useState<number>(10);
  const classes = useStyles();

  return (
    <ProductsContentWrapper
      className={classes.root}
      onSize={(size: any)=>{
      setCardHeight((size.height || 0)*1);
      setCardWidth((size.width || 0)*1);
    }}>
    {
      Products.map( (product: ProductData, index: number) => {
        return (
          <div style={{
            width: cardWidth,
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            WebkitTapHighlightColor: 'transparent'
            }}>
            <Card
            key={index}
            data={product}
            width={cardWidth*0.70}
            height={cardHeight*0.85}/>
          </div>);
      })
    }
  </ProductsContentWrapper>
) 
}
