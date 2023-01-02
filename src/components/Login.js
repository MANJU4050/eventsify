import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import avathar from "../assets/avathar.svg";
import authimg from "../assets/login.svg";
import "./Login.css";
import { useFormik } from "formik";
import { loginValidation } from "../schema/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
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

  return (
    <Container className="contain">
      <Row>
        <Col lg={4} md={6} sm={12} className="text-left  mt-2">
          <h3 className=" head  mb-5">Sign in your account!!!</h3>
          <img className="avathar" src={avathar} alt="icon" />

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control mb-4"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                className="form-control mb-4"
                placeholder="Enter Your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
            </div>

            <div className="d-grid gap-2 mb-4">
              <Button variant="primary" size="md" type="submit">
                Sign In
              </Button>
            </div>
            <div className="last mt-4">
              <a href="./register" className="">
                please register here!
              </a>
            </div>
          </form>
        </Col>

        <Col lg={8} md={6} sm={12}>
          <img src={authimg} alt="icon" className="w-100" />
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
