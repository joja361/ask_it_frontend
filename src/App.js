import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AskQuestion from "./pages/AskQuestion";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyQuestions from "./pages/MyQuestions";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Question from "./pages/Question";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/questions" element={<Home />} />
      <Route path="/questions/:id" element={<Question />} />
      <Route path="/user/:userId" element={<Profile />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/questions/user/:userId" element={<MyQuestions />} />
        <Route path="/questions/ask" element={<AskQuestion />} />
      </Route>
      <Route path="*" element={<ErrorPage message="Page Not Found" />} />
    </Routes>
  );
}
