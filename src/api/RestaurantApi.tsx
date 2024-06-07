import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { RestaurantSearchResponse } from "../types";
import { SearchState } from "@/pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
