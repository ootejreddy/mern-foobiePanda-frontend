import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant | undefined;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-slate-100">
      <CardHeader>
        <CardTitle className="text-4xl font-bold tracking-tight">
          {restaurant?.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant?.city}, {restaurant?.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant?.cuisines.map((cuisine, index) => (
          <span className="flex" key={index}>
            <span>{cuisine}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
