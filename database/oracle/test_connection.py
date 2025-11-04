
#!/usr/bin/env python3
"""
Script para testar conexão com o banco Oracle
Requer: pip install cx_Oracle
"""

import cx_Oracle

def test_connection():
    try:
        # Configurar conexão
        dsn = cx_Oracle.makedsn(
            "crescimentoerp.nuvemdatacom.com.br",
            9568,
            service_name="FREEPDB1"
        )
        
        print("🔄 Conectando ao Oracle...")
        connection = cx_Oracle.connect(
            user="SYSTEM",
            password="Castro135!",
            dsn=dsn
        )
        
        print("✅ Conexão estabelecida com sucesso!")
        
        # Testar query
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM V$VERSION")
        
        print("\n📊 Versão do Oracle:")
        for row in cursor:
            print(f"   {row[0]}")
        
        # Verificar se tabela existe
        cursor.execute("""
            SELECT COUNT(*) 
            FROM USER_TABLES 
            WHERE TABLE_NAME = 'EMPRESAS'
        """)
        
        table_exists = cursor.fetchone()[0] > 0
        
        if table_exists:
            print("\n✅ Tabela EMPRESAS já existe")
            
            cursor.execute("SELECT COUNT(*) FROM EMPRESAS")
            count = cursor.fetchone()[0]
            print(f"   Total de registros: {count}")
        else:
            print("\n⚠️  Tabela EMPRESAS não encontrada")
            print("   Execute o script 01_create_empresas.sql")
        
        cursor.close()
        connection.close()
        
        print("\n✅ Teste concluído com sucesso!")
        
    except cx_Oracle.Error as error:
        print(f"\n❌ Erro ao conectar: {error}")
        return False
    
    return True

if __name__ == "__main__":
    test_connection()
