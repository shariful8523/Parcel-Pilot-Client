import { Children } from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router";


const PrivateRouter = ({ Children }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <span className="text-2xl font-bold text-center" >Loading</span>
    }


    if (!user) {
        <Navigate to="/login" />
    }




    return Children;

};

export default PrivateRouter;