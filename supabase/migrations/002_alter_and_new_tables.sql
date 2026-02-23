-- ====================================================
-- Flow LAB — Migration 002
-- Alter existing tables + add new tables
-- ====================================================

-- ===========================
-- 1. Parafina — add Processador 2 columns
--    (rename PT1 columns, add PT2 columns)
-- ===========================
ALTER TABLE parafina RENAME COLUMN t1_visor      TO pt1_t1_visor;
ALTER TABLE parafina RENAME COLUMN t2_visor      TO pt1_t2_visor;
ALTER TABLE parafina RENAME COLUMN t1_termometro TO pt1_t1_termometro;
ALTER TABLE parafina RENAME COLUMN t2_termometro TO pt1_t2_termometro;

ALTER TABLE parafina ADD COLUMN IF NOT EXISTS pt2_t1_visor      text;
ALTER TABLE parafina ADD COLUMN IF NOT EXISTS pt2_t2_visor      text;
ALTER TABLE parafina ADD COLUMN IF NOT EXISTS pt2_t1_termometro text;
ALTER TABLE parafina ADD COLUMN IF NOT EXISTS pt2_t2_termometro text;

-- ===========================
-- 2. Processador de Tecidos — restructure for 2 processors
-- ===========================
ALTER TABLE processador_tecidos RENAME COLUMN formol       TO pt1_formol;
ALTER TABLE processador_tecidos RENAME COLUMN alcool       TO pt1_alcool;
ALTER TABLE processador_tecidos RENAME COLUMN xilol        TO pt1_xilol;
ALTER TABLE processador_tecidos RENAME COLUMN parafina     TO pt1_parafina;
ALTER TABLE processador_tecidos RENAME COLUMN responsavel_1 TO responsavel;
ALTER TABLE processador_tecidos DROP COLUMN IF EXISTS responsavel_2;

ALTER TABLE processador_tecidos ADD COLUMN IF NOT EXISTS pt2_formol   text;
ALTER TABLE processador_tecidos ADD COLUMN IF NOT EXISTS pt2_alcool   text;
ALTER TABLE processador_tecidos ADD COLUMN IF NOT EXISTS pt2_xilol    text;
ALTER TABLE processador_tecidos ADD COLUMN IF NOT EXISTS pt2_parafina text;
ALTER TABLE processador_tecidos ADD COLUMN IF NOT EXISTS observacoes  text;

-- ===========================
-- 3. Programação do Processador — add PT2 columns + observacoes
-- ===========================
ALTER TABLE programacao_processador RENAME COLUMN data_visor          TO pt1_data_visor;
ALTER TABLE programacao_processador RENAME COLUMN hora_visor          TO pt1_hora_visor;
ALTER TABLE programacao_processador RENAME COLUMN temperatura_estavel TO pt1_temperatura_estavel;

ALTER TABLE programacao_processador ADD COLUMN IF NOT EXISTS pt2_data_visor         text;
ALTER TABLE programacao_processador ADD COLUMN IF NOT EXISTS pt2_hora_visor         text;
ALTER TABLE programacao_processador ADD COLUMN IF NOT EXISTS pt2_temperatura_estavel boolean;
ALTER TABLE programacao_processador ADD COLUMN IF NOT EXISTS observacoes            text;

-- ===========================
-- 4. Produtividade — add laminas_escaneadas
-- ===========================
ALTER TABLE produtividade ADD COLUMN IF NOT EXISTS laminas_escaneadas integer;

-- ===========================
-- 5. Arquivo de Citologia (NEW)
-- ===========================
CREATE TABLE IF NOT EXISTS arquivo_citologia (
  id                      uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                    date    NOT NULL UNIQUE,
  citologias_com_captura  integer,
  citologias_sem_captura  integer,
  observacoes             text,
  responsavel_1           text,
  responsavel_2           text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

-- ===========================
-- 6. Topografias (NEW)
-- ===========================
CREATE TABLE IF NOT EXISTS topografias (
  id                        uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  date                      date    NOT NULL UNIQUE,
  s_digestivo               integer,
  colo_uterino              integer,
  utero                     integer,
  mama                      integer,
  pele                      integer,
  endometrio                integer,
  placenta_restos_ovulares  integer,
  prostata                  integer,
  vesicula_apendice         integer,
  tireoide                  integer,
  outros                    integer,
  qtd_exames                integer,
  responsavel               text,
  created_at                timestamptz DEFAULT now(),
  updated_at                timestamptz DEFAULT now()
);

-- ===========================
-- updated_at triggers for new tables
-- ===========================
DROP TRIGGER IF EXISTS set_updated_at ON arquivo_citologia;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON arquivo_citologia
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at ON topografias;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON topografias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================
-- RLS for new tables
-- ===========================
ALTER TABLE arquivo_citologia ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_all" ON arquivo_citologia;
CREATE POLICY "allow_all" ON arquivo_citologia FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE topografias ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_all" ON topografias;
CREATE POLICY "allow_all" ON topografias FOR ALL USING (true) WITH CHECK (true);
