"use client";
import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { updateOrderStatusAction, type OrderStatus } from "@/lib/data/mutations";

export interface OrderView {
  id: string;
  customer: string;
  phone: string;
  date: string;
  createdAt: string;
  status: "Menunggu" | "Diproses" | "Selesai" | "Dibatalkan";
  stand: string;
  menu: string;
  jumlah: number;
  metode: string;
  total: number;
}

type StatusFilter = "all" | "Menunggu" | "Diproses" | "Selesai" | "Dibatalkan";
type SortField = "id" | "customer" | "tanggal" | "status" | "menu" | "jumlah" | "total";
type SortOrder = "asc" | "desc";

const statusStyles: Record<string, string> = {
  Selesai: "text-emerald-600",
  Diproses: "text-blue-600",
  Menunggu: "text-amber-600",
  Dibatalkan: "text-red-600",
};

function SortHeader({
  label,
  field,
  activeField,
  order,
  onSort,
  align = "left",
}: {
  label: string;
  field: SortField;
  activeField: SortField | null;
  order: SortOrder;
  onSort: (f: SortField) => void;
  align?: "left" | "right";
}) {
  return (
    <th className={`px-4 py-3 whitespace-nowrap ${align === "right" ? "text-right" : ""}`}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 hover:text-gray-900"
      >
        {label}
        <span className="text-xs text-gray-600">
          {activeField === field ? (order === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}

export default function OrderTable({ orders = [] }: { orders?: OrderView[] }) {
  const t = useTranslations("dashboard.orders");
  const locale = useLocale();
  const tOverview = useTranslations("dashboard.overview");
  const tCommon = useTranslations("dashboard.common");
  const tEnum = useTranslations("dashboard.enums.orderStatus");

  const statusTabs: { label: string; value: StatusFilter }[] = [
    { label: tOverview("filterAll"), value: "all" },
    { label: tEnum("Menunggu"), value: "Menunggu" },
    { label: tEnum("Diproses"), value: "Diproses" },
    { label: tEnum("Selesai"), value: "Selesai" },
    { label: tEnum("Dibatalkan"), value: "Dibatalkan" },
  ];

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredOrders = useMemo(() => {
    const result = orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.menu.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
    if (sortField) {
      result.sort((a, b) => {
        let valA: string | number;
        let valB: string | number;
        switch (sortField) {
          case "tanggal":
            valA = new Date(a.createdAt || a.date).getTime();
            valB = new Date(b.createdAt || b.date).getTime();
            break;
          case "jumlah":
          case "total":
            valA = a[sortField];
            valB = b[sortField];
            break;
          default:
            valA = String(a[sortField]).toLowerCase();
            valB = String(b[sortField]).toLowerCase();
        }
        if (typeof valA === "string" && typeof valB === "string") {
          const comp = valA.localeCompare(valB);
          return sortOrder === "asc" ? comp : -comp;
        }
        return sortOrder === "asc"
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
    }
    return result;
  }, [orders, statusFilter, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const pageWindowStart = Math.max(1, Math.min(validCurrentPage - 4, totalPages - 9));
  const visiblePages = Array.from(
    { length: Math.min(10, totalPages) },
    (_, index) => pageWindowStart + index
  );
  const paginatedOrders = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, validCurrentPage, itemsPerPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder(field === "tanggal" ? "desc" : "asc");
    }
  };

  const router = useRouter();
  const tErrors = useTranslations("dashboard.errors");
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<OrderView | null>(null);

  const handleRefresh = () => {
    router.refresh();
  };

  const handleStatusChange = async (order: OrderView, statusBaru: OrderStatus) => {
    const key = order.id;
    setBusyKey(key);
    const res = await updateOrderStatusAction(order.id, order.status, statusBaru);
    if (!res.ok) {
      alert(res.error ?? tErrors(res.errorKey ?? "updateOrderStatusFailed"));
    }
    setBusyKey(null);
    router.refresh();
  };

  const handleCancelOrder = () => {
    if (!cancelTarget) return;
    setCancelTarget(null);
    handleStatusChange(cancelTarget, "Dibatalkan");
  };

  return (
    <>
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-medium text-gray-900">{t("listTitle")}</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleRefresh}
            title={t("refresh")}
            aria-label={t("refresh")}
            className="grid h-9 w-9 shrink-0 place-content-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#62748e] hover:text-[#62748e] focus:outline-none focus:ring-2 focus:ring-[#62748e]/30 sm:h-9"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-9 w-full rounded-md border border-gray-200 pl-3 pr-9 text-sm text-gray-900 focus:border-[#62748e] focus:outline-none sm:w-56"
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 grid w-8 place-content-center text-gray-600">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </span>
          </div>
          <div className="inline-flex h-9 items-center rounded-md border border-gray-200 p-1 text-xs font-medium">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.value);
                  setCurrentPage(1);
                }}
                className={`h-full rounded-sm px-2.5 flex items-center justify-center transition-colors ${
                  statusFilter === tab.value ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead>
            <tr className="text-left font-medium text-gray-600">
              <th className="px-4 py-3 whitespace-nowrap w-12 text-center">#</th>
              <SortHeader label={t("colId")} field="id" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colCustomer")} field="customer" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colDate")} field="tanggal" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colStatus")} field="status" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colItem")} field="menu" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colQty")} field="jumlah" activeField={sortField} order={sortOrder} onSort={handleSort} />
              <SortHeader label={t("colTotal")} field="total" activeField={sortField} order={sortOrder} onSort={handleSort} align="right" />
              <th className="px-4 py-3 whitespace-nowrap text-right">{t("colAksi")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => {
                const rowNumber = (validCurrentPage - 1) * itemsPerPage + index + 1;
                return (
                  <tr key={`${order.id}-${index}`} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-center text-xs font-semibold text-gray-600">{rowNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex text-xs font-semibold ${statusStyles[order.status] || "text-gray-600"}`}>
                        {tEnum(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600" title={order.stand}>{order.menu}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{order.jumlah}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-gray-600">
                      {new Intl.NumberFormat(locale === "en" ? "en-US" : "id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(order.total)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      {order.status === "Menunggu" || order.status === "Diproses" ? (
                        <div className="inline-flex items-center justify-end gap-1.5">
                          {order.status === "Menunggu" ? (
                            <button
                              type="button"
                              disabled={busyKey === order.id}
                              onClick={() => handleStatusChange(order, "Diproses")}
                              className="rounded-md bg-[#e76f51] px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {t("btnAccept")}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busyKey === order.id}
                              onClick={() => handleStatusChange(order, "Selesai")}
                              className="rounded-md bg-[#e76f51] px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-[#d55f43] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {t("btnComplete")}
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={busyKey === order.id}
                            onClick={() => setCancelTarget(order)}
                            className="rounded-md border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {t("btnCancel")}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-gray-600" colSpan={9}>
                  {t("noOrders")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span>{tCommon("show")}</span>
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-8 rounded-lg border border-gray-200 bg-white px-2.5 text-xs text-gray-700 hover:border-[#62748e] focus:outline-none transition-colors"
            >
              <span>{itemsPerPage}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3.5 text-gray-600 group-hover:text-[#62748e] group-hover:rotate-180 transition-transform duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              role="menu"
              className="absolute bottom-full left-0 mb-1 w-16 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
            >
              <div className="py-1">
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setItemsPerPage(num);
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-gray-50 hover:text-[#e76f51] ${
                      itemsPerPage === num ? "font-semibold text-[#e76f51] bg-blue-50/50" : "font-normal text-gray-600"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <span>{tCommon("ofData", { count: filteredOrders.length })}</span>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-1 sm:w-auto">
          <button
            type="button"
            disabled={validCurrentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 transition-colors"
            aria-label={tCommon("prevPage")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="flex max-w-full flex-wrap justify-center gap-1">
            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 rounded-md border text-xs font-medium transition-colors ${
                  validCurrentPage === page
                    ? "border-[#e76f51] bg-[#e76f51] text-white"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={validCurrentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 transition-colors"
            aria-label={tCommon("nextPage")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900">
              {t("cancelOrderTitle")}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {t("cancelOrderBody", { name: cancelTarget.id })}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {tCommon("cancel")}
              </button>
              <button
                type="button"
                onClick={handleCancelOrder}
                className="rounded-lg bg-[#e76f51] px-4 py-2 text-sm font-medium text-white hover:bg-[#d55f43] transition-colors"
              >
                {t("btnCancelConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}