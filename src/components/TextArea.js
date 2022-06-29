import { ErrorMessage, Field } from "formik";
import { Form, InputGroup } from "react-bootstrap";

export default function TextArea({ label, name, rows, placeholder, ...rest }) {
  const inputGroup = (
    <InputGroup hasValidation>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <Form.Control
              as="textarea"
              rows={rows}
              placeholder={placeholder}
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
