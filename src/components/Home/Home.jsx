import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import images from '../../assets/index';
import Card1 from "../Card1/Card1";
import { useEffect, useState } from "react";
const Home = ({homeProducts, setHomeProducts, loggedin, setloggedin, user, setUsername}) => {

  const popular_items = [images.prod1, images.prod2, images.prod3, images.prod4, images.prod5, images.shirt1];

  const gethomeProducts = async()=> { 
    
    const url = 'https://fakestoreapi.com/products?limit=20';
    fetch(url)
    .then(res => res.json())
    .then(res => setHomeProducts(res));
  }

  useEffect(()=>{
    gethomeProducts();
  },[])
  
  return (
    <>
    <div className="home">
    <div className="carousel">
        <Carousel infiniteLoop={true} interval={2000} showThumbs={false} autoPlay={true}>
                <div className="slide">
                    <img src={images.car1} alt="nothing" id='car1'/>
                </div>
                <div className="slide">
                    <img src={images.car2} alt="nothing"/>
                </div>
                <div className="slide">
                    <img src={images.car3} alt="nothing"/>
                </div>
                <div className="slide">
                    <img src={images.car5} alt="nothing" id='car1'/>
                </div>
                <div className="slide">
                    <img src={images.car6} alt="nothing" id='car1'/>
                </div>
        </Carousel>
      </div>



      <div className="popular-items">
        <div className="popular-items-title">
          <h1 className="home-title">Independence Day Specials</h1>
        </div>
        <div className="popular-items-cards">
          {
            homeProducts.map((product)=>(
              <Card1 img={product.image} id={product.id} title={product.title} price={product.price} loggedin={loggedin} setloggedin={setloggedin} user={user} setUsername={setUsername}/>
            ))
          }
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Home;
