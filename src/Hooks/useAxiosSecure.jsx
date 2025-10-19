import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://parcel-pilot-server-mu.vercel.app/",
  });

  // Request interceptor
  axiosSecure.interceptors.request.use(async (config) => {
    if (user) {
      const token = await user.getIdToken(); // Firebase token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate("/forbidden");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
