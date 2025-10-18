import Loading from "../../../components/Loading";
import useUserRole from "../../../Hooks/useUserRole";
import ForbiddenPage from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";


const DashboardHome = () => {

    const {role, roleLoading}= useUserRole();


     if (roleLoading) {
        return <Loading/>
    }

    if(role === 'user'){
        return <UserDashboard/>
    }
    else if(role === 'rider'){
        return <RiderDashboard/>
    }
    else if(role ==='admin'){
        return <AdminDashboard/>
    }
    else {
        return <ForbiddenPage/>
    }
};

export default DashboardHome;