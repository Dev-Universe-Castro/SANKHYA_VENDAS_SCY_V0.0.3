import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const mockLogs = [
  {
    id: 1,
    timestamp: "2024-11-03 14:32:15",
    empresa: "Empresa Alpha",
    tipo: "IN",
    status: "SINCRONIZADO",
    duracao: "2.3s",
    detalhes: "Importação de 150 registros do Sankhya concluída com sucesso.",
  },
  {
    id: 2,
    timestamp: "2024-11-03 14:28:43",
    empresa: "Empresa Beta",
    tipo: "OUT",
    status: "PENDENTE_ENVIO",
    duracao: "-",
    detalhes: "Aguardando processamento da fila de sincronização.",
  },
  {
    id: 3,
    timestamp: "2024-11-03 14:15:22",
    empresa: "Empresa Gamma",
    tipo: "IN",
    status: "FALHA_ENVIO",
    duracao: "1.8s",
    detalhes: "Erro: Token expirado. Código 401 - Unauthorized. Será reprocessado automaticamente.",
    erro: JSON.stringify({ code: 401, message: "Token expired", details: "Authentication failed" }, null, 2),
  },
  {
    id: 4,
    timestamp: "2024-11-03 14:05:18",
    empresa: "Empresa Delta",
    tipo: "OUT",
    status: "SINCRONIZADO",
    duracao: "3.1s",
    detalhes: "Exportação de 89 registros para Sankhya concluída.",
  },
];

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState("all");
  const [tipoFilter, setTipoFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.detalhes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmpresa = empresaFilter === "all" || log.empresa === empresaFilter;
    const matchesTipo = tipoFilter === "all" || log.tipo === tipoFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;

    return matchesSearch && matchesEmpresa && matchesTipo && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Logs de Sincronização</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitore todas as operações de sincronização em detalhes
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-empresa">
            <SelectValue placeholder="Empresa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Empresas</SelectItem>
            <SelectItem value="Empresa Alpha">Empresa Alpha</SelectItem>
            <SelectItem value="Empresa Beta">Empresa Beta</SelectItem>
            <SelectItem value="Empresa Gamma">Empresa Gamma</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tipoFilter} onValueChange={setTipoFilter}>
          <SelectTrigger className="w-[120px]" data-testid="select-tipo">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="IN">IN</SelectItem>
            <SelectItem value="OUT">OUT</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="SINCRONIZADO">Sincronizado</SelectItem>
            <SelectItem value="PENDENTE_ENVIO">Pendente</SelectItem>
            <SelectItem value="FALHA_ENVIO">Falha</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="overflow-hidden" data-testid={`card-log-${log.id}`}>
            <div
              className="flex cursor-pointer items-center justify-between p-4 hover-elevate"
              onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
            >
              <div className="flex flex-1 items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground">{log.timestamp}</span>
                <span className="text-sm font-medium">{log.empresa}</span>
                <Badge variant="outline" className="text-xs">
                  {log.tipo}
                </Badge>
                <StatusBadge status={log.status as any} />
                <span className="font-mono text-xs text-muted-foreground">{log.duracao}</span>
              </div>
              <Button size="icon" variant="ghost">
                {expandedLog === log.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {expandedLog === log.id && (
              <div className="border-t bg-muted/50 p-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Detalhes
                  </p>
                  <p className="mt-1 text-sm">{log.detalhes}</p>
                </div>
                {log.erro && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Erro Técnico
                    </p>
                    <pre className="mt-1 overflow-x-auto rounded-md bg-background p-3 font-mono text-xs">
                      {log.erro}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
