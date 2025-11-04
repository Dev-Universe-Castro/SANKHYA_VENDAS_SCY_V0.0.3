import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SyncChartProps {
  data: Array<{
    name: string;
    sucesso: number;
    falha: number;
  }>;
}

export function SyncChart({ data }: SyncChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Histórico de Sincronizações</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Legend />
            <Bar dataKey="sucesso" fill="hsl(142 76% 36%)" name="Sucesso" />
            <Bar dataKey="falha" fill="hsl(0 84% 60%)" name="Falha" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
