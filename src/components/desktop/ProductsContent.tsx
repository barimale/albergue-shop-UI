import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CardWrapper from "./ProductsContentWrapper";
import { ProductData, Products } from "../common/Products";
import { Card } from "../common/Products";

export default function ProductsContent() {
  const [cardWidth, setCardWidth] = useState<number>(10);
  const [cardHeight, setCardHeight] = useState<number>(10);

    return (
      <CardWrapper
        style={{width: 'inherit', height: 'inherit'}}
        onSize={(size: any)=>{
        setCardHeight((size.height || 0)*0.80);
        setCardWidth((size.width || 0)*0.8/3);
      }}>
        {Products.map((product: ProductData, index: number) => {
          return (<Grid key={index} xs={2} item style={{height: cardHeight, width: cardWidth}}>
            <Card height={cardHeight} width={cardWidth} data={product}/>
          </Grid>);
        })}
      </CardWrapper>
    );
}