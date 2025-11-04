import { SyncChart } from '../sync-chart';

const mockData = [
  { name: "Seg", sucesso: 45, falha: 3 },
  { name: "Ter", sucesso: 52, falha: 2 },
  { name: "Qua", sucesso: 48, falha: 5 },
  { name: "Qui", sucesso: 61, falha: 1 },
  { name: "Sex", sucesso: 55, falha: 4 },
  { name: "Sáb", sucesso: 38, falha: 2 },
  { name: "Dom", sucesso: 42, falha: 3 },
];

export default function SyncChartExample() {
  return (
    <div className="p-6">
      <SyncChart data={mockData} />
    </div>
  );
}
