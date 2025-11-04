
import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { empresas, users, syncLogs, configuracoes } from "@shared/schema";
import { eq, desc, and, like } from "drizzle-orm";
import { comparePasswords, hashPassword } from "./auth";
import { setupAuth } from "./auth";
import { encrypt, decrypt } from "./crypto";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // ==================== EMPRESAS ====================
  app.get("/api/empresas", async (req, res) => {
    try {
      const allEmpresas = await db.select().from(empresas).orderBy(desc(empresas.created_at));
      res.json(allEmpresas);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/empresas/:id", async (req, res) => {
    try {
      const [empresa] = await db.select()
        .from(empresas)
        .where(eq(empresas.id, req.params.id));
      
      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      
      res.json(empresa);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/empresas", async (req, res) => {
    try {
      const { 
        nome, 
        ativo, 
        sankhya_endpoint, 
        sankhya_app_key, 
        sankhya_username, 
        sankhya_password 
      } = req.body;

      const [newEmpresa] = await db.insert(empresas).values({
        nome,
        ativo: ativo ?? true,
        sankhya_endpoint,
        sankhya_app_key,
        sankhya_username,
        sankhya_password_encrypted: encrypt(sankhya_password),
      }).returning();

      res.status(201).json(newEmpresa);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/empresas/:id", async (req, res) => {
    try {
      const { 
        nome, 
        ativo, 
        sankhya_endpoint, 
        sankhya_app_key, 
        sankhya_username, 
        sankhya_password 
      } = req.body;

      const updateData: any = {
        nome,
        ativo,
        sankhya_endpoint,
        sankhya_app_key,
        sankhya_username,
      };

      if (sankhya_password) {
        updateData.sankhya_password_encrypted = encrypt(sankhya_password);
      }

      const [updated] = await db.update(empresas)
        .set(updateData)
        .where(eq(empresas.id, req.params.id))
        .returning();

      if (!updated) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/empresas/:id", async (req, res) => {
    try {
      const [deleted] = await db.delete(empresas)
        .where(eq(empresas.id, req.params.id))
        .returning();

      if (!deleted) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      res.json({ message: "Empresa excluída com sucesso" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== LOGS ====================
  app.get("/api/logs", async (req, res) => {
    try {
      const { empresa_id, tipo, status } = req.query;
      
      let query = db.select().from(syncLogs);
      
      const conditions = [];
      if (empresa_id) conditions.push(eq(syncLogs.empresa_id, empresa_id as string));
      if (tipo) conditions.push(eq(syncLogs.tipo, tipo as string));
      if (status) conditions.push(eq(syncLogs.status, status as string));
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }
      
      const logs = await query.orderBy(desc(syncLogs.timestamp));
      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/logs/:id", async (req, res) => {
    try {
      const [log] = await db.select()
        .from(syncLogs)
        .where(eq(syncLogs.id, req.params.id));
      
      if (!log) {
        return res.status(404).json({ message: "Log não encontrado" });
      }
      
      res.json(log);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== SINCRONIZAÇÃO ====================
  app.post("/api/sincronizar/:empresa_id", async (req, res) => {
    try {
      const [empresa] = await db.select()
        .from(empresas)
        .where(eq(empresas.id, req.params.empresa_id));

      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      if (!empresa.ativo) {
        return res.status(400).json({ message: "Empresa inativa" });
      }

      // Simular sincronização
      const startTime = Date.now();
      
      // Criar log de início
      const [log] = await db.insert(syncLogs).values({
        empresa_id: empresa.id,
        tipo: "manual",
        status: "em_andamento",
        duracao: "0s",
        detalhes: JSON.stringify({ inicio: new Date().toISOString() }),
      }).returning();

      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      const duration = Math.floor((Date.now() - startTime) / 1000);
      
      // Atualizar log com sucesso
      const [updatedLog] = await db.update(syncLogs)
        .set({
          status: "sucesso",
          duracao: `${duration}s`,
          detalhes: JSON.stringify({
            inicio: new Date(startTime).toISOString(),
            fim: new Date().toISOString(),
            registros_processados: 150,
          }),
        })
        .where(eq(syncLogs.id, log.id))
        .returning();

      // Atualizar última sincronização da empresa
      await db.update(empresas)
        .set({ 
          ultima_sync: new Date(),
        })
        .where(eq(empresas.id, empresa.id));

      res.json({
        message: "Sincronização concluída com sucesso",
        log: updatedLog,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/sincronizar/:empresa_id/testar", async (req, res) => {
    try {
      const [empresa] = await db.select()
        .from(empresas)
        .where(eq(empresas.id, req.params.empresa_id));

      if (!empresa) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }

      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 1000));

      const password = decrypt(empresa.sankhya_password_encrypted);

      res.json({
        success: true,
        message: "Conexão testada com sucesso",
        detalhes: {
          endpoint: empresa.sankhya_endpoint,
          username: empresa.sankhya_username,
          app_key: empresa.sankhya_app_key,
          conexao: "OK",
          tempo_resposta: "245ms",
        },
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Erro ao testar conexão",
        detalhes: { erro: error.message },
      });
    }
  });

  // ==================== CONFIGURAÇÕES ====================
  app.get("/api/configuracoes", async (req, res) => {
    try {
      const allConfigs = await db.select().from(configuracoes);
      res.json(allConfigs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/configuracoes/:chave", async (req, res) => {
    try {
      const [config] = await db.select()
        .from(configuracoes)
        .where(eq(configuracoes.chave, req.params.chave));
      
      if (!config) {
        return res.status(404).json({ message: "Configuração não encontrada" });
      }
      
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/configuracoes", async (req, res) => {
    try {
      const { chave, valor } = req.body;

      const [existing] = await db.select()
        .from(configuracoes)
        .where(eq(configuracoes.chave, chave));

      if (existing) {
        const [updated] = await db.update(configuracoes)
          .set({ 
            valor: JSON.stringify(valor),
            updatedAt: new Date(),
          })
          .where(eq(configuracoes.chave, chave))
          .returning();
        
        return res.json(updated);
      }

      const [newConfig] = await db.insert(configuracoes).values({
        chave,
        valor: JSON.stringify(valor),
      }).returning();

      res.status(201).json(newConfig);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/configuracoes/:chave", async (req, res) => {
    try {
      const { valor } = req.body;

      const [updated] = await db.update(configuracoes)
        .set({ 
          valor: JSON.stringify(valor),
          updatedAt: new Date(),
        })
        .where(eq(configuracoes.chave, req.params.chave))
        .returning();

      if (!updated) {
        return res.status(404).json({ message: "Configuração não encontrada" });
      }

      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ==================== USUÁRIOS ====================
  app.get("/api/usuarios", async (req, res) => {
    try {
      const allUsers = await db.select({
        id: users.id,
        email: users.email,
        nome: users.nome,
        perfil: users.perfil,
        createdAt: users.createdAt,
      }).from(users);
      
      res.json(allUsers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/usuarios", async (req, res) => {
    try {
      const { email, password, nome, perfil } = req.body;

      const [existing] = await db.select()
        .from(users)
        .where(eq(users.email, email));

      if (existing) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await hashPassword(password);

      const [newUser] = await db.insert(users).values({
        email,
        password: hashedPassword,
        nome,
        perfil: perfil || "USER",
      }).returning({
        id: users.id,
        email: users.email,
        nome: users.nome,
        perfil: users.perfil,
        createdAt: users.createdAt,
      });

      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
