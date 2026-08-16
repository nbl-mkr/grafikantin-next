import StatCard from "@/components/admin/StatCard";

export default function OrderStats() {
  const stats = [
    {
      label: "Diproses",
      value: "24",
      change: "+5",
      positive: true,
      period: "Sedang dibuat",
    },
    {
      label: "Selesai",
      value: "50",
      change: "+8",
      positive: true,
      period: "Hari Ini",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}