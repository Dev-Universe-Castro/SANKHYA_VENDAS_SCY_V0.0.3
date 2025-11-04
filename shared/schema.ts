import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  nome: text("nome").notNull(),
  perfil: text("perfil").notNull().default("ADM"),
});

export const empresas = pgTable("empresas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  ativo: boolean("ativo").notNull().default(true),
  ultima_sync: timestamp("ultima_sync"),
  sankhya_endpoint: text("sankhya_endpoint"),
  sankhya_app_key: text("sankhya_app_key"),
  sankhya_username: text("sankhya_username"),
  sankhya_password_encrypted: text("sankhya_password_encrypted"),
  created_at: timestamp("created_at").notNull().default(sql`now()`),
});

export const syncLogs = pgTable("sync_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  empresa_id: varchar("empresa_id").notNull(),
  tipo: text("tipo").notNull(),
  status: text("status").notNull(),
  duracao: text("duracao"),
  detalhes: text("detalhes"),
  erro: text("erro"),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
});

export const configuracoes = pgTable("configuracoes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  chave: text("chave").notNull().unique(),
  valor: text("valor").notNull(),
  updated_at: timestamp("updated_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertEmpresaSchema = createInsertSchema(empresas).omit({
  id: true,
  created_at: true,
  ultima_sync: true,
});

export const insertSyncLogSchema = createInsertSchema(syncLogs).omit({
  id: true,
  timestamp: true,
});

export const insertConfiguracaoSchema = createInsertSchema(configuracoes).omit({
  id: true,
  updated_at: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEmpresa = z.infer<typeof insertEmpresaSchema>;
export type Empresa = typeof empresas.$inferSelect;

export type InsertSyncLog = z.infer<typeof insertSyncLogSchema>;
export type SyncLog = typeof syncLogs.$inferSelect;

export type InsertConfiguracao = z.infer<typeof insertConfiguracaoSchema>;
export type Configuracao = typeof configuracoes.$inferSelect;
