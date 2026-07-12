/**
 * @fileoverview Form validation schemas — Taste & Tales
 * All schemas use zod. Consumed by react-hook-form via @hookform/resolvers/zod.
 */

import { z } from "zod";

// ─── Shared field definitions ─────────────────────────────────────────────────

const phoneIN = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

const pincode = z
  .string()
  .regex(/^\d{6}$/, "Enter a valid 6-digit pincode");

// ─── Auth schemas ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email:    z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    name:            z.string().min(2, "Name must be at least 2 characters"),
    email:           z.string().email("Enter a valid email address"),
    phone:           phoneIN,
    password:        z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ─── Address schema ───────────────────────────────────────────────────────────

export const addressSchema = z.object({
  fullName:   z.string().min(2, "Name must be at least 2 characters"),
  phone:      phoneIN,
  line1:      z.string().min(5, "Address is too short"),
  line2:      z.string().optional(),
  city:       z.string().min(2, "City is required"),
  state:      z.string().min(2, "State is required"),
  pincode:    pincode,
  isDefault:  z.boolean().optional(),
});

// ─── Checkout schema ──────────────────────────────────────────────────────────

export const checkoutSchema = z.object({
  // Step 1 — Contact
  email:      z.string().email("Enter a valid email address"),
  phone:      phoneIN,
  // Step 2 — Address
  address:    addressSchema,
  // Step 3 — Delivery
  shippingMethod: z.enum(["standard", "express"]).default("standard"),
  // Step 4 — Payment (handled by Razorpay, no sensitive fields here)
  saveAddress: z.boolean().optional(),
});

// ─── Review schema ────────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title:  z.string().min(3, "Title must be at least 3 characters").max(80),
  body:   z.string().min(15, "Tell us a little more (min 15 characters)").max(500),
});

// ─── Corporate enquiry schema ─────────────────────────────────────────────────

export const enquirySchema = z.object({
  // Step 1 — Company
  company:   z.string().min(2, "Company name is required"),
  name:      z.string().min(2, "Your name is required"),
  email:     z.string().email("Enter a valid email address"),
  phone:     phoneIN,
  // Step 2 — Order details
  quantity:  z.number().int().min(10, "Minimum order is 10 boxes"),
  budget:    z.string().min(1, "Please indicate your budget range"),
  eventDate: z.string().min(1, "Please select an event date"),
  // Step 3 — Message
  message:   z.string().optional(),
  customBranding: z.boolean().optional(),
});

// ─── Newsletter schema ────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email("Enter your email to join"),
});

// ─── Contact schema ───────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Enter a valid email address"),
  phone:   phoneIN.optional().or(z.literal("")),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ─── Coupon schema ────────────────────────────────────────────────────────────

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Enter a valid coupon code")
    .max(20)
    .transform((v) => v.toUpperCase().trim()),
});

// ─── Admin — product form schema ──────────────────────────────────────────────

export const adminProductSchema = z.object({
  name:          z.string().min(2),
  slug:          z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  category:      z.string().min(1, "Select a category"),
  price:         z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional(),
  story:         z.string().min(20, "Story must be at least 20 characters"),
  ingredients:   z.array(z.string()).min(1, "Add at least one ingredient"),
  tags:          z.array(z.string()).optional(),
  stock:         z.number().int().min(0),
  isCorporate:   z.boolean().optional(),
});
