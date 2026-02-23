-- ====================================================
-- Flow LAB — Controles do Setor Técnico
-- Migration: 001 — Create all control tables
-- ====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================
-- 1. Banho Histológico
-- ===========================
CREATE TABLE IF NOT EXISTS banho_histologico (
  id            uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date          date    NOT NULL UNIQUE,
  t1_visor      text,
  t2_termometro text,
  observacoes   text,
  responsavel   text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ===========================
-- 2. Bateria HE
-- ===========================
CREATE TABLE IF NOT EXISTS bateria_he (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date         date NOT NULL UNIQUE,
  xilol_1      text,
  alcool_1     text,
  hematoxilina text,
  giemsa       text,
  alcool_2     text,
  eosina       text,
  alcool_3     text,
  xilol_2      text,
  responsavel  text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- ===========================
-- 3. Bateria Papanicolau
-- ===========================
CREATE TABLE IF NOT EXISTS bateria_papanicolau (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date         date NOT NULL UNIQUE,
  alcool_1     text,
  hematoxilina text,
  alcool_2     text,
  orange_g     text,
  alcool_3     text,
  ea_36        text,
  alcool_4     text,
  xilol        text,
  responsavel  text,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- ===========================
-- 4. Central de Inclusão
-- ===========================
CREATE TABLE IF NOT EXISTS central_inclusao (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date                 date NOT NULL UNIQUE,
  cubas_visor          text,
  dispensador_visor    text,
  central_quente_visor text,
  cuba_1_term          text,
  cuba_2_term          text,
  dispensador_term     text,
  quente_term          text,
  frio_term            text,
  placa_fria           text,
  responsavel          text,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now()
);

-- ===========================
-- 5. Controle de Coloração PAP
-- ===========================
CREATE TABLE IF NOT EXISTS controle_coloracao_pap (
  id                      uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                    date    NOT NULL UNIQUE,
  tempos_coloracao        text,
  coloracao_satisfatoria  boolean,
  medida_corretiva        text,
  responsavel             text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- ===========================
-- 6. Controle de Coloração HE
-- ===========================
CREATE TABLE IF NOT EXISTS controle_coloracao_he (
  id                      uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                    date    NOT NULL UNIQUE,
  tempo_he                text,
  tempo_hp                text,
  coloracao_satisfatoria  boolean,
  medida_corretiva        text,
  responsavel             text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- ===========================
-- 7. Estufa / Geladeira
-- ===========================
CREATE TABLE IF NOT EXISTS estufa_geladeira (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date              date NOT NULL UNIQUE,
  estufa_t1_visor   text,
  estufa_t2_term    text,
  geladeira_t1_visor text,
  geladeira_t2      text,
  geladeira_t2b     text,
  observacoes       text,
  responsavel       text,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- ===========================
-- 8. Parafina
-- ===========================
CREATE TABLE IF NOT EXISTS parafina (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date          date NOT NULL UNIQUE,
  t1_visor      text,
  t2_visor      text,
  t1_termometro text,
  t2_termometro text,
  observacoes   text,
  responsavel   text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ===========================
-- 9. Processador de Tecidos
-- ===========================
CREATE TABLE IF NOT EXISTS processador_tecidos (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date          date NOT NULL UNIQUE,
  formol        text,
  alcool        text,
  xilol         text,
  parafina      text,
  responsavel_1 text,
  responsavel_2 text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ===========================
-- 10. Produtividade
-- ===========================
CREATE TABLE IF NOT EXISTS produtividade (
  id                    uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                  date    NOT NULL UNIQUE,
  semana                text,
  laminas_citologia     integer,
  laminas_biopsia       integer,
  laminas_novos_cortes  integer,
  total_diario          integer,
  blocos_biopsia        integer,
  responsavel           text,
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

-- ===========================
-- 11. Programação do Processador
-- ===========================
CREATE TABLE IF NOT EXISTS programacao_processador (
  id                    uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                  date    NOT NULL UNIQUE,
  data_visor            text,
  hora_visor            text,
  temperatura_estavel   boolean,
  responsavel_antes     text,
  programacao_correta   boolean,
  horario_registro      text,
  responsavel_apos      text,
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

-- ===========================
-- Updated_at trigger function
-- ===========================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'banho_histologico', 'bateria_he', 'bateria_papanicolau',
    'central_inclusao', 'controle_coloracao_pap', 'controle_coloracao_he',
    'estufa_geladeira', 'parafina', 'processador_tecidos',
    'produtividade', 'programacao_processador'
  ]
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON %I;
       CREATE TRIGGER set_updated_at
       BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();',
      t, t
    );
  END LOOP;
END;
$$;

-- ===========================
-- Row Level Security (no auth)
-- ===========================
-- Enable RLS but allow all operations via anon key (public access)
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'banho_histologico', 'bateria_he', 'bateria_papanicolau',
    'central_inclusao', 'controle_coloracao_pap', 'controle_coloracao_he',
    'estufa_geladeira', 'parafina', 'processador_tecidos',
    'produtividade', 'programacao_processador'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    EXECUTE format(
      'DROP POLICY IF EXISTS "allow_all" ON %I;
       CREATE POLICY "allow_all" ON %I FOR ALL USING (true) WITH CHECK (true);',
      t, t
    );
  END LOOP;
END;
$$;
