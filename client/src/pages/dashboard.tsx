
import { Clock, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { SyncCountdown } from "@/components/sync-countdown";
import { DataTable } from "@/components/data-table";
import { StatusBadge } from "@/components/status-badge";
import { SyncChart } from "@/components/sync-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentActivityData = [
  { id: 1, empresa: "Empresa Alpha", tipo: "IN", status: "SINCRONIZADO", timestamp: "14:32:15" },
  { id: 2, empresa: "Empresa Beta", tipo: "OUT", status: "PENDENTE_ENVIO", timestamp: "14:28:43" },
  { id: 3, empresa: "Empresa Gamma", tipo: "IN", status: "FALHA_ENVIO", timestamp: "14:15:22" },
  { id: 4, empresa: "Empresa Delta", tipo: "OUT", status: "SINCRONIZADO", timestamp: "14:05:18" },
  { id: 5, empresa: "Empresa Epsilon", tipo: "IN", status: "SINCRONIZADO", timestamp: "13:58:09" },
];

const chartData = [
  { name: "Seg", sucesso: 45, falha: 3 },
  { name: "Ter", sucesso: 52, falha: 2 },
  { name: "Qua", sucesso: 48, falha: 5 },
  { name: "Qui", sucesso: 61, falha: 1 },
  { name: "Sex", sucesso: 55, falha: 4 },
  { name: "Sáb", sucesso: 38, falha: 2 },
  { name: "Dom", sucesso: 42, falha: 3 },
];

const failedCompanies = [
  { empresa: "Empresa Gamma", falhas: 12 },
  { empresa: "Empresa Zeta", falhas: 8 },
  { empresa: "Empresa Theta", falhas: 5 },
];

export default function Dashboard() {
  const columns = [
    { header: "Empresa", accessor: "empresa" as const },
    { header: "Tipo", accessor: "tipo" as const },
    {
      header: "Status",
      accessor: (row: typeof recentActivityData[0]) => (
        <StatusBadge status={row.status as any} />
      ),
    },
    { header: "Horário", accessor: "timestamp" as const },
  ];

  const nextSync = new Date(Date.now() + 5 * 60 * 1000);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visão geral das sincronizações em tempo real
          </p>
        </div>
        <Button onClick={() => console.log('Manual sync triggered')} data-testid="button-sync-manual">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sincronizar Agora
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          title="Taxa de Sucesso"
          value="98.2%"
          icon={AlertTriangle}
          variant="default"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={recentActivityData} columns={columns} pageSize={5} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <SyncCountdown nextSyncTime={nextSync} />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Empresas com Falhas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {failedCompanies.map((company) => (
                <div key={company.empresa} className="flex items-center justify-between">
                  <span className="text-sm">{company.empresa}</span>
                  <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                    {company.falhas} falhas
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <SyncChart data={chartData} />
    </div>
  );
}
