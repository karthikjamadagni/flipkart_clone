import axios from 'axios';
import './CartCard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CartCard = ({cartProduct, calctotal, user}) => {

    let navigate = useNavigate();

    let prod_title = cartProduct.product_title;

    const[counter, setCounter] = useState(1);
    const[counter_new, setCounterNew] = useState(1);


    const handleplus = async()=>{
        let count = counter+1;
        setCounterNew(count);
        console.log(count);
        axios.post('http://localhost:4000/handleplus', {counter_new, prod_title})
        .then((res)=>{
            setCounter((res.data.qty));
            // alert(res.data.message)
        })
    }

    const handleRemove = ()=>{
        axios.post('http://localhost:4000/handleRemove', {prod_title, user})
        .then((res)=>{
            console.log(res.data.message);
            navigate('/cart');
        })
    }


    const handleminus = ()=>{
        let count = counter-1;
        setCounterNew(count);
        console.log(count);
        setCounter(counter-1);
        axios.post('http://localhost:4000/handleminus', {counter_new, prod_title})
        .then((res)=>{
            setCounter((res.data.qty));
            // alert(res.data.message)
        })
    }

    useEffect(()=>{
        calctotal();
    }, [counter_new]);

    let price = counter*cartProduct.product_price;


    return <>
    <div className="cart_card">
        <div className="cart_image">
            <img src={cartProduct.product_image} alt="search for something else" />
            <div className="quantity">
                <button className='inc_dec' onClick={handleminus}>-</button>
                <input type="text" name="" id="" value={counter} className='inc_dec'/>
                <button className='inc_dec' onClick={handleplus}>+</button>
            </div>
        </div>

        <div className="cart_card_description">
            <div className="prod_title">
                <h3>{cartProduct.product_title}</h3>
                <h2>${price}</h2>
                <p className="remove" onClick={handleRemove}>Remove</p>
            </div>
        </div>
    </div>
    </>
}
 
export default CartCard;