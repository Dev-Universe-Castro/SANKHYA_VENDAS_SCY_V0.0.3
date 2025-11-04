import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, Network } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { CompanyForm } from "@/components/company-form";
import { Badge } from "@/components/ui/badge";

async function fetchEmpresas() {
  const response = await fetch("/api/empresas", {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar empresas");
  }

  return response.json();
}

export default function Empresas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: companies = [], isLoading, error } = useQuery({
    queryKey: ["empresas"],
    queryFn: fetchEmpresas,
  });

  const filteredCompanies = companies.filter((company: any) =>
    company.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Nome", accessor: "nome" as const },
    {
      header: "Status",
      accessor: (row: any) => (
        <Badge variant={row.ativo ? "default" : "secondary"}>
          {row.ativo ? "Ativa" : "Inativa"}
        </Badge>
      ),
    },
    { header: "Última Sincronização", accessor: "ultima_sync" as const, className: "font-mono text-xs" },
    {
      header: "Ações",
      accessor: (row: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Test connection:', row.id);
            }}
            data-testid={`button-test-${row.id}`}
          >
            <Network className="mr-1 h-3 w-3" />
            Testar
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Sync company:', row.id);
            }}
            data-testid={`button-sync-${row.id}`}
          >
            <RefreshCw className="mr-1 h-3 w-3" />
            Sincronizar
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando empresas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Erro ao carregar empresas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Empresas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie empresas e suas configurações de sincronização
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} data-testid="button-new-company">
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar empresas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          data-testid="input-search"
        />
      </div>

      <DataTable
        data={filteredCompanies}
        columns={columns}
        onRowClick={(row) => console.log('Edit company:', row.id)}
      />

      <CompanyForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          console.log('New company:', data);
          setFormOpen(false);
        }}
      />
    </div>
  );
}