import React from 'react';
import sizeMe from 'react-sizeme';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useTranslation } from 'react-i18next';
import { DeviceType, DeviceContextConsumer } from '../../contexts/DeviceContext';

type StepperContainerProps ={
    steps: Array<string>;
    activeStep: number;
}

const StepperContainer = (props: StepperContainerProps) => {
  const { steps, activeStep } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Stepper
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map((label, index: number) => (
            <Step key={label}>
              <StepLabel>
                <div style={{
                  // eslint-disable-next-line no-nested-ternary
                  fontSize: activeStep === index ? (context === DeviceType.isDesktopOrLaptop ? '16px' : '14px') : (context === DeviceType.isDesktopOrLaptop ? '16px' : '10px'),
                  fontFamily: 'Signoria-Bold',
                }}
                >
                  {t(label)}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(StepperContainer);
