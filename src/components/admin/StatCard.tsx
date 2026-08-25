interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  period: string;
}

export default function StatCard({ label, value, change, positive, period }: StatCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div
        className={`inline-flex gap-1.5 self-end rounded-lg px-2 py-1 text-xs font-semibold ${
          positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        }`}
      >
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {positive ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          )}
        </svg>

        <span className="sr-only">{positive ? "Peningkatan: " : "Penurunan: "}</span>
        <span>{change}</span>
      </div>

      <div>
        <strong className="block text-sm font-medium text-gray-500">{label}</strong>

        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">{value}</span>
          <span className="text-xs text-gray-400">{period}</span>
        </p>
      </div>
    </article>
  );
}