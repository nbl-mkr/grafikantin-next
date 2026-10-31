"use client";

import AdaptiveImage from "@/components/common/AdaptiveImage";
import { Link } from "@/i18n/navigation";
import type { UserOrderItem } from "@/lib/data/queries";
import { useLocale, useTranslations } from "next-intl";

type HistoryGroupKey = "today" | "yesterday" | "thisWeek" | "thisMonth" | "earlier";
type OrderStatus = UserOrderItem["status"];

interface Transaction {
  code: string;
  items: UserOrderItem[];
}

const statusKeys: Record<OrderStatus, string> = {
  Menunggu: "statusWaiting",
  Diproses: "statusProcessing",
  Selesai: "statusCompleted",
  Dibatalkan: "statusCancelled",
};

function getJakartaDateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getDateGroup(date: Date, todayKey: string): HistoryGroupKey {
  const dateKey = getJakartaDateKey(date);
  const ageInDays =
    (Date.parse(`${todayKey}T00:00:00Z`) - Date.parse(`${dateKey}T00:00:00Z`)) /
    86_400_000;

  if (ageInDays === 0) return "today";
  if (ageInDays === 1) return "yesterday";
  if (ageInDays > 1 && ageInDays < 7) return "thisWeek";
  if (dateKey.slice(0, 7) === todayKey.slice(0, 7)) return "thisMonth";
  return "earlier";
}

function groupTransactions(orders: UserOrderItem[]): Transaction[] {
  const transactions = new Map<string, UserOrderItem[]>();

  for (const order of orders) {
    const transactionItems = transactions.get(order.kode_transaksi) ?? [];
    transactionItems.push(order);
    transactions.set(order.kode_transaksi, transactionItems);
  }

  return Array.from(transactions, ([code, items]) => ({ code, items }));
}

export default function HistoryOrder({
  orders,
  isLoggedIn,
  currentTime,
}: {
  orders: UserOrderItem[];
  isLoggedIn: boolean;
  currentTime: string;
}) {
  const t = useTranslations("history");
  const locale = useLocale();
  const todayKey = getJakartaDateKey(new Date(currentTime));
  const transactions = groupTransactions(orders);
  const groupedTransactions = new Map<HistoryGroupKey, Transaction[]>();

  for (const transaction of transactions) {
    const date = new Date(transaction.items[0].created_at);
    const groupKey = getDateGroup(date, todayKey);
    const group = groupedTransactions.get(groupKey) ?? [];
    group.push(transaction);
    groupedTransactions.set(groupKey, group);
  }

  const groupOrder: HistoryGroupKey[] = [
    "today",
    "yesterday",
    "thisWeek",
    "thisMonth",
    "earlier",
  ];
  const dateFormatter = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });
  const currencyFormatter = new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-32 text-slate-900 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-left text-2xl font-bold text-gray-900">
        {t("title")}
      </h1>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {!isLoggedIn ? (
          <section className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
            <div className="mb-4 rounded-full bg-slate-50 p-6">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("loginRequiredTitle")}
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-600">
              {t("loginRequiredBody")}
            </p>
            <Link
              href="/auth/login"
              className="mt-6 w-full max-w-sm rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76f51]"
            >
              {t("loginBtn")}
            </Link>
          </section>
        ) : transactions.length === 0 ? (
          <section className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
            <div className="mb-4 rounded-full bg-slate-50 p-6">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a2 2 0 0 1 .707.293l5.414 5.414a2 2 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("emptyTitle")}
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-600">
              {t("emptyBody")}
            </p>
            <Link
              href="/#menu-populer"
              className="mt-6 block w-full max-w-sm rounded-xl border border-gray-100 bg-slate-50 p-4 text-left transition-colors duration-300 hover:bg-slate-100"
            >
              <p className="text-sm font-bold text-gray-900">
                {t("popularTitle")}
              </p>
              <p className="mt-0.5 text-xs text-gray-600">
                {t("popularSubtitle")}
              </p>
            </Link>
            <Link
              href="/order"
              className="mt-6 w-full max-w-sm rounded-xl bg-[#e76f51] py-3 text-center text-sm font-bold text-white transition hover:bg-[#d55f43] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76f51]"
            >
              {t("exploreMenu")}
            </Link>
          </section>
        ) : (
          <div className="w-full divide-y divide-slate-200">
            {groupOrder.map((groupKey) => {
              const group = groupedTransactions.get(groupKey);
              if (!group?.length) return null;

              return (
                <section key={groupKey} className="p-4 sm:p-6">
                  <h2 className="pb-3 text-left text-lg font-semibold text-gray-900">
                    {t(groupKey)}
                  </h2>

                  <ul>
                    {group.map((transaction) => {
                      const firstItem = transaction.items[0];
                      const menuNames = transaction.items
                        .map((item) => item.menu?.nama)
                        .filter((name): name is string => Boolean(name));
                      const standNames = Array.from(
                        new Set(
                          transaction.items
                            .map((item) => item.stand?.nama_stand)
                            .filter((name): name is string => Boolean(name))
                        )
                      );
                      const statuses = Array.from(
                        new Set(transaction.items.map((item) => item.status))
                      );
                      const totalQuantity = transaction.items.reduce(
                        (sum, item) => sum + item.jumlah,
                        0
                      );
                      const totalPrice = transaction.items.reduce(
                        (sum, item) => sum + Number(item.total_harga),
                        0
                      );
                      const image = firstItem.menu?.gambar;

                      return (
                        <li
                          key={transaction.code}
                          className="grid grid-cols-1 gap-4 border-b border-slate-200 py-5 last:border-b-0 sm:grid-cols-[minmax(180px,0.38fr)_minmax(0,1fr)] sm:gap-6"
                        >
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
                            <AdaptiveImage
                              src={image || "/assets/food.jpg"}
                              alt={firstItem.menu?.nama ?? t("unknownMenu")}
                              fill
                              sizes="(max-width: 640px) 36vw, (max-width: 1024px) 38vw, 380px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div className="order-2 sm:order-1">
                                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                  {menuNames[0] ?? t("unknownMenu")}
                                </h3>
                                {transaction.items.length > 1 && (
                                  <p className="mt-1 text-sm text-slate-600">
                                    {t("additionalItems", {
                                      count: transaction.items.length - 1,
                                    })}
                                  </p>
                                )}
                              </div>
                              <p className="order-1 text-lg font-semibold text-[#e76f51] sm:order-2">
                                {currencyFormatter.format(totalPrice)}
                              </p>
                            </div>

                            {standNames.length > 0 && (
                              <p className="mt-2 text-sm text-slate-600">
                                {standNames.join(", ")}
                              </p>
                            )}
                            <p className="mt-2 text-sm text-slate-600">
                              {dateFormatter.format(new Date(firstItem.created_at))}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {t("orderCode")} {transaction.code}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {statuses.map((status) => t(statusKeys[status])).join(", ")}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                              <p className="text-sm text-slate-600">
                                {t("portion", { count: totalQuantity })}
                              </p>
                              <Link
                                href={`/invoice?kode=${encodeURIComponent(transaction.code)}`}
                                className="inline-flex items-center justify-center rounded-xl bg-[#e76f51] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#d55f43] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76f51]"
                              >
                                {t("viewInvoice")}
                              </Link>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
