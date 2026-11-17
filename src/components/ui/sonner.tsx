"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:border-gray-100 group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-gray-500 text-xs",
          actionButton:
            "group-[.toast]:bg-[#e76f51] group-[.toast]:text-white text-xs font-medium rounded-lg",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 text-xs font-medium rounded-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
