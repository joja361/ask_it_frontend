import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { mainUrl } from "../../utils/axiosInstances";
import TextArea from "../TextArea";

export default function Response({ questionId }) {
  const initialValues = {
    response: "",
  };

  const validationdSchema = Yup.object({
    response: Yup.string().required("Response is not added"),
  });

  const onSubmit = async (values) => {
    const { response } = values;
    try {
      const data = await mainUrl.post(`/questions/${questionId}`, {
        response,
      });
      console.log(data);
      return;
    } catch (error) {
      console.log(error);
      // TODO: handleError right way
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationdSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TextArea label="Response" name="response" rows={3} />
          <Button type="submit">Response</Button>
        </Form>
      )}
    </Formik>
  );
}
