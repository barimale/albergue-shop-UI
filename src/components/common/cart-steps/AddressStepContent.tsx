import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CartContext, AddressDetails } from '../../../contexts/CartContext';
import * as Yup from 'yup';
import { FormikProps, useField } from "formik";
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { useTranslation } from 'react-i18next';

export const ShortAddressSchema = Yup.object().shape({
  email: Yup.string()
  .email('Nieprawidłowy adres email')
  .required('Pole jest wymagane'),
  emailConfirmed: Yup.string()
  .oneOf([Yup.ref('email'), null], "Adresy email różnią się")
  .required('Pole jest wymagane')
});

export const LongAddressSchema = Yup.object().shape({
  firstName: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  lastName: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  addressLine1: Yup.string()
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki')
  .required('Pole jest wymagane'),
  addressLine2: Yup.string(),
  city: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  zipCode: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  region: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  country: Yup.string()
  .required('Pole jest wymagane')
  .min(2, 'Pole musi mieć nie mniej niż 2 znaki'),
  email: Yup.string()
  .email('Nieprawidłowy adres email')
  .required('Pole jest wymagane'),
  emailConfirmed: Yup.string()
  .oneOf([Yup.ref('email'), null], "Adresy email różnią się")
  .required('Pole jest wymagane')
});

export function AddressStepContent(props: FormikProps<AddressDetails>) {
  const { isPhysicalItemIncluded } = useContext(CartContext);
  
  return (
    <Grid container spacing={3} style={{width: '100%', verticalAlign: 'center', height: '100%'}}>
      {isPhysicalItemIncluded() === true && (
        <AddressForPostDelivery {...props}/>
      )}
      <AddressForOnlineDelivery {...props}/>
    </Grid>
  );
}

function MyTextField(props: any) {
  const [field, meta] = useField(props.name);

  return (
    <>
      <DeviceContextConsumer>
        {context => (
          <>
            <TextField {...field} {...props} style={{
              fontSize: context === DeviceType.isDesktopOrLaptop ? '16px': '10px'}}/>
            {meta.error && meta.touched && <div style={{
              fontSize: context === DeviceType.isDesktopOrLaptop ? '16px': '10px',
              color: 'rgba(206, 17, 38, 1)'}}>{meta.error}</div>}
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