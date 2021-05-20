import Grid from '@material-ui/core/Grid';
import sizeMe from 'react-sizeme';

function CardWrapper(props: any){
  return (
    <Grid container
      direction="row"
      spacing={3}
      justify="space-around"
      alignItems="center"
      {...props}>
      {props.children}
    </Grid>);
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(CardWrapper);
