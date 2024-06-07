import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

export const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  //* here initially the city can be undefined because of react rendering life cycle
  const { city } = useParams();
  const { restaurantResults, isLoading } = useSearchRestaurant(
    searchState,
    city
  );

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page, //shorthand form of page:page
    }));
  };

  /*
   * here we're setting page to 1 because after every search query change we need to display results from page1
   */
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  //* we are copying the previous state because we don't need to rerender the checklist, cuisines option, so on...
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  if (!restaurantResults?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo
          total={restaurantResults.pagination.total}
          city={city}
        />
        {restaurantResults.data.map((restaurant, index) => (
          <SearchResultsCard
            key={index}
            restaurant={restaurant}
          ></SearchResultsCard>
        ))}
        <PaginationSelector
          page={restaurantResults.pagination.page}
          pages={restaurantResults.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
