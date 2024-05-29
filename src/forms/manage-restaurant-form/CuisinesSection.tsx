import {
  FormDescription,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cuisineList } from "../../../config/restaurant-options-config";
import CuisineCheckBox from "./CuisineCheckBox";
const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <div>
        <FormField
          control={control}
          name="cuisines"
          render={({ field }) => (
            <FormItem>
              <div className="grid md:grid-cols-5 gap-1">
                {cuisineList.map((item, index) => (
                  <CuisineCheckBox
                    key={index}
                    cuisineItem={item}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
    </div>
  );
};

export default CuisinesSection;
