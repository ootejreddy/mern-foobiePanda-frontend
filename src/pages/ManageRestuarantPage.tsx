import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestuarantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();

  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isPending} />
  );
};

export default ManageRestuarantPage;
