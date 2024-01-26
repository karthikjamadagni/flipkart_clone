import { useNavigate } from 'react-router-dom';
import CartCard from '../CartCard/CartCard';
import './Cart.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Cart = ({user, setUsername}) => {
    let navigate = useNavigate();

    const[price1, setprice1] = useState([])
    const [hasFetchedCart, setHasFetchedCart] = useState(false);
    const[cartProducts, setCartProducts] = useState([]);

    const fetchcart = ()=>{
        axios.post('http://localhost:4000/fetch', {user})
        .then((res)=>{
            setCartProducts(res.data.array);
            // console.log("The array is ",cartProducts);

        })
    }

    const handleBuy = ()=>{
        // axios.post('http://localhost:4000/buy', {user, price1})
        // .then((res)=>{
        //     alert(res.data.message);
        //     navigate('/')
        // })


        axios.post('http://localhost:4000/fetch', {user})
        .then((res1)=>{
            var msg = '';
            console.log("The array is ",cartProducts);
            for(let i=0;i<cartProducts.length;i++){
                let prod_title = (cartProducts[i].product_title);
                let qty = (cartProducts[i].quanitity);
                let price = cartProducts[i].product_price;
                console.log(prod_title, qty, price);
                axios.post('http://localhost:4000/buy', {prod_title, qty, price, user})
                .then((res2)=>{
                    alert(res2.data.message);
                    axios.post('http://localhost:4000/handleRemove', {prod_title, user})
                    .then((res)=>{
                     console.log(res.data.message);
                    navigate('/cart');
                    })
                    
                })
                
            }

        })
    }


    const calctotal = ()=>{
        axios.post('http://localhost:4000/fetch', {user})
        .then((res)=>{
            let totalcost = 0;
            setCartProducts(res.data.array);
            setHasFetchedCart(true);
            console.log("The array is ",cartProducts);
            for(let i=0;i<cartProducts.length;i++){
                let qty = (cartProducts[i].quanitity);
                let price = cartProducts[i].product_price;
                totalcost+= qty*price;
            }
            setprice1(totalcost)
            // console.log(totalcost);

        })
    }

    useEffect(() => {
        if (!hasFetchedCart) {
            fetchcart();
        }
    }, [hasFetchedCart]);

    return <>
    <div className="Cart">
        <div className="detail">
        {
            cartProducts.map((cartProduct)=>(
                <CartCard cartProduct={cartProduct} price1={price1} setprice1={setprice1} calctotal={calctotal}
                user={user}/>
            ))
        }
        </div>
        <div className="summary">
            <button className="refresh" onClick={calctotal}>
                Calculate Cost
            </button>
            <h4 className="total-heading">
                Total Price:${price1}
            </h4>
            <button className="checkout" onClick={handleBuy}>Buy Now</button>
        </div>
        
    </div>
   
    </>
}
 
export default Cart;