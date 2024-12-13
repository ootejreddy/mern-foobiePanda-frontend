import { Order } from "@/types";
import { Separator } from "./ui/separator";
import { User } from "../types";

type Props = {
  order: Order;
  deliveryAgents: User[];
};

const OrderStatusDetail = ({ order, deliveryAgents }: Props) => {
  console.log("Total Amount:", order.totalAmount, typeof order.totalAmount);
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>{order.deliveryDetails.addressLine1}</span>
        <span>{order.deliveryDetails.city}</span>
      </div>

      {/* {deliveryAgents.length > 0 && (
        <>
          <Separator />
          <div className="flex flex-col">
            <span className="font-bold">Delivering By:</span>
            <span>{deliveryAgents[0].name}</span>
            <span>{deliveryAgents[0].addressLine1}</span>
          </div>
        </>
      )} */}

      <div className="flex flex-col ">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>${(Number(order.totalAmount) / 100 || 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
