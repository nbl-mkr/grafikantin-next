"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      icons={{
        success: (
          <svg
            className="size-5 shrink-0 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ),
        error: (
          <svg
            className="size-5 shrink-0 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ),
        info: (
          <svg
            className="size-5 shrink-0 text-[#e76f51]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        ),
        warning: (
          <svg
            className="size-5 shrink-0 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border group-[.toaster]:border-gray-100 group-[.toaster]:shadow-[0_10px_30px_rgba(0,0,0,0.08)] group-[.toaster]:rounded-2xl font-sans px-4 py-3.5 gap-3 items-center",
          title: "text-sm font-semibold text-gray-900 tracking-tight",
          description: "text-xs text-gray-600 mt-0.5 leading-relaxed",
          actionButton:
            "group-[.toast]:bg-[#e76f51] group-[.toast]:text-white text-xs font-semibold rounded-xl px-3 py-1.5 transition hover:bg-[#d55f43] shadow-sm",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700 text-xs font-medium rounded-xl px-3 py-1.5 transition hover:bg-gray-200",
          success:
            "!bg-white !text-gray-900 !border-gray-100 ring-1 ring-emerald-500/15",
          error:
            "!bg-white !text-gray-900 !border-gray-100 ring-1 ring-rose-500/15",
          info:
            "!bg-white !text-gray-900 !border-gray-100 ring-1 ring-[#e76f51]/15",
          warning:
            "!bg-white !text-gray-900 !border-gray-100 ring-1 ring-amber-500/15",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
