import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
