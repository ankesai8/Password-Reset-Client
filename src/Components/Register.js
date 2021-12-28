import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import * as YUP from "yup";
import { NavLink } from "react-router-dom";
import "./Css/Register.css";

function Register() {
  const [info, setInfo] = useState("");

  const createAccount = async (values) => {
    try {
      console.log("acc created ");
      const response = await axios.post(
        "https://password-reset-6.herokuapp.com/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setInfo(response.data);

      return true;
    } catch (err) {
      console.log(err.response.data);
      setInfo(err.response.data.Error);
      return false;
    }
  };

  const signInSchema = YUP.object().shape({
    name: YUP.string(),
    email: YUP.string().email(),
    password: YUP.string()
      .min(6, "password should be atleast 6 characters")
      
  });

  return (
    <>
      <div className="bg-primary card-container">
        <Card className="card" border="secondary">
          <Card.Header className="text-center">
            <h4 className="text-dark">Account Registartion</h4>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                createAccount(values);

                resetForm();
              }}
            >
              {() => {
                return (
                  <Form>
                    <div className="form-group mb-3">
                      <label className="text-start" htmlFor="email">
                        Name
                      </label>
                      <Field className="form-control link" id="name" type="text" name="name" component="input" placeholder="Enter Your Name" />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    {/* email */}
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <Field className="form-control link" id="email" type="email" name="email" component="input" placeholder="Enter Your Email" />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    {/* password */}
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <Field className="form-control link" component="input" type="password" id="password" name="password" placeholder="Enter Your Password" />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button className="mx-2 " variant="primary">
                        <NavLink className="loginLink" to="/login">
                          Login
                        </NavLink>
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className="text-success">
              <h3>{info}</h3>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Register;
