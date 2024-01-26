import axios from 'axios';
import './Order.css';
import { useEffect, useState } from 'react';

import confirmed from '../../assets/confirmed.png';

const Order = ({user})=>{

    const[orders, setOrders] = useState([]);
    const[userinfo, setUserInfo] = useState([]);
    const [fetched, isfetched] = useState(false);
    const[tc, setTc] = useState(0);


     const calculate_cost = ()=>{
        let total_cost = 0;
        for(let i=0;i<orders.length;i++){
            let qty = orders[i].quantity;
            let price = orders[i].price;
            total_cost+=qty*price;
        }
        setTc(total_cost);
    }


    const fetchOrder = ()=>{
        axios.post('http://localhost:4000/fetchuserinfo', {user})
        .then((res)=>{
            setUserInfo(res.data.array);
            console.log(res.data.array);
            axios.post('http://localhost:4000/fetchorders', {user})
            .then((res1)=>{
                setOrders(res1.data.array);
                console.log(res1.data.array);
                isfetched(true);
            })
        })
    }


    setTimeout(()=>{
        fetchOrder();
        isfetched(false);
    }, 3000)

    return <>

    { fetched? <>
        <div className="order-box">
            <div className="logo">
                <img src={confirmed} alt="imenotfound" className='confirmed-img' />
            </div>
            <div className="order-card">
                <table className="table-order">
                    <tr className="order-table">
                        <td>Order ID</td>
                        <td>{orders[0].id}</td>
                    </tr>
                    <tr className="order-table">
                        <td>Name</td>
                        <td>{userinfo[0].fullname}</td>
                    </tr>
                    <tr className="order-table">
                        <td>Username</td>
                        <td>{userinfo[0].username}</td>
                    </tr>
                    {
                        orders.map((order)=>(
                            <tr className='order-table'>
                                <td>Product</td>
                                <td>{order.product_title} * {order.quantity}</td>
                                <td className='special-td'>${(order.product_price)*(order.quantity)}</td>
                            </tr>
                        ))
                    }
                    <tr className="order-table">
                        <td>Phone Number</td>
                        <td>{userinfo[0].phone_no}</td>
                    </tr>
                    <tr className="order-table">
                        <td>Delivery Address</td>
                        <td>{userinfo[0].delivery_address}</td>
                    </tr>
                    <tr className='order-table'>
                        <td>Status</td>
                        <td>{orders[0].status}</td>
                    </tr>
                </table>
            </div>
        </div>
        </>
        :
        <>
        <h1 className='loading'>Loading....</h1>
        </>

    }

    </>
}

export default Order;