import "./Login.css";
import images from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({
  username,
  setUsername,
  fullName,
  setFullName,
  loggedin,
  setloggedin,
}) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    var email = document.getElementById("l__username").value;
    var pswd = document.getElementById("l__pswd").value;
    console.log(email, pswd);
    axios
      .post("http://localhost:4000/login", { email, pswd })
      .then((response) => {
        alert(response.data.message);
        if (response.data.message === "Logged in Successfully") {
          setUsername(response.data.username);
          setFullName(response.data.fullname);
          setloggedin(true);
          console.log(response.data.username);
          console.log(response.data.fullname);
          navigate("/");
        }
      });
  };

  const handleSignup = async () => {
    try {
      var email = document.getElementById("s__email").value;
      var pswd = document.getElementById("s__pswd").value;
      var fullname = document.getElementById("s__user_name").value;
      if (pswd.length >= 8) {
        axios
          .post("http://localhost:4000/signup", { email, pswd, fullname})
          .then((response) => {
            alert(response.data.message);
            if (response.data.message === "Successfully Registered") {
              setUsername(response.data.username);
              setFullName(response.data.fullname);
              setloggedin(true);
              alert(response.data.fullname);
              navigate("/profile");
            }
          });
      }
      else{
        alert("Password must contain at least 8 characters")
      }
    } catch (error) {
      if (error.isAxiosError) {
        console.error("Signup failed:", error);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };
  return (
    <>
      <div className="login-box">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <div className="signup-form">
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                type="text"
                name="txt"
                placeholder="User name"
                required=""
                className="signup__input"
                id="s__user_name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required=""
                className="signup__input"
                id="s__email"
              />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                className="signup__input"
                id="s__pswd"
              />
              <button className="btn-signup" onClick={handleSignup}>
                Sign up
              </button>
            </div>
          </div>

          <div className="login">
            <div className="login-form">
              <label
                htmlFor="chk"
                aria-hidden="true"
                style={{ color: "white", paddingTop: "0.25rem" }}
              >
                Login
              </label>
              <input
                type="email"
                name="username"
                placeholder="Email"
                required=""
                className="login__input"
                id="l__username"
              />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                className="login__input"
                id="l__pswd"
              />
              <button
                className="btn-login"
                style={{ color: "white" }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
