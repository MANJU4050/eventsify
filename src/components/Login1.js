import React from 'react'
import { useFormik } from "formik";
import { loginValidation } from "../schema/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login1.css'

const initialValues = {
    email: "",
    password: "",
  };
  

const Login1 = () => {
    const navigate = useNavigate();


    const register = ()=>{
        navigate('/registration')
    }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginValidation,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/login",
            values
          );

          if (response.status === 200) {
            localStorage.setItem("token", response.data);

            alert("Login successful");
            navigate("/");
          }
        } catch (error) {
          if (!error.response) {
            alert("network error");
          } else if (error.response.status === 401) {
            alert(error.response.data);
          } else if (error.response.status === 404) {
            alert(error.response.data);
          } else {
            alert("error");
          }
        }

        action.resetForm();
      },
    });

    const home = ()=>{
        navigate('/');
    }
  return (

    <div className='login'>

        <div className='homepage'><FontAwesomeIcon onClick={home} className='home' icon="fa-solid fa-house" /></div>
        
         <form onSubmit={handleSubmit}>
         <div className='loginnewinner'>
            <h1>LOGIN</h1>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="error">{errors.email}</p>
              ) : null}
            </div>

            <div  className='passwordinput'>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>

            <div className="loginBtn">
              <button type="submit">
                Log in
              </button>
            <p>New User?<span className='loginNew' onClick={register}>Register here</span></p>

              
            </div>
            </div>
            </form>
            
    </div>
   
  )
}

export default Login1