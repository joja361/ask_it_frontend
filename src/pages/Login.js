import { Form, Formik } from "formik";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import image from "../asset/background.jpg";
import LoginButton from "../components//Buttons/LoginButton";
import InputField from "../components/InputField";
import NavAuth from "../components/NavAuth";
import { authData, loginUser } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(authData);

  let { login: errorLogin } = error;

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
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <NavAuth to="/signup" text="Don't have account?" linkText="Sign Up" />
      <Row className="form-page-wrapper">
        <Col md={6} lg={8} className="d-none d-md-block">
          <a /*href="https://www.freepik.com/vectors/man"*/>
            <Col className="d-flex justify-content-center">
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
                  <LoginButton />
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
