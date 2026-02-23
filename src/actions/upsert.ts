'use server'

import { createClient } from '@supabase/supabase-js'
import type {
  BanhoHistologico,
  BateriaHE,
  BateriaPapanicolau,
  CentralInclusao,
  ControleColoracaoPAP,
  ControleColoracaoHE,
  EstufaGeladeira,
  Parafina,
  ProcessadorTecidos,
  Produtividade,
  ProgramacaoProcessador,
  ArquivoCitologia,
  Topografias,
} from '@/types'

function sb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export async function upsertBanhoHistologico(data: Omit<BanhoHistologico, 'id'>): Promise<void> {
  const { error } = await sb().from('banho_histologico').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertBateriaHE(data: Omit<BateriaHE, 'id'>): Promise<void> {
  const { error } = await sb().from('bateria_he').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertBateriaPapanicolau(data: Omit<BateriaPapanicolau, 'id'>): Promise<void> {
  const { error } = await sb().from('bateria_papanicolau').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertCentralInclusao(data: Omit<CentralInclusao, 'id'>): Promise<void> {
  const { error } = await sb().from('central_inclusao').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertControleColoracaoPAP(data: Omit<ControleColoracaoPAP, 'id'>): Promise<void> {
  const { error } = await sb().from('controle_coloracao_pap').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertControleColoracaoHE(data: Omit<ControleColoracaoHE, 'id'>): Promise<void> {
  const { error } = await sb().from('controle_coloracao_he').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertEstufaGeladeira(data: Omit<EstufaGeladeira, 'id'>): Promise<void> {
  const { error } = await sb().from('estufa_geladeira').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertParafina(data: Omit<Parafina, 'id'>): Promise<void> {
  const { error } = await sb().from('parafina').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertProcessadorTecidos(data: Omit<ProcessadorTecidos, 'id'>): Promise<void> {
  const { error } = await sb().from('processador_tecidos').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertProdutividade(data: Omit<Produtividade, 'id'>): Promise<void> {
  const { error } = await sb().from('produtividade').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertProgramacaoProcessador(data: Omit<ProgramacaoProcessador, 'id'>): Promise<void> {
  const { error } = await sb().from('programacao_processador').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertArquivoCitologia(data: Omit<ArquivoCitologia, 'id'>): Promise<void> {
  const { error } = await sb().from('arquivo_citologia').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}

export async function upsertTopografias(data: Omit<Topografias, 'id'>): Promise<void> {
  const { error } = await sb().from('topografias').upsert(data, { onConflict: 'date' })
  if (error) throw new Error(error.message)
}
