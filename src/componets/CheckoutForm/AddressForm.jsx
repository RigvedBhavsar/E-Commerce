import React ,{useState , useEffect} from 'react'
import {InputLabel , Select , MenuItem  ,Button , Grid , Typography} from '@material-ui/core';
import {useForm , FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import {commerce} from '../../lib/commerce';


const AddressForm = ({checkoutToken}) => {
    
    const [shippingCountries ,setShippingCountries] = useState([]);    
    const [shippingCountry ,setShippingCountry] = useState('');    
    const [shippingSubdivisions ,setShippingSubdivisions] = useState([]);
    const [shippingSubdiv ,setShippingSubdiv] = useState('');
    const [shippingOptions ,setShippingOptions] = useState([]);
    const [shippingOpt ,setShippingOpt] = useState('');

    const methods = useForm();

    //iterating the array after converting it from object to array
    const countries =  Object.entries(shippingCountries).map(([code, name]) => ({ id : code , label : name})) 
    const subdivisions =  Object.entries(shippingSubdivisions).map(([code, name]) => ({ id : code , label : name})) 
    const options = shippingOptions.map((sO) => ({id: sO.id , label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

    //fetching shipping countries
    const fetchShippingCountries = async(checkoutTokenId)=>{
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    //fetching sub divisions based on shipping country
    const fetchSubdivisions = async(countryCode) =>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions)
        setShippingSubdiv(Object.keys(subdivisions)[0]);
    }

    //fetching option based on subdivision
    const fetchShippingOptions = async (checkoutTokenId ,country , region= null )=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId , {country , region});

        setShippingOptions(options);
        setShippingOpt(options[0].id);
    }

    //getting countries (componet did mount)
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[])
    
    //fetching the subdivisions of contry (rerenders/change when we change the country)
    useEffect(()=>{
       if(shippingCountry) fetchSubdivisions(shippingCountry);
    },[shippingCountry])

    //fetching shipping option (rerenders/change when we chjange the subdivision)
    useEffect(()=>{
        if(shippingSubdiv) fetchShippingOptions(checkoutToken.id , shippingCountry  , shippingSubdiv)
    },[shippingSubdiv])
    
    return (
        <>
            <Typography variant="h6" gutterBottom >Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First Name' />
                        <FormInput  name='lastName' label='Last Name' />
                        <FormInput  name='address1' label='Address' />
                        <FormInput  name='email' label='Email' />
                        <FormInput  name='city' label='City' />
                        <FormInput  name='zip' label='ZIP / Postal Code' />
                        
                        
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivision</InputLabel>
                            <Select value={shippingSubdiv} fullWidth onChange={(e)=>setShippingSubdiv(e.target.value)}>
                                {subdivisions.map((subdiv)=>(
                                    <MenuItem key={subdiv.id} value={subdiv.id}>
                                    {subdiv.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={shippingOpt} fullWidth onChange={(e)=>setShippingOpt(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
