import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({checkoutToken , next}) => {
    const methods = useForm();
    const [ShippingCountries, setShippingCountries] = useState([]);
    const [ShippingCountry, setShippingCountry] = useState("");
    const [ShippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [ShippingSubdivision, setShippingSubdivision] = useState('');
    const [ShippingOptions, setShippingOptions] = useState([]);
    const [ShippingOption, setShippingOption] = useState('');
   
    
    //For fetching countries 
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
        setShippingCountries(countries);
        // console.log(countries);
        setShippingCountry(Object.keys(countries)[0]);
      };
      useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
      }, []);
      const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
      };
      useEffect(() => {
        if (ShippingCountry) fetchSubdivisions(ShippingCountry);
      }, [ShippingCountry]);

      
  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    if (ShippingSubdivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubdivision);
  }, [ShippingSubdivision]);
  

  return (
    <>
    <Typography variant='h6' gutterBottom>Shipping Address</Typography>
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit((data) => next({...data, ShippingCountry,ShippingSubdivision,ShippingOption}) )}>
    <Grid container spacing={3} >
    <FormInput  name='firstName' label='First Name'/>
    <FormInput  name='lastName' label='Last Name'/>
    <FormInput  name='address1' label='Address'/>
    <FormInput  name='email' label='Email'/>
    <FormInput  name='City' label=' City'/>
    <FormInput  name='zip' label=' ZIP/Postal code'/>
     <Grid item xs={12} sm={6}>
    <InputLabel align='left' gutterbottom>Shippingg country</InputLabel>
    <Select  value = {ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
    {Object.entries(ShippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
    </Select>
    </Grid>
     <Grid item xs={12} sm={6}>
    <InputLabel align='left' gutterBottom>Shippingg Subdivisions</InputLabel>
    <Select  value = {ShippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
    {Object.entries(ShippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
    </Select>
    </Grid>
    <Grid item xs={12} sm={6}>
    <InputLabel align='left' gutterBottom>Shippingg options</InputLabel>
    <Select  value = {ShippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
    {ShippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
     ))}

        
    </Select>
    </Grid> 
     </Grid>
     <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
     </form>

    </FormProvider>

    </>
  )
}

export default AddressForm