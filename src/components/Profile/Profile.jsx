import axios from 'axios';
import './Profile.css';
import { Navigate, useNavigate } from 'react-router-dom';
const Profile = ({user})=>{

    let navigate = useNavigate();

    const handleprofilesubmit = ({username, setUsername})=>{
        let email = document.getElementById('email_profile').value;
        let phone_number = document.getElementById('ph_no_profile').value;
        let delivery_address = document.getElementById('delivery_address_profile').value;
    

        axios.post('http://localhost:4000/updateuser', {email, phone_number, delivery_address, user})
        .then((res)=>{
            alert(res.data.message);
            if(res.data.message==="Updated Successfully"){
                navigate('/');
            }
            
        })
    }
    return <>
    <div className="profile">
        <div className="profile-heading">
            <h2>Registration</h2>
            <table className="profile-registration">
                <tr className='tr-heading'>
                    <td>First Name</td>
                    <td>Last Name</td>
                </tr>
                <tr>
                    <td>
                    <input type="text" name="" id="" placeholder='e.g Karthik'/>
                    </td>
                    <td>
                        <input type="text" name="" id="" placeholder='N G'/>
                    </td>
                </tr>
                <tr className='tr-heading'>
                    <td>Email Address</td>
                    <td>Phone Number</td>
                </tr>
                <tr>
                    <td><input type="text" name="" id="email_profile" placeholder='john@gmail.com'/></td>
                    <td>
                        <input type="number" name="" id="ph_no_profile" placeholder='e.g +9114541214'/>
                    </td>
                </tr>
                <tr className='tr-heading'>
                    <td>Delivery Address</td>
                </tr>
                <tr>
                    <td colSpan={2}><textarea name="" id="delivery_address_profile" cols="40" rows="8" placeholder='e.g #1414 Bangalore'></textarea></td>
                </tr>
                <tr>
                    <td><button className="profile-submit" onClick={handleprofilesubmit}>Submit</button></td>
                </tr>
            </table>
        </div>
    </div>
    </>
}

export default Profile;