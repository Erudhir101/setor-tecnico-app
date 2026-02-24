'use server'

import { createClient } from '@supabase/supabase-js'

function sb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

const TABLES = [
  'banho_histologico',
  'bateria_he',
  'bateria_papanicolau',
  'central_inclusao',
  'controle_coloracao_pap',
  'controle_coloracao_he',
  'estufa_geladeira',
  'parafina',
  'processador_tecidos',
  'produtividade',
  'programacao_processador',
  'arquivo_citologia',
  'topografias',
] as const

type TableName = (typeof TABLES)[number]

/**
 * Ensures every day in `allDateKeys` has a row in each of the 13 tables.
 * Only inserts rows for dates that are missing — existing rows are untouched.
 * Call this on page load so that subsequent `.update().eq('date', …)` calls
 * always find the target row.
 */
export async function ensureMonthRows(
  allDateKeys: string[],
  existingByTable: Record<TableName, string[]>,
): Promise<void> {
  const client = sb()

  await Promise.all(
    TABLES.map(async (table) => {
      const existing = new Set(existingByTable[table])
      const missing = allDateKeys.filter((d) => !existing.has(d))
      if (missing.length === 0) return

      const { error } = await client
        .from(table)
        .insert(missing.map((date) => ({ date })))

      if (error) throw new Error(`Failed to seed ${table}: ${error.message}`)
    }),
  )
}
