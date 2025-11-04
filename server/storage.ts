import { eq, and } from "drizzle-orm";
import { db } from "./db";
import {
  type User,
  type InsertUser,
  type Empresa,
  type InsertEmpresa,
  type SyncLog,
  type InsertSyncLog,
  type Configuracao,
  type InsertConfiguracao,
  users,
  empresas,
  syncLogs,
  configuracoes,
} from "@shared/schema";

export interface IStorage {
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEmpresas(): Promise<Empresa[]>;
  getEmpresaById(id: string): Promise<Empresa | undefined>;
  createEmpresa(empresa: InsertEmpresa): Promise<Empresa>;
  updateEmpresa(id: string, empresa: Partial<InsertEmpresa>): Promise<Empresa | undefined>;
  deleteEmpresa(id: string): Promise<void>;
  
  getAllSyncLogs(filters?: { empresa_id?: string; tipo?: string; status?: string }): Promise<SyncLog[]>;
  createSyncLog(log: InsertSyncLog): Promise<SyncLog>;
  
  getConfiguracao(chave: string): Promise<Configuracao | undefined>;
  setConfiguracao(config: InsertConfiguracao): Promise<Configuracao>;
  getAllConfiguracoes(): Promise<Configuracao[]>;
}

export class DbStorage implements IStorage {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllEmpresas(): Promise<Empresa[]> {
    return await db.select().from(empresas);
  }

  async getEmpresaById(id: string): Promise<Empresa | undefined> {
    const result = await db.select().from(empresas).where(eq(empresas.id, id));
    return result[0];
  }

  async createEmpresa(insertEmpresa: InsertEmpresa): Promise<Empresa> {
    const result = await db.insert(empresas).values(insertEmpresa).returning();
    return result[0];
  }

  async updateEmpresa(id: string, updateData: Partial<InsertEmpresa>): Promise<Empresa | undefined> {
    const result = await db
      .update(empresas)
      .set(updateData)
      .where(eq(empresas.id, id))
      .returning();
    return result[0];
  }

  async deleteEmpresa(id: string): Promise<void> {
    await db.delete(empresas).where(eq(empresas.id, id));
  }

  async getAllSyncLogs(filters?: { empresa_id?: string; tipo?: string; status?: string }): Promise<SyncLog[]> {
    let query = db.select().from(syncLogs);
    
    if (filters) {
      const conditions = [];
      if (filters.empresa_id) conditions.push(eq(syncLogs.empresa_id, filters.empresa_id));
      if (filters.tipo) conditions.push(eq(syncLogs.tipo, filters.tipo));
      if (filters.status) conditions.push(eq(syncLogs.status, filters.status));
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }
    }
    
    return await query;
  }

  async createSyncLog(insertLog: InsertSyncLog): Promise<SyncLog> {
    const result = await db.insert(syncLogs).values(insertLog).returning();
    return result[0];
  }

  async getConfiguracao(chave: string): Promise<Configuracao | undefined> {
    const result = await db.select().from(configuracoes).where(eq(configuracoes.chave, chave));
    return result[0];
  }

  async setConfiguracao(config: InsertConfiguracao): Promise<Configuracao> {
    const existing = await this.getConfiguracao(config.chave);
    
    if (existing) {
      const result = await db
        .update(configuracoes)
        .set({ valor: config.valor })
        .where(eq(configuracoes.chave, config.chave))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(configuracoes).values(config).returning();
      return result[0];
    }
  }

  async getAllConfiguracoes(): Promise<Configuracao[]> {
    return await db.select().from(configuracoes);
  }
}

export const storage = new DbStorage();
