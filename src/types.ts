export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "Delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    name: string;
    city: string;
    addressLine1: string;
    email: string;
    country: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};
