'use client'

import EditableCell from '@/components/EditableCell'
import { upsertArquivoCitologia } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { ArquivoCitologia } from '@/types'

interface Props {
  rows: Record<string, ArquivoCitologia>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

function numStr(v: number | null | undefined): string {
  return v != null ? String(v) : ''
}

function strNum(s: string): number | null {
  if (!s) return null
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

export default function ArquivoCitologiaTable({ rows, days, readOnly }: Props) {
  return (
    <section id="arquivo-citologia" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Arquivo de Citologia</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de arquivo de frascos de citologia</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Com Captura</TH>
                <TH>Sem Captura</TH>
                <TH>Observações</TH>
                <TH>Responsável 1</TH>
                <TH>Responsável 2</TH>
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
                    <EditableCell value={numStr(row?.citologias_com_captura)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertArquivoCitologia({ date: dateKey, citologias_com_captura: strNum(v) })} />
                    <EditableCell value={numStr(row?.citologias_sem_captura)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertArquivoCitologia({ date: dateKey, citologias_sem_captura: strNum(v) })} />
                    <EditableCell value={row?.observacoes ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertArquivoCitologia({ date: dateKey, observacoes: v || null })} />
                    <EditableCell value={row?.responsavel_1 ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertArquivoCitologia({ date: dateKey, responsavel_1: v || null })} />
                    <EditableCell value={row?.responsavel_2 ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertArquivoCitologia({ date: dateKey, responsavel_2: v || null })} />
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
