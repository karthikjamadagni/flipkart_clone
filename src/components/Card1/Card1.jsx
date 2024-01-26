import React, { useState } from 'react'
import images from '../../assets/index'
import {motion, useMotionValue, useTransform} from 'framer-motion';
import './Card1.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Products = ({img, id, title, price, rating, loggedin, setloggedin, user, setUsername}) => {

    let navigate = useNavigate();

    const handleviewclick = ()=>{
        navigate(`/cardview/${id}`);
    }

    const handleaddtocart = ()=>{
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


    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [30, -30]);
    
    return <>
        <div className="Card-Wrapper1">
            <motion.div className="card1"
            style={{x, y, rotateX, rotateY, z: 100}}
            drag
            dragElastic={0.05}
            whileTap={{cursor: 'grabbing'}}
            >
                <div className="card-upper">
                    <div className="card-logo">
                        <img src={images.verified} alt="" />
                    </div>
                    <div className="card-main" onClick={handleviewclick}>
                        <div className="descr">
                            <h2 className='h2'>{title.slice(0, 20)}</h2>
                            <p className='p'><i class="fa-solid fa-tag"></i>Special PriceGet extra 46% off </p><p><i class="fa-solid fa-tag"></i>Partner OfferSign up</p>
                            <div className="price2" ><h1>${price}</h1></div>
                        </div>
                        <div className="main-img">
                            <motion.img src={img} alt="" id={`${id}`}
                            />
                            <div className="rating">
                                {
                                    //en beko adna map madko
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-lower" onClick={handleaddtocart}>
                    Add to Cart
                </div>
            </motion.div>
        </div>

    </>
}

export default Products;
