import { DataTable } from '../data-table';
import { StatusBadge } from '../status-badge';

const mockData = [
  { id: 1, empresa: "Empresa A", tipo: "IN", status: "SINCRONIZADO", duracao: "2.3s" },
  { id: 2, empresa: "Empresa B", tipo: "OUT", status: "PENDENTE_ENVIO", duracao: "-" },
  { id: 3, empresa: "Empresa C", tipo: "IN", status: "FALHA_ENVIO", duracao: "1.8s" },
  { id: 4, empresa: "Empresa D", tipo: "OUT", status: "SINCRONIZADO", duracao: "3.1s" },
  { id: 5, empresa: "Empresa E", tipo: "IN", status: "SINCRONIZADO", duracao: "2.5s" },
];

export default function DataTableExample() {
  const columns = [
    { header: "Empresa", accessor: "empresa" as const },
    { header: "Tipo", accessor: "tipo" as const },
    {
      header: "Status",
      accessor: (row: typeof mockData[0]) => (
        <StatusBadge status={row.status as any} />
      ),
    },
    { header: "Duração", accessor: "duracao" as const },
  ];

  return (
    <div className="p-6">
      <DataTable
        data={mockData}
        columns={columns}
        onRowClick={(row) => console.log('Row clicked:', row)}
      />
    </div>
  );
}
