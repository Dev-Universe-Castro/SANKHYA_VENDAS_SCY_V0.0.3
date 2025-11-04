
# Scripts Oracle - Gestão de Empresas

## Credenciais de Conexão

- **Host**: crescimentoerp.nuvemdatacom.com.br
- **Porta**: 9568
- **Service Name**: FREEPDB1
- **Usuário**: SYSTEM
- **Senha**: Castro135!

## String de Conexão

```
SYSTEM/Castro135!@crescimentoerp.nuvemdatacom.com.br:9568/FREEPDB1
```

## Como Executar os Scripts (ORDEM IMPORTANTE)

### Ordem de Execução

Execute os scripts nesta ordem:

1. `01_create_empresas.sql` - Cria a tabela de empresas
2. `03_create_additional_tables.sql` - Cria tabelas de usuários, logs e configurações
3. `02_seed_empresas.sql` - Insere dados de exemplo (opcional)

### Opção 1: SQL*Plus

```bash
sqlplus SYSTEM/Castro135!@crescimentoerp.nuvemdatacom.com.br:9568/FREEPDB1 @01_create_empresas.sql
sqlplus SYSTEM/Castro135!@crescimentoerp.nuvemdatacom.com.br:9568/FREEPDB1 @03_create_additional_tables.sql
sqlplus SYSTEM/Castro135!@crescimentoerp.nuvemdatacom.com.br:9568/FREEPDB1 @02_seed_empresas.sql
```

### Opção 2: SQL Developer

1. Abra o SQL Developer
2. Crie nova conexão com as credenciais acima
3. Abra e execute cada script na ordem indicada

### Opção 3: Python (cx_Oracle)

```python
import cx_Oracle

dsn = cx_Oracle.makedsn(
    "crescimentoerp.nuvemdatacom.com.br",
    9568,
    service_name="FREEPDB1"
)

connection = cx_Oracle.connect(
    user="SYSTEM",
    password="Castro135!",
    dsn=dsn
)

# Execute cada arquivo na ordem
for script in ['01_create_empresas.sql', '03_create_additional_tables.sql', '02_seed_empresas.sql']:
    with open(script, 'r') as f:
        cursor = connection.cursor()
        for statement in f.read().split(';'):
            if statement.strip():
                cursor.execute(statement)
        connection.commit()
```

## Estrutura das Tabelas

### EMPRESAS

| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | VARCHAR2(36) | Identificador único (UUID) |
| NOME | VARCHAR2(255) | Nome da empresa |
| ATIVO | NUMBER(1) | Status (0=Inativo, 1=Ativo) |
| ULTIMA_SYNC | TIMESTAMP | Última sincronização |
| SANKHYA_ENDPOINT | VARCHAR2(500) | URL da API Sankhya |
| SANKHYA_APP_KEY | VARCHAR2(255) | App Key do Sankhya |
| SANKHYA_USERNAME | VARCHAR2(100) | Usuário Sankhya |
| SANKHYA_PASSWORD_ENCRYPTED | CLOB | Senha criptografada |
| CREATED_AT | TIMESTAMP | Data de criação |

### USERS

| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | VARCHAR2(36) | Identificador único |
| EMAIL | VARCHAR2(255) | Email (único) |
| PASSWORD | VARCHAR2(255) | Senha hash |
| NOME | VARCHAR2(255) | Nome completo |
| PERFIL | VARCHAR2(20) | Perfil (ADM, USER) |

### SYNC_LOGS

| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | VARCHAR2(36) | Identificador único |
| EMPRESA_ID | VARCHAR2(36) | ID da empresa |
| TIPO | VARCHAR2(50) | Tipo de sincronização |
| STATUS | VARCHAR2(50) | Status da sincronização |
| DURACAO | VARCHAR2(50) | Tempo de execução |
| DETALHES | CLOB | Detalhes da operação |
| ERRO | CLOB | Mensagem de erro (se houver) |
| TIMESTAMP | TIMESTAMP | Data/hora da operação |

### CONFIGURACOES

| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | VARCHAR2(36) | Identificador único |
| CHAVE | VARCHAR2(255) | Chave da configuração (única) |
| VALOR | CLOB | Valor da configuração |
| UPDATED_AT | TIMESTAMP | Última atualização |

## Teste de Conexão

Execute o script Python de teste:

```bash
python database/oracle/test_connection.py
```

## Iniciar o Backend

Após executar os scripts SQL, configure as variáveis de ambiente e inicie o backend:

```bash
# Instalar dependências Python
pip install cx_Oracle sqlalchemy fastapi uvicorn

# Criar usuário admin
python backend/seed.py

# Iniciar backend
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

## Credenciais de Acesso Padrão

- **Email**: admin@sistema.com
- **Senha**: admin123
