"use client";

import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  phone: z.string().min(10, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),

  preferredLocation: z.string().min(1, "Preferred location is required"),
  personalType: z.string().min(1, "Personal type is required"),
  loveLanguage: z.string().min(1, "Love language is required"),
  lifestyle: z.string().min(1, "Lifestyle is required"),
  spouseCountry: z.string().min(1, "Spouse country is required"),

  agree: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms and conditions",
    }),
  }),
});

export default function SignUp() {
  const [step, setStep] = useState(1);
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
      phone: "",
      country: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      preferredLocation: "",
      personalType: "",
      loveLanguage: "",
      lifestyle: "",
      spouseCountry: "",
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
            "phone",
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

  const onSubmit = methods.handleSubmit((data) => {
    console.log("Final form:", data);
  });

  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = methods;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center px-6">
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
          <form onSubmit={onSubmit} className="space-y-4 text-left">
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
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
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
                      {...register("phone")}
                      placeholder="Phone Number"
                      type="tel"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <Select onValueChange={(v) => setValue("country", v)}>
                      <SelectTrigger>
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
                    {...register("preferredLocation")}
                    placeholder="Preferred Location"
                  />
                  {errors.preferredLocation && (
                    <p className="text-red-500 text-sm">
                      {errors.preferredLocation.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input
                    {...register("personalType")}
                    placeholder="Personal Type"
                  />
                  {errors.personalType && (
                    <p className="text-red-500 text-sm">
                      {errors.personalType.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input
                    {...register("loveLanguage")}
                    placeholder="Love Language"
                  />
                  {errors.loveLanguage && (
                    <p className="text-red-500 text-sm">
                      {errors.loveLanguage.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Input {...register("lifestyle")} placeholder="Lifestyle" />
                  {errors.lifestyle && (
                    <p className="text-red-500 text-sm">
                      {errors.lifestyle.message}
                    </p>
                  )}
                </span>

                <span className=" block mb-3">
                  <Select onValueChange={(v) => setValue("spouseCountry", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Spouse Preferred Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryList.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.spouseCountry && (
                    <p className="text-red-500 text-sm">
                      {errors.spouseCountry.message}
                    </p>
                  )}
                </span>

                {/* ✅ Terms & Conditions Checkbox with Modal */}
                <span className="flex items-start gap-2 mb-3">
                  <Controller
                    name="agree"
                    control={control}
                    rules={{
                      required: "You must accept the terms and conditions",
                    }}
                    render={({ field }) => (
                      <>
                        <Checkbox
                          id="agree"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="agree"
                          className="text-sm text-gray-700"
                        >
                          I agree to the{" "}
                          <Dialog>
                            <DialogTrigger className="text-pink-600 underline cursor-pointer hover:text-pink-800">
                              Terms and Conditions
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-2xl max-h-[70vh] overflow-y-auto rounded-lg p-6 sm:mx-auto sm:my-8 sm:rounded-xl sm:p-8">
                              <DialogTitle className="text-xl font-bold text-pink-600 mb-4">
                                Terms and Conditions
                              </DialogTitle>
                              <TermsAndConditions />
                            </DialogContent>
                          </Dialog>
                        </label>
                      </>
                    )}
                  />
                </span>
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
                  Submit
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
