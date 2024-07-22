import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

function CreateRestaurantPage() {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isPending} />
    </div>
  );
}

export default CreateRestaurantPage;
