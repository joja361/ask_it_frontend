import { Form, InputGroup } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";

function InputField({ label, name, type, ...rest }) {
  const inputGroup = (
    <InputGroup hasValidation>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <Form.Control
              type={type}
              isInvalid={meta.error && meta.touched}
              {...field}
              {...rest}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(errMsg) => {
          return (
            <Form.Control.Feedback type="invalid">
              {errMsg}
            </Form.Control.Feedback>
          );
        }}
      </ErrorMessage>
    </InputGroup>
  );
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      {inputGroup}
    </Form.Group>
  );
}

export default InputField;
