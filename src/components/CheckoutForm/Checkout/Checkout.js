import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';
import { SignalCellularNull } from '@material-ui/icons';
import { Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

const steps = ['Shipping address', 'Payment details'];
const Checkout = ({cart,order, onCaptureCheckout, error}) => {
    const classes =  useStyles();
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [ShippingData, setShippingData] = useState([]);
    const [IsFinished, setIsFinished] = useState(false)
    
    useEffect(()=> {
      const generateToken = async ()=>{
        try {
          const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
          // console.log(token);
          setcheckoutToken(token);


        }catch(error){
          this.props.history.pushState('/');

        }
      }
      generateToken();

    },[cart] );
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep+1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep-1);

    const next = (data) =>{
      setShippingData(data);
      nextStep();

  }
    const [activeStep, setActiveStep] = useState(0);
    const Form = () => activeStep ==0 ?
    <AddressForm checkoutToken={checkoutToken}  next={next}/>  : <PaymentForm ShippingData={ShippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>
    const timeout = () =>{
      setTimeout(()=> {
        setIsFinished(true)
      
      },3000);
    }
    
    let Confirmation = () => order.customer? (
      <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : IsFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase!</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>

  ) :(
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
  if(error){
    <>
    <Typography variant='h5'>Error:{error}</Typography>
    <br/> 

    </>
  }

  
  return (
    <>
    <CssBaseline/>
        <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == steps.length ? <Confirmation /> : checkoutToken &&  <Form/> }
        </Paper>
      </main>


    </>
  )
}

export default Checkout