import React, { useContext, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { AddressDetails, CartContext } from '../../contexts/CartContext';
import StepperContainer from "../molecules/Stepper";
import { CartContent } from "../common/cart-steps/CartContent";
import { AddressStepContent } from "../common/cart-steps/AddressStepContent";
import { Redirect } from 'react-router-dom';
import { Path as HomePath } from '../screens/ContactScreen';
import { appBaseRouteKey} from "../../router/routerConfiguration";
import SummaryContent from '../common/cart-steps/SummaryContent';
import CenteredDiv from '../common/CenteredDiv';
import SuccessStepContent from "../common/cart-steps/SuccessStepContent";
import ErrorStepContent from "../common/cart-steps/ErrorStepContent";
import { ShortAddressSchema, LongAddressSchema} from "../common/cart-steps/AddressStepContent";
import { Formik, Form, FormikProps } from 'formik';
import { ContentLayout2 } from "../../components/layouts/MainLayout";
import { useTranslation } from 'react-i18next';
import { theme } from '../../customTheme';

export const Path = "/cart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontFamily: "Signoria-Bold"
    },
  }),
);

function getSteps() {
  return ['Items', 'Shippment', 'Confirmation'];
}

function getStepContent(stepIndex: number, handleNext: ()=> void, formikProps: FormikProps<AddressDetails>): JSX.Element {
    switch (stepIndex) {
      case 0:
        return <CartContent />;
      case 1:
        return <AddressStepContent {...formikProps} />;
      case 2:
        return <SummaryContent handleNext={handleNext}/>;
      default:
        return <Redirect to={appBaseRouteKey + HomePath} />;
    }
}

export function CartScreen(){
    const { getCount } = useContext(CartContext);
    const [ wizardInProgress ] = useState<boolean>(getCount() > 0);
    
    return(
        getCount() > 0  || wizardInProgress? (
            <CartWithItems />
        ):(
            <EmptyCart />
        )
    );
}

function EmptyCart(){
  const { t } = useTranslation();
  
    return(
        <DeviceContextConsumer>
            {context => 
                <div style={{
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    color: 'white',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '40px' : '25px'
                }}>
                    {t("There are no items in the cart").toUpperCase()}
                </div>
            }
        </DeviceContextConsumer>
    )
}

function CartWithItems(){
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [stepperHeight, setStepperHeight] = useState<number>(0);
  const { innerHeight: height } = window;
  const { isPhysicalItemIncluded, registerAddressDetails, orderStatus } = useContext(CartContext);
  const initialValues: AddressDetails = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    region: "",
    country: "",
    email: "",
    emailConfirmed: ""
  };

  return (
  <ContentLayout2>
    <DeviceContextConsumer>
    {context => 
        <div className={classes.root}>
          <Formik
            style={{
              height: '100%',
              width: 'inherit',
              paddingBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px'
            }}
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={isPhysicalItemIncluded() ? LongAddressSchema : ShortAddressSchema}
            onSubmit={(value: AddressDetails)=>{
              registerAddressDetails(value);
              handleNext();
            }}>
              {props => (
            <Form>
              {!((activeStep === steps.length) && (orderStatus !== "success")) && (
                <StepperContainer
                activeStep={activeStep}
                steps={steps}
                onSize={(size: any)=>{
                  setStepperHeight(size.height || 0);
                }}/>
              )}
              {activeStep === steps.length ? (
                orderStatus === "success" ? (
                  <SuccessStepContent/>
                ):(
                  <ErrorStepContent/>
                )
              ) : (
              <div style={{
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '10%' : '10px',
                paddingRight: context === DeviceType.isDesktopOrLaptop ? '10%' : '10px',
                paddingBottom: '32px'
              }}>
                  <div style={{
                    display: 'flex',
                    paddingBottom: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                    paddingTop: context === DeviceType.isDesktopOrLaptop ? '32px' : '10px',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'inherit'
                  }}>
                    <Button
                        className={"pointerOverEffect"}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="text"
                        color="primary">
                        {t('Back').toUpperCase()}
                    </Button>
                    {activeStep !== steps.length - 1  && (
                    <Button
                      className={"pointerOverEffect"}
                      variant={"contained"}
                      color="primary"
                      onClick={()=>{
                        if(activeStep === 1){
                          props.submitForm();
                        }else{
                          handleNext();
                        }
                      }}>
                      {t('Next').toUpperCase()}
                    </Button>
                    )}
                  </div>
                  <div style={{
                    // WIP:sizeme
                    padding: '40px',
                    boxShadow: `${theme.shadows[2]}`,
                    border: '1px solid lightgray',
                    display: 'flex',
                    justifyContent: 'center',
                    maxHeight: window.innerHeight*0.35,
                    overflowY: 'auto',
                    backgroundColor: 'white'}}>
                    {getStepContent(activeStep, handleNext, props)}
                  </div>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    }
    </DeviceContextConsumer>
  </ContentLayout2>
  );
}