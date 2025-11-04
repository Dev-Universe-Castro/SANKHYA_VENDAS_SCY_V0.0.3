
-- Script para criação da tabela EMPRESAS no Oracle
-- Conectar usando: SYSTEM/Castro135! em crescimentoerp.nuvemdatacom.com.br:9568/FREEPDB1

-- Criar tabela de empresas
CREATE TABLE EMPRESAS (
    ID VARCHAR2(36) PRIMARY KEY,
    NOME VARCHAR2(255) NOT NULL,
    ATIVO NUMBER(1) DEFAULT 1 NOT NULL,
    ULTIMA_SYNC TIMESTAMP,
    
    -- Credenciais Sankhya
    SANKHYA_ENDPOINT VARCHAR2(500),
    SANKHYA_APP_KEY VARCHAR2(255),
    SANKHYA_USERNAME VARCHAR2(100),
    SANKHYA_PASSWORD_ENCRYPTED CLOB,
    
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    -- Constraint para garantir que ATIVO seja 0 ou 1
    CONSTRAINT CHK_EMPRESAS_ATIVO CHECK (ATIVO IN (0, 1))
);

-- Criar sequência para IDs (se preferir usar sequência ao invés de UUID)
-- CREATE SEQUENCE SEQ_EMPRESAS START WITH 1 INCREMENT BY 1;

-- Criar índices para otimização
CREATE INDEX IDX_EMPRESAS_ATIVO ON EMPRESAS(ATIVO);
CREATE INDEX IDX_EMPRESAS_NOME ON EMPRESAS(NOME);

-- Comentários para documentação
COMMENT ON TABLE EMPRESAS IS 'Tabela de empresas com credenciais para integração Sankhya';
COMMENT ON COLUMN EMPRESAS.SANKHYA_ENDPOINT IS 'URL base da API Sankhya (ex: https://api.sankhya.com.br/gateway)';
COMMENT ON COLUMN EMPRESAS.SANKHYA_APP_KEY IS 'App Key fornecida pelo Sankhya';
COMMENT ON COLUMN EMPRESAS.SANKHYA_USERNAME IS 'Usuário para autenticação no Sankhya';
COMMENT ON COLUMN EMPRESAS.SANKHYA_PASSWORD_ENCRYPTED IS 'Senha criptografada (AES-256) para o Sankhya';
COMMENT ON COLUMN EMPRESAS.ULTIMA_SYNC IS 'Data/hora da última sincronização bem-sucedida';

-- Trigger para gerar UUID automaticamente (Oracle 12c+)
CREATE OR REPLACE TRIGGER TRG_EMPRESAS_ID
BEFORE INSERT ON EMPRESAS
FOR EACH ROW
WHEN (NEW.ID IS NULL)
BEGIN
    SELECT SYS_GUID() INTO :NEW.ID FROM DUAL;
END;
/
