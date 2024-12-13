export type UserRole = "ADMIN" | "USER" | "DELIVERY";

export type User = {
  _id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  dob?: Date;
  addressLine1: string;
  city: string;
  country: string;
  role: UserRole;
};

export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
  calories: string;
  description: string;
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
