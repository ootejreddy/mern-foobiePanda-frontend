import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant, RestaurantSearchResponse } from "../types";
import { SearchState } from "@/pages/SearchPage";
import { RestaurantListState } from "../pages/ListOfAllRestaurantPage";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const {
    data: restaurantResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchRestaurant"],
    queryFn: getRestaurantRequest,
    enabled: !!restaurantId,
  });
  if (error) {
    toast.error(error.toString());
  }
  return {
    restaurantResult,
    isLoading,
    error,
  };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const getSearchedRestaurants =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      return response.json();
    };
  const {
    data: restaurantResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchRestaurants", searchState],
    queryFn: getSearchedRestaurants,
  });
  if (error) {
    toast.error(error.toString());
  }
  return {
    restaurantResults,
    isLoading,
    error,
  };
};

export const useGetAllRestaurants = (
  restaurantListState: RestaurantListState
) => {
  const { getAccessTokenSilently } = useAuth0();
  const getAllRestaurants = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    const accessToken = await getAccessTokenSilently();
    params.set("page", restaurantListState.page.toString());

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch all restaurants");
    }
    return response.json();
  };
  const {
    data: allRestaurantResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchAllRestaurants", restaurantListState],
    queryFn: getAllRestaurants,
  });
  if (error) {
    toast.error(error.toString());
  }

  return {
    allRestaurantResults,
    isLoading,
    error,
  };
};
