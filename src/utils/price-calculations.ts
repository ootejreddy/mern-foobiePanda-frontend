import { CartItem, Restaurant } from "@/types";

export const getTotalCost = (cartItems: CartItem[], restaurant: Restaurant) => {
  const totalInPence = cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );
  const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
  return Number((totalWithDelivery / 100).toFixed(2));
};
