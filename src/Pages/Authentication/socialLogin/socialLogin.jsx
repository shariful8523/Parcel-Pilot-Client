import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log("Google Sign-in successful:", result.user);
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
