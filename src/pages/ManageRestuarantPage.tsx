import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestuarantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isPending: isUpdatePending } =
    useUpdateMyRestaurant();

  // if (isLoading) {
  //   return <span>Loading ...</span>;
  // }
  const isEditing = !!myRestaurant;
  console.log("isEditing is: ", isEditing);

  return (
    <ManageRestaurantForm
      myRestaurant={myRestaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isEditing ? isUpdatePending : isPending}
    />
  );
};

export default ManageRestuarantPage;
