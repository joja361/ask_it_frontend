import { Formik } from "formik";
import { Button, Form, Spinner } from "react-bootstrap";
import InputField from "../InputField";
import * as Yup from "yup";

export default function ChangePasswordContent() {
  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Field must be entered"),
    password: Yup.string().required("Field must be entered"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Field must be entered"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="modal-content">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center mb-4 form-header">Change Password</h1>
              <InputField
                label="Old Password"
                name="oldPassword"
                type="password"
              />
              <InputField label="Password" name="password" type="password" />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Button type="submit" className="w-100" /*disabled={loading}*/>
                Change Password
                {/* {loading && (
                <Spinner
                  className="me-2"
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {loading ? "Loading" : "Change Password"} */}
              </Button>
              {/* {errorSignUp && (
              <div className="error-message mt-2 text-center">
                {errorSignUp}
              </div>
            )} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
