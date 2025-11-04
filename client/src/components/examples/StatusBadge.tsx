import { StatusBadge } from '../status-badge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-4 p-6">
      <StatusBadge status="SINCRONIZADO" />
      <StatusBadge status="PENDENTE_ENVIO" />
      <StatusBadge status="FALHA_ENVIO" />
    </div>
  );
}
