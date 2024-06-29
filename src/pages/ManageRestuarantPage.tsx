import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestuarantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isPending: isUpdatePending } =
    useUpdateMyRestaurant();

  const { myRestaurantOrders, isLoading } = useGetMyRestaurantOrders();

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  const isEditing = !!myRestaurant;
  console.log("isEditing is: ", isEditing);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
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
          myRestaurant={myRestaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isEditing ? isUpdatePending : isPending}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestuarantPage;
