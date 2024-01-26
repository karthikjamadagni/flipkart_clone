import './Navbar.css';
import images from '../../assets';
import { Link } from 'react-router-dom';
const Navbar = ({homeProducts, setHomeProducts, username, setUsername, fullName, setFullName, loggedin, setloggedin}) => {

    const handleSearch = ()=>{
        var x = document.getElementById('search-bar').value;
        const url = `https://fakestoreapi.com/products/category/${x}`;
        try {
        fetch(url)
        .then(res=>res.json())
        .then(res => {setHomeProducts(res); console.log(homeProducts)});
        } catch (error) {
            console.log(error);
        }      
    }


    const handleLogOut = ()=>{
        setUsername(null);
        setFullName(null);
        setloggedin(false);
        window.location.href='http://localhost:3000';
    }


    return <>
    <div className="navbar">
        <ul>
            <Link to='/'><li><img src={images.flipkart_logo} alt="" /></li></Link>
            <li><input type="text" name="" id="search-bar" placeholder='Search your favourite products.....'/></li>
            <li onClick={handleSearch}><img src={images.search_icon} alt="" style={{width:"40px", height: "40px", marginLeft: '-50px', marginTop: "-5px", marginBottom: '10px'}}/></li>
            {fullName? 
            <>
                <button className='fname-btn'>Hi, {fullName}</button>
                <Link to='/profile'><button className='profile-btn'>Profile</button></Link>
                <Link to='/cart'><li>Cart</li></Link>
                <Link to='/order' className='order-btn'><li>My Order</li></Link>
                <button className="logout" onClick={handleLogOut}>Logout</button>
             </>
            :
            <>
                <Link to='/login'><button className='__login__' style={{color:'blue'}}>Login</button></Link> 
            </>
}
        </ul>
    </div>
    </>
}
 
export default Navbar;