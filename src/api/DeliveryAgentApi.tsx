import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
// import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { User } from "../types";

//* creating a custom hook for getting delivery agent details
const useGetDeliveryAgents = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getDeliveryAgents = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/getDeliveryAgents`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };
  const {
    data: deliveryAgents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchAllDeliveryAgents"],
    queryFn: getDeliveryAgents,
  });
  if (error) {
    console.log(error.toString());
  }
  console.log("The current user is: ", deliveryAgents);
  return {
    deliveryAgents,
    isLoading,
    error,
  };
};
export default useGetDeliveryAgents;
