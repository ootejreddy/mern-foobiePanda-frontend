import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Restaurant } from "../types";

//* custom hook for creating the restaurant
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
      throw new Error("Failed to create restaurant");
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

//*custom hook for updating myRestaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRestaurant,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: updateMyRestaurantRequest,
  });
  if (isSuccess) {
    toast.success("Restaurant Updated!");
  }
  if (error) {
    toast.error("unable to update the restaurant");
  }
  return {
    updateRestaurant,
    isPending,
    isSuccess,
    error,
  };
};

//* custom hook for getting myRestaurantDetails
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return response.json();
  };

  const {
    data: myRestaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentRestaurant"],
    queryFn: getMyRestaurantRequest,
  });
  if (error) {
    toast.error(error.toString());
  }

  return {
    myRestaurant,
    isLoading,
    error,
  };
};
