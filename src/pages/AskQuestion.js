import { Formik } from "formik";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ask } from "../asset/ask";
import SvgWrapper from "../components/ImagesSvg/SvgWrapper";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";
import TextArea from "../components/TextArea";
import { mainUrl } from "../utils/axiosInstances";

export default function AskQuestion() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const initialValues = {
    question: "",
    description: "",
  };

  const onSubmit = async (values) => {
    const { question, description } = values;

    try {
      setError("");
      await mainUrl.post("/questions", { question, description });
      return navigate("/");
    } catch (error) {
      setError(error.message);
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
      <Container className="wrapper">
        <SvgWrapper>{ask}</SvgWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <InputField label="Question" name="question" />
                <TextArea label="Description" name="description" rows={10} />
                <Button type="submit">Post your question</Button>
                {error && (
                  <div className="error-message mt-2 text-center">{error}</div>
                )}
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
}
