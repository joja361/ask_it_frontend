import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );

  console.log("PROTECTED ROUTE");
  console.log(children);
  console.log(<Outlet />);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
