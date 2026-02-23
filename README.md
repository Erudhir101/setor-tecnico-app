# Flow LAB — Controles do Setor Técnico

Aplicação web para registro e visualização dos controles mensais do setor técnico de histopatologia, substituindo planilhas CSV manuais.

---

## Funcionalidades

- **10 tabelas de controle** mensais: Banho Histológico, Bateria HE, Bateria Papanicolau, Central de Inclusão, Controle de Coloração (PAP e HE), Estufa/Geladeira, Parafina, Processador de Tecidos, Produtividade e Programação do Processador.
- **Edição inline**: clique em qualquer célula do mês atual para editar. Pressione `Enter` ou clique fora para salvar.
- **Campos booleanos**: seletor Sim/Não para campos de satisfação e verificação.
- **Bloqueio por mês**: meses anteriores ficam bloqueados por padrão; botão "Desbloquear" no topo permite edição.
- **Fins de semana destacados** com fundo cinza claro.
- **Navegação por mês**: botões ← → no cabeçalho.
- **Feedback visual**: toasts de sucesso/erro após cada save.

---

## Configuração do Supabase

### 1. Criar o projeto Supabase

1. Acesse [app.supabase.com](https://app.supabase.com) e crie um novo projeto.
2. Anote a **URL do projeto** e a **chave anon** em *Settings → API*.

### 2. Criar as tabelas

Execute o SQL de migração no **SQL Editor** do Supabase:

```
supabase/migrations/001_create_tables.sql
```

Cole o conteúdo inteiro do arquivo e clique em **Run**.

### 3. Configurar variáveis de ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

---

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) — redireciona automaticamente para o mês atual (ex: `/2026/2`).

---

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx                  # Layout raiz + Toaster
│   ├── page.tsx                    # Redireciona para /[ano]/[mês]
│   └── [year]/[month]/
│       └── page.tsx                # Dashboard mensal (Server Component)
├── components/
│   ├── MonthlyDashboard.tsx        # Wrapper client com estado de bloqueio
│   ├── EditableCell.tsx            # Célula editável inline
│   ├── MonthNavigation.tsx         # Navegação ← mês →
│   ├── TableSidebar.tsx            # Sidebar com links para cada tabela
│   ├── UnlockButton.tsx            # Botão bloquear/desbloquear
│   └── tables/                     # Um componente por tabela de controle
├── lib/
│   ├── supabase.ts                 # Cliente Supabase
│   └── utils.ts                    # Utilitários de data
├── types/
│   └── index.ts                    # Interfaces TypeScript para todas as tabelas
└── actions/
    └── upsert.ts                   # Server Actions para salvar dados
supabase/
└── migrations/
    └── 001_create_tables.sql       # DDL completo de todas as 11 tabelas
```

---

## Build para produção

```bash
npm run build
npm start
```

Ou faça deploy na [Vercel](https://vercel.com) — conecte o repositório e adicione as variáveis de ambiente em *Settings → Environment Variables*.
