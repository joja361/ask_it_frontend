import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createResponse } from "../../store/responseSlice";
import TextArea from "../TextArea";

export default function ResponseForm({ questionId }) {
  const dispatch = useDispatch();
  const initialValues = {
    response: "",
  };

  const validationdSchema = Yup.object({
    response: Yup.string().required("Response is not added"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { response } = values;
    dispatch(createResponse(questionId, response));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationdSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextArea name="response" rows={3} placeholder="Add Response" />
          <Button type="submit">Post Response</Button>
        </Form>
      )}
    </Formik>
  );
}
