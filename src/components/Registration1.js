import React from 'react'
import { useFormik } from "formik";
import { registerValidation } from "../schema/Register";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Registration1.css'


const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    place: "",
  };
  

const Registration1 = () => {
    const navigate = useNavigate();


    const login = ()=>{
        navigate('/login')
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerValidation,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/registration",
            values
          );
          console.log(values);

          if (response.status === 200) {
            alert(response.data);
          } else if (response.status === 201) {
            alert(response.data);
            navigate("/login");
          } else {
            alert("error");
          }
        } catch (error) {
          console.log(error);
        }
        action.resetForm();
      },
    });

    const home = ()=>{
        navigate('/');
    }
  return (

    <div className='registerNew'>

<div className='homepage'><FontAwesomeIcon onClick={home} className='home' icon="fa-solid fa-house" /></div>
        
         

            <form onSubmit={handleSubmit}>
                 <div className='registerNewinner'>
            <h1>Register</h1>
            <div>
              <input
                type="text"
                autoComplete="off"
                name="firstname"
                id="firstname"
                placeholder="Enter Your Firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstname && touched.firstname ? (
                <p className="error">{errors.firstname}</p>
              ) : null}
            </div>

            <div>
              <input
                type="text"
                autoComplete="off"
                name="lastname"
                id="lastname"
                placeholder="Enter Your Lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastname && touched.lastname ? (
                <p className="error">{errors.lastname}</p>
              ) : null}
            </div>

            <div>
              <input
                type="email"
                autoComplete="off"
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

            <div>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>

            <div>
              <input
                type="text"
                autoComplete="off"
                name="place"
                id="cpassword"
                placeholder="place"
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <p className="error">{errors.place}</p>
              ) : null}
            </div>

            <div className="registerNewBtn">
              <button  type="submit">
                Register
              </button>
            <p>Already have an Account?<span className='loginNew' onClick={login}>Login here</span></p>

            </div>

            </div>
          </form>
            
    </div>
   
  )
}

export default Registration1