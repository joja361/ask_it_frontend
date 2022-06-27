import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
}
