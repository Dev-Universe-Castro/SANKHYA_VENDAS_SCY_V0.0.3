import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "success" | "warning" | "destructive";
}

export function MetricCard({ title, value, icon: Icon, trend, variant = "default" }: MetricCardProps) {
  const iconColors = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
  };

  return (
    <Card data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
            {trend && (
              <p className="mt-1 text-xs text-muted-foreground">
                <span className={trend.value > 0 ? "text-success" : trend.value < 0 ? "text-destructive" : ""}>
                  {trend.value > 0 ? "+" : ""}{trend.value}%
                </span>{" "}
                {trend.label}
              </p>
            )}
          </div>
          <div className={`rounded-md bg-muted p-3 ${iconColors[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
