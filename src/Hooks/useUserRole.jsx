import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "user", isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const encodedEmail = encodeURIComponent(user.email); // <-- encode email
      const res = await axiosSecure.get(`/users/${encodedEmail}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
