import {
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { useParams } from "react-router-dom";

const ManageRestuarantPage = () => {
  const { restaurantId } = useParams();
  // const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurantResult, isLoading: isRestaurantLoading } =
    useGetRestaurant(restaurantId);
  const { updateRestaurant, isPending: isUpdatePending } =
    useUpdateMyRestaurant();

  const { myRestaurantOrders, isLoading } = useGetMyRestaurantOrders(
    restaurantId || ""
  );

  if (isLoading || isRestaurantLoading) {
    return <span>Loading ...</span>;
  }

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">
          Customize Restaurant
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">
          {myRestaurantOrders?.length} Active Orders
        </h2>
        {myRestaurantOrders?.map((order, index) => (
          <OrderItemCard key={index} order={order} />
        ))}
      </TabsContent>
      <TabsContent
        value="manage-restaurant"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <ManageRestaurantForm
          myRestaurant={restaurantResult}
          onSave={updateRestaurant}
          isLoading={isUpdatePending}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestuarantPage;
