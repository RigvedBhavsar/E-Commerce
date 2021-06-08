import React from 'react'
import {Container , Typography , Button , Grid} from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ( {cart , handleUpdateCartQty ,handleRemoveFromCart ,handleEmptyCart }) => {
    
    const classes = useStyles();

    const EmptyCart = ()=>(
        <Typography variant ="subtitle1"> No Items Availabale In Cart.
            <Link to='/' className={classes.link}> Start Adding Some </Link>
        </Typography>
            
        );

    const FilledCart = ()=>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateQty ={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />  
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant ="h4">Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
                    <div className={classes.bottom}>
                        <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant="contained" color="secondary">
                            Empty Cart
                        </Button>
                        <Button className={classes.checkoutButton} component={Link} to='/checkout' size="large" type="button" variant="contained" color="primary">
                            Check Out
                        </Button>
                    </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading..';

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3">Your Cart</Typography>
            { !cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
        </Container>
    )
}

export default Cart
