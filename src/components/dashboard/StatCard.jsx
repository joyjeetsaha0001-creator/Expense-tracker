import { Card } from "@/components/ui/Card";

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-0">
      <div className={`${color} h-2`} />

      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(value)}
          </h2>
        </div>

        <div
          className={`${color} h-14 w-14 rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}