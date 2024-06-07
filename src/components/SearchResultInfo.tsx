import React from "react";
import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} restaurants found in {city}
        <Link
          to={"/"}
          className="text-sm font-semibold underline cursor-pointer text-blue-500 px-1"
        >
          Change Location
        </Link>
      </span>

      <span>insert sort drop down here</span>
    </div>
  );
};

export default SearchResultInfo;
