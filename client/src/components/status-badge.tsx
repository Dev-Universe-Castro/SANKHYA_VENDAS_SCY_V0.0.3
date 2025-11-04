import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

type SyncStatus = "SINCRONIZADO" | "PENDENTE_ENVIO" | "FALHA_ENVIO";

interface StatusBadgeProps {
  status: SyncStatus;
}

const statusConfig = {
  SINCRONIZADO: {
    label: "Sincronizado",
    icon: CheckCircle2,
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  PENDENTE_ENVIO: {
    label: "Pendente",
    icon: Clock,
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  FALHA_ENVIO: {
    label: "Falha",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1 ${config.className}`} data-testid={`badge-status-${status.toLowerCase()}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
