import { useGetCurrentUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUserInfo, isPending } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser();
  if (isGetLoading) {
    return <span>Loading ...</span>;
  }
  if (!currentUser) {
    return <span>unable to load user profile</span>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUserInfo}
      isLoading={isPending}
    />
  );
};

export default UserProfilePage;
