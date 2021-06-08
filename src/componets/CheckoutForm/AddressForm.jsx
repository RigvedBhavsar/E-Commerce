import React ,{useState} from 'react'
import {InputLabel , Select , MenuItem  ,Button , Grid , Typography} from '@material-ui/core';
import {useForm , FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import {commerce} from '../../lib/commerce';

const AddressForm = () => {
    
    const [shippingCountries ,setShippingCountries] = useState([]);    
    const [shippingCountry ,setShippingCountry] = useState('');    
    const [shippingSubdivisions ,setShippingSubdivisions] = useState([]);
    const [shippingSubdiv ,setShippingSubdiv] = useState('');
    const [shippingOptions ,setShippingOptions] = useState([]);
    const [shippingOpt ,setShippingOpt] = useState('');

    const methods = useForm();

    return (
        <>
            <Typography variant="h6" gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='address1' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='zip' label='ZIP / Postal Code' />
                        
                        {/* SHIPPING COUNTRY */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid>

                        {/* Shipping SubDivision */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivision</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid>

                        {/* Shipping Option */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select me
                                </MenuItem>
                            </Select>
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
