import { useGetCurrentUser } from "@/api/MyUserApi";
import { useGetAllRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
export type RestaurantListState = {
  page: number;
};
export const ListOfAllRestaurantPage = () => {
  const { currentUser, isLoading: isUserLoading } = useGetCurrentUser();
  const [page, setPage] = useState<RestaurantListState>({
    page: 0,
  });
  const { allRestaurantResults, isLoading } = useGetAllRestaurants(page);
  const setPageState = (page: number) => {
    setPage((prev) => ({
      ...prev,
      page,
    }));
  };
  if (isLoading || isUserLoading) {
    return <span>Loading ...</span>;
  }
  if (
    !allRestaurantResults?.data ||
    allRestaurantResults.data.length === 0 ||
    !currentUser
  ) {
    return <span>No results found</span>;
  }

  return (
    <div id="main-content" className="flex flex-col gap-5">
      {allRestaurantResults.data.map((restaurant, index) => (
        <SearchResultsCard
          key={index}
          restaurant={restaurant}
          role={currentUser.role}
        ></SearchResultsCard>
      ))}
      <PaginationSelector
        page={allRestaurantResults.pagination.page}
        pages={allRestaurantResults.pagination.pages}
        onPageChange={setPageState}
      />
    </div>
  );
};
