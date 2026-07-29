"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Input, FormField, Select } from "@/components/ui/Input";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, couponDiscount, clearCart } = useCartStore();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Process the order
    toast.success("Order placed successfully! Redirecting...");
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 text-center">
        <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mb-5">
          <ShoppingBag size={32} className="text-brown/30" />
        </div>
        <p className="font-display text-display-xs text-espresso mb-2">
          Your box is empty.
        </p>
        <p className="font-sans text-body-sm text-brown/60 mb-6">
          Fill it with something worth remembering.
        </p>
        <Button href="/shop" size="sm">
          Browse the Store
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-beige min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="mb-8">
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-brown hover:text-olive transition-colors font-sans text-body-sm font-semibold">
            <ArrowLeft size={16} /> Back to Box
          </button>
          <h1 className="font-display text-display-md text-espresso mt-4">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <div className="flex-1 bg-ivory rounded-3xl p-8 sm:p-10 shadow-card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Info */}
              <section>
                <h2 className="font-sans text-body-lg font-semibold text-espresso mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="First Name" required error={errors.firstName?.message}>
                    <Input {...register("firstName", { required: "First name is required" })} placeholder="Your first name" />
                  </FormField>
                  <FormField label="Last Name" required error={errors.lastName?.message}>
                    <Input {...register("lastName", { required: "Last name is required" })} placeholder="Your last name" />
                  </FormField>
                  <FormField label="Email Address" className="md:col-span-2" required error={errors.email?.message}>
                    <Input type="email" {...register("email", { required: "Email is required" })} placeholder="you@example.com" />
                  </FormField>
                  <FormField label="Phone Number" className="md:col-span-2" required error={errors.phone?.message}>
                    <Input type="tel" {...register("phone", { required: "Phone is required" })} placeholder="+91 xxxxx xxxxx" />
                  </FormField>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="font-sans text-body-lg font-semibold text-espresso mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Street Address" className="md:col-span-2" required error={errors.address?.message}>
                    <Input {...register("address", { required: "Address is required" })} placeholder="123 Main St, Apt 4B" />
                  </FormField>
                  <FormField label="City" required error={errors.city?.message}>
                    <Input {...register("city", { required: "City is required" })} placeholder="City" />
                  </FormField>
                  <FormField label="State" required error={errors.state?.message}>
                    <Select
                      {...register("state", { required: "State is required" })}
                      options={[
                        { value: "TN", label: "Tamil Nadu" },
                        { value: "KA", label: "Karnataka" },
                        { value: "MH", label: "Maharashtra" },
                        { value: "DL", label: "Delhi" }
                      ]}
                      placeholder="Select State"
                    />
                  </FormField>
                  <FormField label="PIN Code" required error={errors.pincode?.message}>
                    <Input {...register("pincode", { required: "PIN Code is required" })} placeholder="600001" />
                  </FormField>
                </div>
              </section>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Place Order — {formatPrice(total)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-ivory rounded-3xl p-8 shadow-card sticky top-32">
              <h2 className="font-sans text-body-lg font-semibold text-espresso mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-sand">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={20} className="text-brown/30" />
                        </div>
                      )}
                      <span className="absolute -top-2 -right-2 bg-gold text-espresso text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-body-sm text-espresso line-clamp-1">{item.name}</p>
                      {item.variant && <p className="font-sans text-body-xs text-brown/60">{item.variant}</p>}
                    </div>
                    <p className="font-display text-body-sm font-bold text-espresso shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-sans text-body-sm text-brown/70">Subtotal</span>
                  <span className="font-sans text-body-sm font-semibold text-espresso">{formatPrice(subtotal)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="font-sans text-body-sm text-brown/70">Discount</span>
                    <span className="font-sans text-body-sm font-semibold text-sage">−{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-sans text-body-sm text-brown/70">Shipping</span>
                  <span className="font-sans text-body-sm font-semibold text-espresso">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-sand mt-4">
                  <span className="font-display text-body-lg font-bold text-espresso">Total</span>
                  <span className="font-display text-display-xs font-bold text-olive">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
