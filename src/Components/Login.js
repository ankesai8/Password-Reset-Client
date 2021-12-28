import React, { useContext } from "react";
import * as YUP from "yup";

import { Card, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { AppContext } from "../App";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const histroy = useHistory();
  const [log, setLog] = useContext(AppContext);

  //send login
  const sendLogin = async (values) => {
    const response = await axios.post(
      "https://nodejs-reset-password.herokuapp.com/users/login",
      {
        email: values.email,
        password: values.password,
      }
    );
    console.log(response);

    if (response.status === 200) {
      window.localStorage.setItem("auth-token", response.data.token);

      return true;
    } else {
      return false;
    }
  };

  // signin Schema using yup

  const signInSchema = YUP.object().shape({
    email: YUP.string().email(),

    password: YUP.string()
      .min(6, "password should be more than 5 characters"),   
  });

  return (
    <>
      <div className="bg-primary p-3 card-container">
        <Card className="card" border="secondary">
          <Card.Header className="text-center">
            <h4 className="text-dark">Login</h4>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={async (values) => {
                console.log(values);
                let reset = await sendLogin(values); //if status 200 returns true; else false

                console.log(reset); //true or

                if (reset) {
                  console.log(log); //default false;
                  setLog(true); //now true
                  histroy.push("/protected");
                } else {
                  console.log("else in");
                  histroy.push("/protected");
                }
              }}
            >
              {() => {
                return (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <Field className="form-control link" id="email" type="email" name="email" component="input" placeholder="Enter Your Email" />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <Field className="form-control inputfield" id="password" type="password" name="password" component="input" placeholder="Enter Your Email" />
                        <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="primary">
                        Log In
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex mt-4 justify-content-center">
              <Link to="/forgotpassword">
                <p className="forgotpass mx-2">Forgot Password?</p>
              </Link>
              <Link to="/register" className="ac link">
                Create Account
              </Link>
            </div>
            {/* <div><p>Error is: {log}</p></div> */}
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Login;
