import { Form, Formik } from "formik";
import React from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import image from "../asset/background.jpg";
import InputField from "../components/InputField";
import { authData, loginUser } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(authData);

  const { login: errorLogin } = error;

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("You must enter email"),
    password: Yup.string().required("You must enter password"),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      await dispatch(loginUser(email, password));
      return navigate("/");
    } catch (err) {
      console.log(err); // you need to figur it out what can be here
    }
  };

  return (
    <>
      <Row className="form-page-wrapper">
        <Col md={6} lg={8} className="d-none d-md-block">
          <a /*href="https://www.freepik.com/vectors/man"*/>
            <Col className="d-glex justify content-center">
              <img src={image} className="login-img" alt="question" />
            </Col>
          </a>
        </Col>
        <Col md={6} lg={4}>
          <Col className="d-flex justify-content-center justify-content-xl-start form-wrapper">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="login-form">
                  <h1 className="text-center mb-4 form-header">Login</h1>
                  <InputField label="Email" name="email" />
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <Button type="submit" className="w-100" disabled={loading}>
                    {loading && (
                      <Spinner
                        className="me-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {loading ? "Loading..." : "Login"}
                  </Button>
                  {errorLogin && (
                    <div className="error-message mt-2 text-center">
                      {errorLogin}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default Login;
