import Loading from "../components/Loading";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;

  if (!user || role !== "admin") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }

  return children;
};

export default AdminRoute;
