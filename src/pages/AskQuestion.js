import { Field, Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";
import { mainUrl } from "../utils/axios";

export default function AskQuestion() {
  const navigate = useNavigate();
  const initialValues = {
    question: "",
    description: "",
  };

  const onSubmit = async (values) => {
    const { question, description } = values;
    try {
      // TODO: instance not working in case we create it in axios.js file since they are not updated properly
      await mainUrl.post(
        "/questions",
        {
          question,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return navigate("/");
    } catch (error) {
      // TODO: handle this error right way
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    question: Yup.string()
      .min(10, "Question must be at least 10 characters")
      .required("Question is missing."),
    description: Yup.string().required("Body is missing"),
  });

  return (
    <>
      <NavBar />
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <InputField label="Question" name="question" />
                {/* TODO: improve textarea or make a component something like inputfield, also need to change error hand.*/}
                <Field name="description">
                  {({ field }) => {
                    return (
                      <textarea
                        {...field}
                        cols="30"
                        rows="10"
                        className="d-block w-100"
                      ></textarea>
                    );
                  }}
                </Field>
                <Button type="submit">Post your question</Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
}
