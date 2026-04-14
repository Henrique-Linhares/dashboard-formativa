# 🌡️ Sistema de Monitoramento Ambiental Industrial

Aplicação web de monitoramento de temperatura e umidade desenvolvida como projeto integrador, utilizando **Flask**, **ThingSpeak**, **MySQL** e **Docker**. Simula um cenário real de IoT industrial onde dados de sensores são enviados para a nuvem, armazenados localmente e exibidos em um dashboard próprio.

---

## ✨ Funcionalidades

- 📤 **Envio simulado de dados** — gera e envia valores de temperatura e umidade para o ThingSpeak via API
- 📥 **Leitura de múltiplos registros** — consulta os últimos registros do canal ThingSpeak
- 📊 **Dashboard web** — exibe última temperatura, última umidade, quantidade de registros e tabela completa
- 🗄️ **Persistência local** — salva todos os registros em banco de dados MySQL
- 🐳 **Containerizado** — toda a aplicação roda com Docker Compose

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [Flask](https://flask.palletsprojects.com/) | Framework web Python |
| [ThingSpeak API](https://thingspeak.com/) | Plataforma IoT em nuvem |
| [MySQL](https://www.mysql.com/) | Banco de dados relacional local |
| [Docker + Docker Compose](https://docs.docker.com/) | Containerização e orquestração |
| HTML + CSS | Interface do dashboard |
| Python | Linguagem principal |

---

## 📁 Estrutura do Projeto

```
projeto_monitoramento/
│
├── app/
│   ├── app.py                  # Rotas Flask, integração ThingSpeak e MySQL
│   ├── connectDb.py            # Funções de conexão e persistência no MySQL
│   ├── config.py
│   ├── entrypoint.sh           
│   ├── templates/
│   │   └── index.html          # Dashboard principal
│   ├── static/
│   │   └── css/
│   │       └── style.css       # Estilos da interface
│   └── requirements.txt        # Dependências Python
│   └── wait_for_db.py       
│
├── mysql/init
│   └── init.sql                # Script de criação da tabela no MySQL
│
├── Dockerfile                  # Build da aplicação Flask
├── docker-compose.yml          # Orquestração dos serviços
└── .env                        # Variáveis de ambiente (não versionado)
```

---

## ⚙️ Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado
- Conta no [ThingSpeak](https://thingspeak.com/) com um canal configurado

---

## 🚀 Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/Henrique-Linhare/dashboard_formativa.git
cd dashboard_formativa
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MYSQL_HOST=db
MYSQL_USER=ambtech
MYSQL_PASSWORD=sua_senha
MYSQL_DATABASE=monitoramento
```

### 3. Suba os contêineres

```bash
docker compose up --build
```

### 4. Acesse o dashboard

```
http://localhost:5000
```

---

## 🔌 Configuração do ThingSpeak

No seu canal ThingSpeak, configure os campos:

| Campo | Dado |
|---|---|
| `field1` | Temperatura (°C) |
| `field2` | Umidade (%) |

Após criar o canal, copie o **Channel ID**, a **Write API Key** e a **Read API Key** para o arquivo `.env`.

---

## 🗄️ Estrutura do Banco de Dados

```sql
CREATE TABLE leituras (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    data_hora       DATETIME,
    temperatura     FLOAT,
    umidade         FLOAT,
    origem_dado     VARCHAR(50),
    data_insercao   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📋 Fluxo da Aplicação

```
Usuário acessa o dashboard
        ↓
Flask envia dados simulados → ThingSpeak (field1, field2)
        ↓
Flask consulta últimos registros ← ThingSpeak API
        ↓
Registros salvos no MySQL
        ↓
Dashboard exibe: última temp, última umidade, tabela completa
```

---

## 🧪 Testando o Sistema

Após subir os contêineres, verifique:

- [ ] Dashboard abre em `http://localhost:5000`
- [ ] Botão "Enviar nova leitura" envia dados ao ThingSpeak
- [ ] Tabela exibe os registros lidos do canal
- [ ] Registros aparecem salvos no MySQL
- [ ] Canal ThingSpeak mostra os gráficos atualizados
