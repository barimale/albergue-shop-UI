import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CartContext, AddressDetails } from '../../../contexts/CartContext';
import * as Yup from 'yup';
import { FormikProps, useField } from "formik";
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import maini18n from '../../../i18n';

export const ShortAddressSchema = Yup.object().shape({
  email: Yup.string()
  .email('Field format is incorrect')
  .required('Field is required'),
  emailConfirmed: Yup.string()
  .oneOf([Yup.ref('email'), null], "E-mail and confirmed e-mail needs to be the same")
  .required('Field is required')
});

export const LongAddressSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('Field is required')
  .min(2, 'Firstname needs to have at least 2 characters'),
  lastName: Yup.string()
  .required('Field is required')
  .min(2, 'Lastname needs to have at least 2 characters'),
  addressLine1: Yup.string()
  .min(2, 'Field needs to have at least 2 characters')
  .required('Field is required'),
  addressLine2: Yup.string(),
  city: Yup.string()
  .required('Field is required')
  .min(2, 'Field needs to have at least 2 characters'),
  zipCode: Yup.string()
  .required('Field is required')
  .min(2, 'Field needs to have at least 2 characters'),
  region: Yup.string()
  .required('Field is required')
  .min(2, 'Field needs to have at least 2 characters'),
  country: Yup.string()
  .required('Field is required')
  .min(2, 'Field needs to have at least 2 characters'),
  email: Yup.string()
  .email('Field format is incorrect')
  .required('Field is required'),
  emailConfirmed: Yup.string()
  .oneOf([Yup.ref('email'), null], "E-mail and confirmed e-mail needs to be the same")
  .required('Field is required')
});

export function AddressStepContent(props: FormikProps<AddressDetails>) {
  const { isPhysicalItemIncluded } = useContext(CartContext);
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={maini18n}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: window.innerHeight*0.4
      }}>
        <Typography 
          style={{
            fontSize: '20px',
            paddingBottom: '10px',
            width: '100%'
        }}>
          {t("Please select Your delivery address").toUpperCase()}
        </Typography>
        <Grid container spacing={3} style={{width: '100%', verticalAlign: 'center', height: '100%'}}>
          {isPhysicalItemIncluded() === true && (
            <AddressForPostDelivery {...props}/>
          )}
          <AddressForOnlineDelivery {...props}/>
        </Grid>
      </div>
    </I18nextProvider>
  );
}

function MyTextField(props: any) {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <>
            <TextField 
              {...field} 
              {...props} 
              style={{
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px': '10px'}}
            />
            {meta.error && meta.touched && <div style={{
              fontFamily: 'Signoria-Bold',
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px': '10px',
              color: 'rgba(206, 17, 38, 1)'}}>{maini18n.t(meta.error)}</div>}
          </>
          )
        }
      </DeviceContextConsumer>
    </>
  );
}

const AddressForOnlineDelivery = (props: FormikProps<AddressDetails>) =>{
  const { t } = useTranslation();

  return (
<>
  <Grid item xs={12}>
    <MyTextField
    {...props}
      id="email"
      name="email"
      label={t("E-mail")}
      fullWidth
      autoComplete="email"
    />
  </Grid>
  <Grid item xs={12}>
    <MyTextField
    {...props}
      id="emailConfirmed"
      name="emailConfirmed"
      label={t("Repeat e-mail")}
      fullWidth
      autoComplete="email"
    />
  </Grid>
</>
  );
}

const AddressForPostDelivery = (props: FormikProps<AddressDetails>) =>{
  const { t } = useTranslation();

  return(
    <>
      <Grid item xs={12} sm={6}>
        <MyTextField
          {...props}
          id="firstName"
          name="firstName"
          label={t("Firstname")}
          fullWidth
          autoComplete="given-name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          {...props}
          id="lastName"
          name="lastName"
          label={t("Lastname")}
          fullWidth
          autoComplete="family-name"
        />
      </Grid>
      <Grid item xs={12}>
        <MyTextField
          {...props}
          id="addressLine1"
          name="addressLine1"
          label={t("Address line 1")}
          fullWidth
          autoComplete="shipping address-line1"
        />
      </Grid>
      <Grid item xs={12}>
        <MyTextField
          {...props}
          id="addressLine2"
          name="addressLine2"
          label={t("Address line 2")}
          fullWidth
          autoComplete="address-line2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          {...props}
          id="city"
          name="city"
          label={t("City")}
          fullWidth
          autoComplete="address-level2"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField 
          {...props}
          id="region" 
          name="region"
          autoComplete="address-level1"
          label={t("Region")}
          fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          {...props}
          id="zipCode"
          name="zipCode"
          label={t("Postal-code")}
          fullWidth
          autoComplete="postal-code"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          {...props}
          id="country"
          name="country"
          label={t("Country")}
          autoComplete="country-name"
          fullWidth
        />
      </Grid>
    </>
  );
}