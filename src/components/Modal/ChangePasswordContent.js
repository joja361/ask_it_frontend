import { Formik } from "formik";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authData } from "../../store/authSlice";
import { mainUrl } from "../../utils/axiosInstances";
import InputField from "../InputField";

export default function ChangePasswordContent({ handleModal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { user } = useSelector(authData);
  const { userId } = user;

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Field must be entered"),
    newPassword: Yup.string()
      .min(5, "Password must be minimum 5 characters")
      .required("Field must be entered"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Password must match")
      .required("Field must be entered"),
  });

  const onSubmit = async (values) => {
    const { oldPassword, newPassword } = values;
    setLoading(true);
    setError("");
    try {
      await mainUrl.put("/auth/reset-password", {
        userId,
        oldPassword,
        newPassword,
      });
      setLoading(false);
      handleModal();
    } catch (error) {
      setLoading(false);
      setError(error.response?.data.message);
    }
  };

  return (
    <div className="modal-content">
      <div className="py-4 px-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center mb-4 modal-content-header">
                Change Password
              </h1>
              <InputField
                label="Old Password"
                name="oldPassword"
                type="password"
              />
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
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
                {loading ? "Loading" : "Change Password"}
              </Button>
              {error && (
                <div className="error-message mt-2 text-center">{error}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
