import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function OrderStatusPage() {
  const { ordersResult, isLoading } = useGetMyOrders();
  if (isLoading) {
    return "Loading...";
  }
  if (!ordersResult || ordersResult.length === 0) {
    return "No orders found";
  }
  return (
    <div className="space-y-10">
      {ordersResult.map((order, index) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={index}>
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio>
              <img
                src={order.restaurant.imageUrl}
                alt="restaurantImage"
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
