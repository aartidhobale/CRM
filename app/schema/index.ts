import { useState } from "react";
import { z } from "zod";

export const AdminSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),

  mobile: z
    .string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number"),
});

export const SignUpSchema = z.object({
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
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});
