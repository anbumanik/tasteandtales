"use client";

/**
 * @fileoverview Input, Textarea, Select atoms — Taste & Tales
 * All form fields share the same brand treatment: sand background,
 * gold focus ring, warm placeholder text.
 */

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ─── Shared base styles ───────────────────────────────────────────────────────

const baseInput = [
  "w-full bg-sand text-espresso",
  "border border-sand rounded-xl",
  "px-4 py-3 font-sans text-body-md",
  "placeholder:text-brown/40",
  "transition-colors duration-200",
  "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

// ─── FormField wrapper ────────────────────────────────────────────────────────

/**
 * Wraps a form field with label and error message.
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.error]
 * @param {string} [props.hint]
 * @param {string} [props.htmlFor]
 * @param {boolean} [props.required]
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function FormField({
  label,
  error,
  hint,
  htmlFor,
  required,
  className,
  children,
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-sans text-body-sm font-semibold text-espresso"
        >
          {label}
          {required && (
            <span className="text-gold ml-1" aria-label="required">*</span>
          )}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-body-xs text-brown/70">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-body-xs text-red-600 font-sans">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.leadingIcon]
 * @param {React.ReactNode} [props.trailingIcon]
 * @param {boolean} [props.hasError]
 * @param {string}  [props.className]
 */
export const Input = forwardRef(function Input(
  { leadingIcon, trailingIcon, hasError, className, ...rest },
  ref
) {
  if (leadingIcon || trailingIcon) {
    return (
      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="absolute left-3.5 text-brown/60 pointer-events-none" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            baseInput,
            leadingIcon && "pl-10",
            trailingIcon && "pr-10",
            hasError && "border-red-400 focus:border-red-400 focus:ring-red-400",
            className
          )}
          {...rest}
        />
        {trailingIcon && (
          <span className="absolute right-3.5 text-brown/60 pointer-events-none" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={cn(
        baseInput,
        hasError && "border-red-400 focus:border-red-400 focus:ring-red-400",
        className
      )}
      {...rest}
    />
  );
});

Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {number} [props.rows=4]
 * @param {boolean} [props.hasError]
 * @param {string}  [props.className]
 */
export const Textarea = forwardRef(function Textarea(
  { rows = 4, hasError, className, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        baseInput,
        "resize-vertical min-h-[100px]",
        hasError && "border-red-400 focus:border-red-400 focus:ring-red-400",
        className
      )}
      {...rest}
    />
  );
});

Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options
 * @param {string} [props.placeholder]
 * @param {boolean} [props.hasError]
 * @param {string} [props.className]
 */
export const Select = forwardRef(function Select(
  { options = [], placeholder, hasError, className, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        baseInput,
        "appearance-none cursor-pointer",
        "bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236D4C41' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")] bg-[right_0.75rem_center] bg-[length:1.25rem] bg-no-repeat pr-10",
        hasError && "border-red-400 focus:border-red-400 focus:ring-red-400",
        className
      )}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.className]
 */
export const Checkbox = forwardRef(function Checkbox(
  { label, className, ...rest },
  ref
) {
  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer group", className)}>
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-2 border-sand bg-sand",
          "checked:bg-olive checked:border-olive",
          "focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1",
          "accent-olive cursor-pointer"
        )}
        {...rest}
      />
      {label && (
        <span className="font-sans text-body-sm text-gray group-hover:text-espresso transition-colors">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Input;
