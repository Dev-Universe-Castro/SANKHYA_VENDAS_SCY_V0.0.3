import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Configuracoes() {
  const [interval, setInterval] = useState("15");
  const [intervalUnit, setIntervalUnit] = useState("minutos");
  const [retryAttempts, setRetryAttempts] = useState("3");
  const [retryDelay, setRetryDelay] = useState("5");

  const handleSave = () => {
    console.log('Settings saved:', {
      interval,
      intervalUnit,
      retryAttempts,
      retryDelay,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Configurações</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure os parâmetros globais de sincronização
          </p>
        </div>
        <Button onClick={handleSave} data-testid="button-save">
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="sankhya">Sankhya</TabsTrigger>
          <TabsTrigger value="politicas">Políticas de Retry</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Defina o intervalo de execução da sincronização automática
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="interval">Intervalo de Sincronização</Label>
                  <Input
                    id="interval"
                    type="number"
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    min="1"
                    data-testid="input-interval"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select value={intervalUnit} onValueChange={setIntervalUnit}>
                    <SelectTrigger id="unit" data-testid="select-unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutos">Minutos</SelectItem>
                      <SelectItem value="horas">Horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                A sincronização será executada automaticamente a cada {interval} {intervalUnit}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sankhya">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Sankhya</CardTitle>
              <CardDescription>
                Configure os endpoints globais da API Sankhya (podem ser sobrescritos por empresa)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-url">URL Base da API</Label>
                <Input
                  id="base-url"
                  placeholder="https://api.sankhya.com.br"
                  defaultValue="https://api.sankhya.com.br"
                  data-testid="input-base-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Timeout (segundos)</Label>
                <Input
                  id="timeout"
                  type="number"
                  defaultValue="30"
                  min="5"
                  max="300"
                  data-testid="input-timeout"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicas">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Retry</CardTitle>
              <CardDescription>
                Configure o comportamento de reprocessamento em caso de falhas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">Número de Tentativas</Label>
                  <Input
                    id="retry-attempts"
                    type="number"
                    value={retryAttempts}
                    onChange={(e) => setRetryAttempts(e.target.value)}
                    min="0"
                    max="10"
                    data-testid="input-retry-attempts"
                  />
                  <p className="text-xs text-muted-foreground">
                    Máximo de tentativas antes de marcar como falha permanente
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retry-delay">Delay entre Tentativas (minutos)</Label>
                  <Input
                    id="retry-delay"
                    type="number"
                    value={retryDelay}
                    onChange={(e) => setRetryDelay(e.target.value)}
                    min="1"
                    max="60"
                    data-testid="input-retry-delay"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tempo de espera antes de reprocessar uma falha
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
