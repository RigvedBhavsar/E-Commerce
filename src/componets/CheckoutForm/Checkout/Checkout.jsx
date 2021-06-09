import React , {useState , useEffect } from 'react'
import {Paper , Stepper , Step ,StepLabel , Typography , CircularProgress , Divider , Button , CssBaseline} from '@material-ui/core'
import {Link , useHistory}  from 'react-router-dom';
import {commerce} from '../../../lib/commerce';
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm'

const steps =['Shipping Address' , 'Payment Details'];

const Checkout = ({cart , order ,onCaptureCheout , error}) => {
    const [activeStep ,setActiveStep] = useState(0);
    const [checkoutToken , setCheckoutToken] = useState(null);
    const [shipingData , setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        const generateToken = async()=>{
            try {
                const token = await commerce.checkout.generateToken(cart.id , {type :'cart'});
                setCheckoutToken(token);
            } catch (error) {
                history.push('/');
            }
        }
        generateToken();
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) =>{
        setShippingData(data);
        nextStep();
    }

    let Confirmation =()=> order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank You For Purchase{order.customer.firstname}{order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref : {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to='/' variant="outlined" type="button">Home</Button>
        </>
    ): (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );

    if(error){
        <>
            <Typography variant="h5">Error :{error}</Typography>
            <br/>
            <Button component={Link} to='/' variant="outlined" type="button">Home</Button>
        </>
    }
        
    const Form = ()=> activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm  shipingData={shipingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheout={onCaptureCheout} />

    return (
        <>
            <CssBaseline/>
            <div className={classes.toobar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                </Paper>
            </main> 
        </>
    )
}

export default Checkout
