import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/formatCurrency";

export default function StatCard({
  title,
  value,
  icon,
  currency = "INR",
  color = "bg-blue-500",
}) {
  return (
    <Card className="overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl border border-gray-200">
      <div className={`${color} h-1.5`} />

      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            {formatCurrency(value, currency)}
          </h2>
        </div>

        <div
          className={`${color} h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-md`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}