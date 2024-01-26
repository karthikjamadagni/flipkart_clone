import { useNavigate, useParams } from 'react-router-dom';
import './CardView.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const CardView = ({loggedin, setloggedin, user, setUsername}) => {
    const {id} = useParams();
    const[product, setProduct] = useState({});

    let navigate = useNavigate();
    

    const fetchproduct = ()=>{
        const url = `https://fakestoreapi.com/products/${id}`;
        fetch(url)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            setProduct(res);
        
        });
    }

    const handleaddtocart = ()=>{

        let img = product.image;
        let title = product.title;
        let price = product.price;
        if(loggedin){
            axios.post('http://localhost:4000/addtocart', {img, title, price, user})
            .then((res)=>{
                alert(res.data.message);
            })
        }
        else{
            alert('Please login first')
            navigate('/login')
        }
    }


    useEffect(()=>{
        fetchproduct();
    },[])


    return <>
    <div className="cardview">
        <div className="leftside-image">
            <img src={product.image} alt="" className="product-image" />
        </div>
        <div className="rightside-info">
            <h3 className="cardview__title">{product.title}</h3>
            <p className="cardview__description">{product.description}</p>
            <div className="cardview__price_and_rating">
                <h4 className="cardview__category">{product.category}</h4>
                <h1 className="cardview__price">$ {product.price}</h1>
                <p className="cardview__rating">4.1</p>
                <p className="rating__count">Liked by {100}</p>
            </div>
            <button className="cardview__add_to_cart" onClick={handleaddtocart}>Add to Cart</button>
        </div>
    </div>
    </>
}
 
export default CardView;