import Carousel from 'react-material-ui-carousel';
import sizeMe from 'react-sizeme';

function ProductsContentWrapper(props: any) {
  return (
    <Carousel 
      autoPlay={false}
      navButtonsAlwaysVisible={true}
      indicators={false}
      style={{height: '100%', width: '100%'}}
      {...props}>
      {props.children}
    </Carousel>); 
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(ProductsContentWrapper);