import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type createUserRequest = {
  auth0Id: string;
  email: string;
};
import { User } from "../types";

//* creating a custom hook
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: createUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });
  return {
    createUser,
    isPending,
    isError,
    isSuccess,
    error,
  };
};

export type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
//* creating a custom hook for updation of user details
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log("The access token is: ", accessToken);
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };
  const {
    mutateAsync: updateUserInfo,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });
  if (isSuccess) {
    toast.success("User profile updated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    updateUserInfo,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
//* creating a custom hook for getting current user details
export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getCurrentUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getCurrentUserRequest,
  });
  if (error) {
    toast.error(error.toString());
  }
  console.log("The current user is: ", currentUser);
  return {
    currentUser,
    isLoading,
    error,
  };
};
