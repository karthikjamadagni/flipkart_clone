import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CardView from './components/CardView/Cardview';
import Order from './components/Order/Order';



function App() {

  const[loggedin, setloggedin] = useState(false)

  const [homeProducts, setHomeProducts] = useState([]);
  const[username, setUsername] = useState();
  const[fullName, setFullName] = useState();
  return <>
    <Router>
      <Navbar homeProducts={homeProducts} setHomeProducts={setHomeProducts} user={username} setUsername={setUsername} fullName={fullName} setFullName={setFullName} loggedin={loggedin} setloggedin={setloggedin}/>
      <Routes>
        <Route index element={<Home homeProducts={homeProducts} setHomeProducts={setHomeProducts} loggedin={loggedin} setloggedin={setloggedin} user={username} setUsername={setUsername}/>}></Route>
        <Route path='/login' element={<Login user={username} setUsername={setUsername} fullName={fullName} setFullName={setFullName} loggedin={loggedin} setloggedin={setloggedin}/>}></Route>
        <Route path='/profile' element = {<Profile user={username} setUsername={setUsername}/>}></Route>
        <Route path='/cart' element={<Cart user={username} setUsername={setUsername}/>}></Route>
        <Route path='/cardview/:id' element={<CardView  loggedin={loggedin} setloggedin={setloggedin} user={username} setUsername={setUsername}/>}/>
        <Route path='/order' element={<Order  user={username}/>}></Route>
      </Routes>
    </Router>
    <div className="appfooter">
      <Footer />
    </div>
  </>
}

export default App;
