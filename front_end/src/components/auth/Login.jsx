import React, { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import BaseURL from "../../axios";
import '../auth/style.css'
import Swal from 'sweetalert2'

const Login = ({setIsLoggedIn}) => {
  // const [token, setToken] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  // Function to handle user login and get JWT token
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await BaseURL.post("/login", {
        email,
        password
      });

      // Save the token to local storage for future API requests
      //  'token' is key name in localStorage
      localStorage.setItem("token", response.data.authorization.token);
      setIsLoggedIn(true);
      // setToken(response.data.authorization.token);
      console.log(response.data);
      navigate("/student"); // Navigate to the desired route after login

    } catch (error) {
      console.error(error);
    }

   if (!email || !password) {
     let errorMessage = "Please input ";

     if (!email) {
       errorMessage += "email";
       if (!password) {
         errorMessage += " and password";
       }
     } else if (!password) {
       errorMessage += "password";
     }

     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: errorMessage,
     });
   } else {
     
     Swal.fire({
       icon: "success",
       title: "User",
       text: "Login successfully",
     });
   }

  

  };


 

  // useEffect(() => {
  //   // Check if there is a token in local storage
  //   try {
  //     const GetToken = localStorage.getItem("token");
  //     if (GetToken) {
  //       setToken(GetToken);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);


  return (
    <main>
      <div>
        <div className="container-fluid">
          <div className="row main-content bg-success text-center">
            <div className="col-md-4 text-center company__info">
              <span className="company__logo">
                <h2>
                  <span className="fa fa-android" />
                </h2>
              </span>
              <h4 className="company_title">Welcome</h4>
            </div>
            <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
              <div className="container-fluid">
                <div className="row">
                  <h2 className="mt-2">Log In</h2>
                </div>
                <div className="row">
                  <form control className="form-group">
                    <div className="row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form__input"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="row">
                      {/* <span class="fa fa-lock"></span> */}
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form__input"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="row">
                      <input
                        type="checkbox"
                        name="remember_me"
                        id="remember_me"
                        className
                      />
                      <label htmlFor="remember_me">Remember Me!</label>
                    </div>
                    <div className="row">
                      <input
                        type="submit"
                        defaultValue="Submit"
                        className="btn-login"
                        onClick={handleLogin}
                      />
                    </div>
                  </form>
                </div>
                <div className="row">
                  <p>
                    Don't have an account? <Link to="/register">Register Here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="container-fluid text-center footer">
          Create by <a href="https://github.com/saroeuntola" target="blank">Saoreun Tola</a>
          <p />
        </div>
      </div>
    </main>
  );
};

export default Login;
