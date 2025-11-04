import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const companySchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  ativo: z.boolean(),
  sankhya_endpoint: z.string().url("URL inválida"),
  sankhya_app_key: z.string().min(1, "App Key é obrigatório"),
  sankhya_username: z.string().min(1, "Username é obrigatório"),
  sankhya_password: z.string().min(1, "Password é obrigatório"),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyFormData) => void;
  initialData?: Partial<CompanyFormData>;
}

export function CompanyForm({ open, onClose, onSubmit, initialData }: CompanyFormProps) {
  const [activeTab, setActiveTab] = useState("geral");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      ativo: true,
      ...initialData,
    },
  });

  const ativo = watch("ativo");

  const handleFormSubmit = (data: CompanyFormData) => {
    console.log('Form submitted:', data);
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Empresa" : "Nova Empresa"}</DialogTitle>
          <DialogDescription>
            Configure os dados da empresa e as credenciais de acesso ao Sankhya
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="geral">Dados Gerais</TabsTrigger>
              <TabsTrigger value="credenciais">Credenciais Sankhya</TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Empresa *</Label>
                <Input
                  id="nome"
                  {...register("nome")}
                  placeholder="Ex: Empresa XPTO Ltda"
                  data-testid="input-nome"
                />
                {errors.nome && (
                  <p className="text-xs text-destructive">{errors.nome.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="ativo">Empresa Ativa</Label>
                  <p className="text-xs text-muted-foreground">
                    Quando ativa, a sincronização será executada automaticamente
                  </p>
                </div>
                <Switch
                  id="ativo"
                  checked={ativo}
                  onCheckedChange={(checked) => setValue("ativo", checked)}
                  data-testid="switch-ativo"
                />
              </div>
            </TabsContent>

            <TabsContent value="credenciais" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sankhya_endpoint">Endpoint Sankhya *</Label>
                <Input
                  id="sankhya_endpoint"
                  {...register("sankhya_endpoint")}
                  placeholder="https://api.sankhya.com.br"
                  data-testid="input-endpoint"
                />
                {errors.sankhya_endpoint && (
                  <p className="text-xs text-destructive">{errors.sankhya_endpoint.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sankhya_app_key">App Key *</Label>
                <Input
                  id="sankhya_app_key"
                  {...register("sankhya_app_key")}
                  placeholder="Sua App Key do Sankhya"
                  data-testid="input-appkey"
                />
                {errors.sankhya_app_key && (
                  <p className="text-xs text-destructive">{errors.sankhya_app_key.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sankhya_username">Username *</Label>
                  <Input
                    id="sankhya_username"
                    {...register("sankhya_username")}
                    placeholder="usuário"
                    data-testid="input-username"
                  />
                  {errors.sankhya_username && (
                    <p className="text-xs text-destructive">{errors.sankhya_username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sankhya_password">Password *</Label>
                  <Input
                    id="sankhya_password"
                    type="password"
                    {...register("sankhya_password")}
                    placeholder="••••••••"
                    data-testid="input-password"
                  />
                  {errors.sankhya_password && (
                    <p className="text-xs text-destructive">{errors.sankhya_password.message}</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel">
              Cancelar
            </Button>
            <Button type="submit" data-testid="button-submit">
              {initialData ? "Atualizar" : "Criar"} Empresa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
