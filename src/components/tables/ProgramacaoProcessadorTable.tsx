'use client'

import EditableCell from '@/components/EditableCell'
import { upsertProgramacaoProcessador } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS, SIM_NAO_OPTIONS } from '@/lib/constants'
import type { ProgramacaoProcessador } from '@/types'

interface Props {
  rows: Record<string, ProgramacaoProcessador>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

const THGroup = ({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) => (
  <th colSpan={colSpan} className="px-3 py-2 text-center text-xs font-semibold text-blue-600 uppercase tracking-wider border-b border-gray-100 bg-blue-50/40">
    {children}
  </th>
)

function boolStr(v: boolean | null | undefined): string {
  if (v === true) return 'Sim'
  if (v === false) return 'Não'
  return ''
}

function strBool(s: string): boolean | null {
  if (s === 'Sim') return true
  if (s === 'Não') return false
  return null
}

export default function ProgramacaoProcessadorTable({ rows, days, readOnly }: Props) {
  return (
    <section id="programacao-processador" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Programação do Processador</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de programação e verificação dos processadores de tecidos</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Data</th>
                <THGroup colSpan={3}>Processador 1 — Antes</THGroup>
                <THGroup colSpan={3}>Processador 2 — Antes</THGroup>
                <TH>Resp. Antes</TH>
                <TH>Prog. Correta</TH>
                <TH>Horário Reg.</TH>
                <TH>Observações</TH>
                <TH>Resp. Após</TH>
              </tr>
              <tr className="bg-gray-50">
                <TH>Data Visor</TH><TH>Hora Visor</TH><TH>Temp. Estável</TH>
                <TH>Data Visor</TH><TH>Hora Visor</TH><TH>Temp. Estável</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rows[dateKey]
                const weekend = isWeekend(day)
                return (
                  <tr key={dateKey} className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}>
                    <td className="px-3 py-1.5 border-b border-gray-100 sticky left-0 bg-inherit z-10 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-800 w-5 text-right tabular-nums">{day.getDate()}</span>
                        <span className={`text-xs w-7 ${weekend ? 'text-red-400 font-medium' : 'text-gray-400'}`}>{getWeekdayLabel(day)}</span>
                      </div>
                    </td>
                    <EditableCell value={row?.pt1_data_visor ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt1_data_visor: v || null })} />
                    <EditableCell value={row?.pt1_hora_visor ?? ''} readOnly={readOnly} placeholder="HH:MM"
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt1_hora_visor: v || null })} />
                    <EditableCell value={boolStr(row?.pt1_temperatura_estavel)} readOnly={readOnly}
                      options={SIM_NAO_OPTIONS}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt1_temperatura_estavel: strBool(v) })} />
                    <EditableCell value={row?.pt2_data_visor ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt2_data_visor: v || null })} />
                    <EditableCell value={row?.pt2_hora_visor ?? ''} readOnly={readOnly} placeholder="HH:MM"
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt2_hora_visor: v || null })} />
                    <EditableCell value={boolStr(row?.pt2_temperatura_estavel)} readOnly={readOnly}
                      options={SIM_NAO_OPTIONS}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, pt2_temperatura_estavel: strBool(v) })} />
                    <EditableCell value={row?.responsavel_antes ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, responsavel_antes: v || null })} />
                    <EditableCell value={boolStr(row?.programacao_correta)} readOnly={readOnly}
                      options={SIM_NAO_OPTIONS}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, programacao_correta: strBool(v) })} />
                    <EditableCell value={row?.horario_registro ?? ''} readOnly={readOnly} placeholder="HH:MM"
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, horario_registro: v || null })} />
                    <EditableCell value={row?.observacoes ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, observacoes: v || null })} />
                    <EditableCell value={row?.responsavel_apos ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertProgramacaoProcessador({ date: dateKey, responsavel_apos: v || null })} />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
