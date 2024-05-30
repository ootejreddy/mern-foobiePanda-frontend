import { useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Restaurant } from "../types";

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  };
  const {
    mutateAsync: createRestaurant,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createMyRestaurantRequest,
  });
  if (isSuccess) {
    toast.success("Restaurant Created!");
  }
  if (error) {
    toast.error("unable to update the restaurant");
  }
  return {
    createRestaurant,
    isPending,
    isSuccess,
    error,
  };
};
