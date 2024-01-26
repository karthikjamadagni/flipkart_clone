import './Register.css';
import images from '../../assets';

const Register = () => {
    return <>
    <div className="registerbox">
        <div className="leftsidebox">
            <img src={images.login} alt="imgnotfound"/>
        </div>

        <div className="rightsideregisterbox">
            <div className="mainregisterbox">
                <div className="heading">
                    <h3>Register Here</h3>
                </div>
                <div className="formbox">
                    <p>Username</p>
                    <input type="text" name="username" id="" placeholder='abc@gmail.com' className='registerinput'/>
                </div>
                <div className="formbox">
                    <p>Password</p>
                    <input type="password" name="password" id="" placeholder='****' className='registerinput'/>
                </div>
                <div className="formbox">
                    <p>Re Enter Password</p>
                    <input type="password" name="password" id="" placeholder='****' className='registerinput'/>
                </div>
                <button type="submit" className='registersubmit'>Register</button>
            </div>
        </div>
    </div>
    </>
}
 
export default Register;