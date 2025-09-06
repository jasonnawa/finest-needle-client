"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "sonner";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TermsAndConditions from "@/components/TermsAndConditions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "countries-list";
import { registerUser } from "@/api/users/userService";
import PaypalPayment from "@/components/paypal-modal";

const countryList = Object.values(countries).map((c) => c.name);
const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(18, "You must be at least 18"),
  gender: z.string().min(1, "Gender is required"),
  location: z.string().min(1, "Location is required"),
  religion: z.string().min(1, "Religion is required"),
  goals: z.string().min(1, "Relationship goals are required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),

  profileImage: z
  .any()
  .refine((file) => file instanceof File || file?.[0] instanceof File, {
    message: "Image is required",
  }),

  preferenceLocation: z.string().min(1, "Preferred location is required"),
  preferenceType: z.string().min(1, "Personal type is required"),
  preferenceLoveLanguage: z.string().min(1, "Love language is required"),
  preferenceLifestyle: z.string().min(1, "preferenceLifestyle is required"),
  preferenceCountry: z.string().min(1, "Spouse country is required"),

  agree: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms and conditions",
    }),
  }),
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm({
    resolver: zodResolver(personalSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      gender: "",
      location: "",
      religion: "",
      goals: "",
      phoneNumber: "",
      country: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      preferenceLocation: "",
      preferenceType: "",
      preferenceLoveLanguage: "",
      preferenceLifestyle: "",
      preferenceCountry: "",
      agree: undefined,
    },
  });

  const onNext = async () => {
    const valid = await methods.trigger(
      step === 1
        ? [
          "firstName",
          "lastName",
          "email",
          "age",
          "gender",
          "location",
          "religion",
          "goals",
          "phoneNumber",
          "country",
          "address",
          "city",
          "state",
          "postalCode",
        ]
        : []
    );
    if (valid) setStep((s) => s + 1);
  };

  const onBack = () => setStep((s) => s - 1);

  const onSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const fileList = formData.profileImage;
      const imageFile = fileList?.[0];
  
      if (!imageFile) {
        toast.error("Profile image is required", { duration: 3000 });
        return;
      }
  
      // Build FormData
      const formPayload = new FormData();
  
      for (const key in formData) {
        if (key !== "profileImage") {
          formPayload.append(key, formData[key]);
        }
      }
  
      formPayload.append("profileImage", imageFile);
      //validate user data for payment
      const response = await registerUser(formPayload);
      if(!response.status){
        //error toast
        toast.error(response.message || 'An error has occurred',{
          duration: 3000,
        })
      }else{
        // redirect user to stripe payment
        // await startCheckout(response.data._id, 5000, 'Registeration', `${FRONTEND}/payment/success`,  `${FRONTEND}/payment/failure`)
        //show payment model
         setStep((s) => s + 1);
      }
    } catch (err) {
      console.error('Registration failed', err);
      toast.error( 'An error has occurred',{
        duration: 3000,
      })
    }finally{
      setIsLoading(false)
    }
  };

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = methods;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const fileRegister = register("profileImage", {
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    },
  });
  
  return (
    <>
    {step === 1 || step === 2?
    (<div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center px-6">
      <div className="bg-white/70 backdrop-blur p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          {step === 1
            ? "Step 1: Personal Details"
            : "Step 2: Spouse Preferences"}
        </h1>
        <p className="text-gray-700 text-md mb-6">
          {step === 1
            ? "Tell us a bit about yourself."
            : "What are you looking for in a partner?"}
        </p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 text-left">
            {step === 1 && (
              <>
                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      {...register("firstName")}
                      placeholder="First Name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input {...register("lastName")} placeholder="Last Name" />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
      <p className="mb-2 font-medium">Profile Image</p>

      <label
  htmlFor="profileImage"
  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-pink-500 transition overflow-hidden mb-2"
>
  {previewUrl ? (
    <img
      src={previewUrl}
      alt="Image Preview"
      className="object-cover w-full h-full"
    />
  ) : (
    <>
      <span className="text-gray-500">Click to select an image</span>
      <span className="text-xs text-gray-400">(Only image files allowed)</span>
    </>
  )}

  <Input
    id="profileImage"
    type="file"
    accept="image/*"
    {...fileRegister}
    className="hidden"
  />
</label>


      {errors.profileImage && (
        <p className="text-sm text-red-500 mt-1">
          {String(errors.profileImage.message)}
        </p>
      )}
    </div>


                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      {...register("age")}
                      placeholder="Age"
                      type="number"
                    />
                    {errors.age && (
                      <p className="text-red-500 text-sm">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Select onValueChange={(v) => setValue("gender", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <Input {...register("location")} placeholder="Location" />
                    {errors.location && (
                      <p className="text-red-500 text-sm">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input {...register("religion")} placeholder="Religion" />
                    {errors.religion && (
                      <p className="text-red-500 text-sm">
                        {errors.religion.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Textarea
                    {...register("goals")}
                    placeholder="Relationship Goals"
                  />
                  {errors.goals && (
                    <p className="text-red-500 text-sm">
                      {errors.goals.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      {...register("phoneNumber")}
                      placeholder="Phone Number"
                      type="tel"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Select onValueChange={(v) => setValue("country", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryList.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-red-500 text-sm">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <Input {...register("address")} placeholder="Address" />
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input {...register("city")} placeholder="City" />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      {...register("state")}
                      placeholder="State / Province"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      {...register("postalCode")}
                      placeholder="Postal / Zip Code"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <span className=" block mb-3">
                  <Input
                    {...register("preferenceLocation")}
                    placeholder="Preferred Location"
                  />
                  {errors.preferenceLocation && (
                    <p className="text-red-500 text-sm">
                      {errors.preferenceLocation.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input
                    {...register("preferenceType")}
                    placeholder="Personal Type"
                  />
                  {errors.preferenceType && (
                    <p className="text-red-500 text-sm">
                      {errors.preferenceType.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input
                    {...register("preferenceLoveLanguage")}
                    placeholder="Love Language"
                  />
                  {errors.preferenceLoveLanguage && (
                    <p className="text-red-500 text-sm">
                      {errors.preferenceLoveLanguage.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input {...register("preferenceLifestyle")} placeholder="Lifestyle" />
                  {errors.preferenceLifestyle && (
                    <p className="text-red-500 text-sm">
                      {errors.preferenceLifestyle.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Select onValueChange={(v) => setValue("preferenceCountry", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryList.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.preferenceCountry && (
                    <p className="text-red-500 text-sm">
                      {errors.preferenceCountry.message}
                    </p>
                  )}
                </span>

          {/* ✅ Terms & Conditions Checkbox with Inline Scroll Area */}
<span className="flex flex-col gap-2 mb-3">
  {/* Inline scrollable terms box */}
  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-4 text-sm text-gray-700">
    <TermsAndConditions />
  </div>
</span>


<div className="flex items-start gap-2">
    <Controller
      name="agree"
      control={control}
      rules={{
        required: "You must accept the terms and conditions",
      }}
      render={({ field }) => (
        <Checkbox
          id="agree"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />
    <label htmlFor="agree" className="text-sm text-gray-700">
      I agree to the Terms and Conditions
    </label>
  </div>

  {errors.agree && (
    <p className="text-red-500 text-sm">{errors.agree.message}</p>
  )}

              </>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" onClick={onBack}>
                  Back
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={onNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={!!errors.agree}>
                  {isLoading? 'loading..': 'Make Payment' }
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>)
  :(
     step === 3 && <PaypalPayment />
  )}

    </>
  );
}
