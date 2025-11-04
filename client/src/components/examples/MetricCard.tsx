import { MetricCard } from '../metric-card';
import { Clock, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Pendentes"
        value={45}
        icon={Clock}
        variant="warning"
        trend={{ value: -12, label: "vs. semana passada" }}
      />
      <MetricCard
        title="Sincronizados"
        value={1284}
        icon={CheckCircle2}
        variant="success"
        trend={{ value: 8, label: "vs. semana passada" }}
      />
      <MetricCard
        title="Falhas"
        value={12}
        icon={XCircle}
        variant="destructive"
        trend={{ value: -3, label: "vs. semana passada" }}
      />
      <MetricCard
        title="Próxima Sync"
        value="5min"
        icon={Clock}
        variant="default"
      />
    </div>
  );
}
