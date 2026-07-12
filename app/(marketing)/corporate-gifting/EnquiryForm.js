"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  quantity: z.string().min(1, "Quantity is required"),
  message: z.string().optional(),
});

export default function EnquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: zodResolver(enquirySchema) });

  const onSubmit = async (data) => {
    try {
      const { submitEnquiry } = await import("@/lib/firebase");
      await submitEnquiry(data);
      toast.success("Thank you! Our team will contact you shortly.");
      reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="text-center py-10">
        <p className="font-display text-display-xs text-olive mb-2">Request Received</p>
        <p className="font-sans text-body-md text-gray">
          We&apos;ve received your details and will be in touch within 24 hours.
        </p>
        <Button onClick={() => reset()} variant="secondary" className="mt-6">
          Submit another request
        </Button>
      </div>
    );
  }

  const Input = ({ label, name, type = "text", ...props }) => (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-label-sm text-espresso font-semibold">
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`w-full bg-sand text-espresso border rounded-xl px-4 py-3 font-sans text-body-sm focus:outline-none focus:ring-1 focus:ring-gold ${
          errors[name] ? "border-red-400 focus:border-red-400" : "border-transparent focus:border-gold"
        }`}
        {...props}
      />
      {errors[name] && (
        <span className="font-sans text-body-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full Name" name="name" placeholder="John Doe" />
        <Input label="Company Name" name="company" placeholder="Acme Corp" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Email Address" name="email" type="email" placeholder="john@acme.com" />
        <Input label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXXXXXXX" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-label-sm text-espresso font-semibold">
          Estimated Quantity (Boxes)
        </label>
        <select
          {...register("quantity")}
          className="w-full bg-sand text-espresso border border-transparent rounded-xl px-4 py-3 font-sans text-body-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
        >
          <option value="">Select quantity...</option>
          <option value="25-50">25 - 50</option>
          <option value="51-200">51 - 200</option>
          <option value="201-500">201 - 500</option>
          <option value="500+">500+</option>
        </select>
        {errors.quantity && (
          <span className="font-sans text-body-xs text-red-500">{errors.quantity.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-label-sm text-espresso font-semibold">
          Additional Details (Optional)
        </label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Budget, timeline, specific product requests..."
          className="w-full bg-sand text-espresso border border-transparent rounded-xl px-4 py-3 font-sans text-body-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
        />
      </div>
      <Button type="submit" size="lg" loading={isSubmitting} className="mt-2">
        Request Quote
      </Button>
    </form>
  );
}
