import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AskQuestion from "./pages/AskQuestion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyQuestions from "./pages/MyQuestions";
import Question from "./pages/Question";
import Signup from "./pages/Signup";
import Test from "./Test";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/test" element={<Test />} />
        {/* FIXME: This need to be delete leter on */}
        <Route path="/questions/:id" element={<Question />} />
        <Route path="/user/:userId" element={<MyQuestions />} />
        <Route path="/questions/ask" element={<AskQuestion />} />
        <Route path="/profile/:id" />
      </Route>
    </Routes>
  );
}
