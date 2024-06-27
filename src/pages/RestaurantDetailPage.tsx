import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { CartItem, MenuItemType } from "../types";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { Card, CardFooter } from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetCurrentUser } from "@/api/MyUserApi";

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantResult, isLoading, error } = useGetRestaurant(restaurantId);
  const { currentUser, isLoading: isGetLoadingUser } = useGetCurrentUser();
  const { createCheckoutSession, isPending: isCheckoutLoading } =
    useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storageCartItems = sessionStorage.getItem(
      `cartItems-${restaurantId}`
    );
    return storageCartItems ? JSON.parse(storageCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      //* check the item is already in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      //* if item is in cart, update the quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      //* if items not in cart, add to the cart
      else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );
      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    console.log("userFormData: ", userFormData);
    if (!restaurantResult) {
      return;
    }
    if (isGetLoadingUser) {
      return <h1>Loading...</h1>;
    }
    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        quantity: item.quantity.toString(),
      })),
      restaurantId: restaurantResult._id,
      deliveryDetails: {
        email: currentUser?.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
    };
    const data = await createCheckoutSession(checkoutData);
    console.log("The checkout session data is: ", data);
    window.location.href = data.url;
  };

  if (isLoading) {
    return <div>Getting Restaurant Details</div>;
  }
  if (error || !restaurantResult) {
    return <div>something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurantResult?.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-3">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantResult} />
          <span className="text-3xl font-bold tracking-tight">Menu</span>
          {restaurantResult?.menuItems.map((menuItem, index) => (
            <MenuItem
              menuItem={menuItem}
              key={index}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurantResult}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                onCheckout={onCheckout}
                disabled={cartItems.length === 0}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
