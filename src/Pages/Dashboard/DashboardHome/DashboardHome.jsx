import Loading from "../../../components/Loading";
import useUserRole from "../../../Hooks/useUserRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";


const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  if (role === "admin") return <AdminDashboard />;
  if (role === "rider") return <RiderDashboard />;
  if (role === "user") return <UserDashboard />;

  return <ForbiddenPage />;
};

export default DashboardHome;
