"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface ImageUploadFieldProps {
  id: string;
  preview: string | null;
  onSelect: (file: File | null) => void;
}

export default function ImageUploadField({ id, preview, onSelect }: ImageUploadFieldProps) {
  const t = useTranslations("dashboard.upload");
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (file: File | undefined | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    onSelect(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    onSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      {preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="group relative mt-1 flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-200 focus-within:border-[#e76f51] focus:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
            <span className="rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
              {t("change")}
            </span>
          </div>
          <button
            type="button"
            onClick={clear}
            aria-label={t("remove")}
            className="absolute right-2 top-2 grid size-7 place-content-center rounded-full bg-white/90 text-gray-600 shadow transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={`mt-1 flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border text-center transition-colors focus:outline-none ${
            dragging
              ? "border-[#e76f51] bg-[#e76f51]/5"
              : "border-gray-200 bg-gray-50/50 hover:border-[#e76f51] focus-visible:border-[#e76f51]"
          }`}
        >
          <span className="grid size-10 place-content-center rounded-full bg-gray-100 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </span>
          <span className="text-sm font-medium text-gray-900">{t("title")}</span>
          <span className="text-xs text-gray-600">
            {t("hint")}
            <span className="font-medium text-[#e76f51]">{t("browse")}</span>
          </span>
        </div>
      )}
    </>
  );
}