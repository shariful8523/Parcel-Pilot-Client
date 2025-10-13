import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const from = location.state?.from || '/';

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                //  Prepare user info for MongoDB
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    role: "user",
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                    photoURL: user.photoURL || "",
                };

                await axiosInstance.post("/users", userInfo);

                navigate(from)
            })
            .catch(error => {
                console.error("Google Sign-in error:", error.message);
            });
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
        >
            <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="google"
                className="w-5 h-5"
            />
            Register with Google
        </button>
    );
};

export default SocialLogin;
