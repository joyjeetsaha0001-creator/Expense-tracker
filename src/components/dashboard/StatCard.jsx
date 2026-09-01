import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value = "₹0",
}) {
  return (
    <Card className="p-6">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </Card>
  );
}