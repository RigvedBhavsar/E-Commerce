import React from 'react';
import { Grid }from '@material-ui/core';
import Product from './Product/Product';

import useStyles from './styles'
const products= [
    {id : 1 , name : 'shoes', description :'Runnig Shoes', price:'$100' , image:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/00370c95-40bc-44f6-9551-c5fe866e245e/flex-experience-run-9-running-shoe-HdHB7f.png'},
    {id : 2 , name : 'Macbook', description :'Apple Macbook', price:'$1000' , image:'https://www.notebookcheck.net/uploads/tx_nbc2/air13teaser.jpg'},
    {id : 3 , name : 'Watch', description :'Fossil Watch', price:'$350' , image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyxeeQ2TFUczu5GuoorIDhJLa9gDUsQan2rw&usqp=CAU'}
];


const Products = () => {

    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
