import { Card } from "@/components/ui/Card.jsx";

export default function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          {title}

        </h1>

        <p className="text-gray-500 mt-2">

          {subtitle}

        </p>

      </div>

      {children}

    </Card>
  );
}