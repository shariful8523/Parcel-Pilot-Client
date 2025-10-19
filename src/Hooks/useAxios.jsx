import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://parcel-pilot-server-mu.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;