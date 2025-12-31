import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading: roleLoading,
    refetch: refetchUserRole,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    refetchOnWindowFocus: true, // 🔥 When tab changes role auto-update
    refetchInterval: 5000, // 🔥 Auto re-check every 5 sec (Optional)
    queryFn: async () => {
      const encodedEmail = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${encodedEmail}/role`);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetchUserRole };
};

export default useUserRole;
