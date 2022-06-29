import { Formik } from "formik";
import { useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ThinkingAbout from "../components/ImagesSvg/ThinkingAbout";
import InputField from "../components/InputField";
import NavAuth from "../components/NavAuth";
import { authData, signupUser } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(authData);

  const { signup: errorSignUp } = error;

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Field must be entered"),
    password: Yup.string().required("Field must be entered"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Field must be entered"),
  });

  const onSubmit = async (values) => {
    const { email, password, confirmPassword, name } = values;
    try {
      dispatch(signupUser(email, password, confirmPassword, name));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(error.signup);

  useEffect(() => {
    if (!loading && error.signup === "") {
      return navigate("/login");
    }
  }, [loading, error, navigate]);

  return (
    <>
      <NavAuth to="/login" text="Already have account?" linkText="Login" />
      <Row className="form-page-wrapper">
        <Col md={6} lg={8} className="d-none d-md-block">
          <ThinkingAbout />
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
                  <h1 className="text-center mb-4 form-header">Sign Up</h1>
                  <InputField label="Email" name="email" />
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <InputField label="Name" name="name" />
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
                    {loading ? "Loading" : "Sign Up"}
                  </Button>
                  {errorSignUp && (
                    <div className="error-message mt-2 text-center">
                      {errorSignUp}
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

export default Signup;
