import { useState } from "react";
import { z } from "zod";

export const AdminSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"),
  mobile: z
    .string()
    .min(10, "Mobile number must be  10 digits")
    .max(10, "Mobile number must be  10 digits")
    .regex(/^\d{10}$/, "Mobile number must contain only digits"),
  email: z.string().email("Invalid email address"),
});

export const TemplateManagerSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),
  description: z.string().optional(),
});

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First Name is required")
      .regex(/^[a-zA-Z\s]+$/, "First Name can only contain letters"),
    lastName: z
      .string()
      .nonempty("Last Name is required")
      .regex(/^[a-zA-Z\s]+$/, "Last Name can only contain letters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const LoginSchema = z
.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});
