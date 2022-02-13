import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart , handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    const classes = useStyles();
    const EmptyCart = () =>(
        <Typography variant='subtitle1'>you have no items in your Shopping cart, 
        <Link to = '/' className={classes.link}>start adding some</Link>! 
        </Typography>
    );
       
         
    
    const FilledCart = () =>(<>
      
        <Grid container spacing={3}>
        {
            cart.line_items.map((item)=>(
                <Grid item xs={12} sm={4} key ={item.id} >
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))
        }
        
        </Grid> 
        <div className={classes.cardDetails}>
        <Typography variant='h4'>Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
            <Button className={classes.emptyButton} size="large" type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty </Button>
            <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>


        </div>
     </>);
     if (!cart.line_items) return '...Loading';

        
    
    
   return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} gutterBottom variant = 'h4'>Your Shopping cart</Typography>
        {!cart.line_items.length ?  <EmptyCart/> : <FilledCart/> }

    </Container>
  )
}

export default Cart