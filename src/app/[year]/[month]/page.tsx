import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { getDaysInMonth, isCurrentMonth, formatDateKey } from '@/lib/utils'
import MonthlyDashboard from '@/components/MonthlyDashboard'
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
  AllTableData,
} from '@/types'

type Props = {
  params: Promise<{ year: string; month: string }>
}

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

function toMap<T extends { date: string }>(rows: T[] | null): Record<string, T> {
  if (!rows) return {}
  return Object.fromEntries(rows.map((r) => [r.date, r]))
}

export default async function MonthPage({ params }: Props) {
  const { year: yearStr, month: monthStr } = await params
  const year = parseInt(yearStr, 10)
  const month = parseInt(monthStr, 10)

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    notFound()
  }

  const days = getDaysInMonth(year, month)
  const startDate = formatDateKey(days[0])
  const endDate = formatDateKey(days[days.length - 1])

  const sb = supabase()

  const [
    { data: banhoData },
    { data: bateriaHeData },
    { data: bateriaPapData },
    { data: centralData },
    { data: ccPapData },
    { data: ccHeData },
    { data: estufaData },
    { data: parafinaData },
    { data: processadorData },
    { data: produtividadeData },
    { data: programacaoData },
    { data: arquivoCitologiaData },
    { data: topografiasData },
  ] = await Promise.all([
    sb.from('banho_histologico').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('bateria_he').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('bateria_papanicolau').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('central_inclusao').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('controle_coloracao_pap').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('controle_coloracao_he').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('estufa_geladeira').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('parafina').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('processador_tecidos').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('produtividade').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('programacao_processador').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('arquivo_citologia').select('*').gte('date', startDate).lte('date', endDate),
    sb.from('topografias').select('*').gte('date', startDate).lte('date', endDate),
  ])

  const data: AllTableData = {
    banhoHistologico: toMap<BanhoHistologico>(banhoData),
    bateriaHE: toMap<BateriaHE>(bateriaHeData),
    bateriaPapanicolau: toMap<BateriaPapanicolau>(bateriaPapData),
    centralInclusao: toMap<CentralInclusao>(centralData),
    controleColoracaoPAP: toMap<ControleColoracaoPAP>(ccPapData),
    controleColoracaoHE: toMap<ControleColoracaoHE>(ccHeData),
    estufaGeladeira: toMap<EstufaGeladeira>(estufaData),
    parafina: toMap<Parafina>(parafinaData),
    processadorTecidos: toMap<ProcessadorTecidos>(processadorData),
    produtividade: toMap<Produtividade>(produtividadeData),
    programacaoProcessador: toMap<ProgramacaoProcessador>(programacaoData),
    arquivoCitologia: toMap<ArquivoCitologia>(arquivoCitologiaData),
    topografias: toMap<Topografias>(topografiasData),
  }

  return (
    <MonthlyDashboard
      year={year}
      month={month}
      isCurrentMonth={isCurrentMonth(year, month)}
      days={days}
      data={data}
    />
  )
}
