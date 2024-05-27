import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "../../types";
import { useEffect } from "react";
const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(2, "name is required").max(50),
  addressLine1: z.string().min(2, "address Line 1 is required").max(100),
  city: z.string().min(2, "city is required").max(100),
  country: z.string().min(2, "country is required").max(100),
});
type userFormData = z.infer<typeof formSchema>;
type props = {
  currentUser: User;
  onSave: (userProfileData: userFormData) => void;
  isLoading: boolean;
};
const UserProfileForm = ({ onSave, isLoading, currentUser }: props) => {
  console.log("The current user is: ", JSON.stringify(currentUser));

  const form = useForm<userFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="bg-gray-50 py-4 rounded-lg space-y-4 md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form</h2>
          <FormDescription>
            View and change your profile information here...
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>address Line 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="address"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New York"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="US" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoading ? (
          <LoadingButton></LoadingButton>
        ) : (
          <Button type="submit" className="bg-orange-500">
            submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
