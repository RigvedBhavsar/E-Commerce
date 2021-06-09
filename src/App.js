import React,{useState , useEffect} from 'react';
import { commerce } from './lib/commerce';
import {Products , Navbar , Cart ,  Checkout} from './componets';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom';


const App = () => {
    const [products , setProducts] = useState([]);
    const [cart , setCart] = useState({});
    const [order , setOrder] = useState({});
    const [errorMessage , setErrorMessage] = useState('');
    const fetchProducts = async ()=> { 
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () =>{
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }

    const handleAddToCart = async(productId , quantity ) =>{
        //Here we destructure cart from resposnse object
        const {cart} = await commerce.cart.add(productId , quantity);
        setCart(cart);
    }

    const handleUpdateCartQty = async(productId , quantity)=>{
        const res = await commerce.cart.update(productId , {quantity});
        setCart(res.cart)
    }

    const handleRemoveFromCart = async(productId) =>{
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () =>{
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () =>{
        const newcart = await commerce.cart.refresh();
        setCart(newcart);
    }

    const handleCaptureCheckout = async(checkoutTokenId , newOrder)=>{
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId , newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    },[]);
    
    

    return (
        <Router>
            <div>
                <Navbar totalItems ={cart.total_items}/>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products}  onAddToCart={handleAddToCart}/>
                    </Route>

                    <Route exact path='/cart'>
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty ={handleUpdateCartQty}
                            handleRemoveFromCart ={handleRemoveFromCart}
                            handleEmptyCart ={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout cart={cart} order={order} onCaptureCheout={handleCaptureCheckout} error={errorMessage} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
