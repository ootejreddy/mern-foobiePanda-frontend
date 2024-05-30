import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const ImageSection = () => {
  const { control } = useFormContext();
  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                  value={undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
    </div>
  );
};

export default ImageSection;
