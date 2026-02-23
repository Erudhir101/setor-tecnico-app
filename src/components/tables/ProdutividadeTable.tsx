'use client'

import EditableCell from '@/components/EditableCell'
import { upsertProdutividade } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel, getWeekOfMonth } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { Produtividade } from '@/types'

interface Props {
  rows: Record<string, Produtividade>
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
  if (s === '' || s === null) return null
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

export default function ProdutividadeTable({ rows, days, readOnly }: Props) {
  return (
    <section id="produtividade" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Produtividade</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle diário de produtividade do setor</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Semana</TH>
                <TH>Lâm. Citologia</TH>
                <TH>Lâm. Biópsia</TH>
                <TH>Novos Cortes</TH>
                <TH>Escaneadas</TH>
                <TH>Total Diário</TH>
                <TH>Blocos Biópsia</TH>
                <TH>Responsável</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rows[dateKey]
                const weekend = isWeekend(day)
                const wdLabel = getWeekdayLabel(day)
                const semana = `Sem. ${getWeekOfMonth(day)}`

                return (
                  <tr key={dateKey} className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}>
                    <td className="px-3 py-1.5 border-b border-gray-100 sticky left-0 bg-inherit z-10 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-800 w-5 text-right tabular-nums">{day.getDate()}</span>
                        <span className={`text-xs w-7 ${weekend ? 'text-red-400 font-medium' : 'text-gray-400'}`}>{wdLabel}</span>
                      </div>
                    </td>
                    <td className="px-3 py-1.5 border-b border-gray-100 whitespace-nowrap">
                      <span className="text-xs text-gray-400 font-medium">{semana}</span>
                    </td>
                    <EditableCell value={numStr(row?.laminas_citologia)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, laminas_citologia: strNum(v) })} />
                    <EditableCell value={numStr(row?.laminas_biopsia)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, laminas_biopsia: strNum(v) })} />
                    <EditableCell value={numStr(row?.laminas_novos_cortes)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, laminas_novos_cortes: strNum(v) })} />
                    <EditableCell value={numStr(row?.laminas_escaneadas)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, laminas_escaneadas: strNum(v) })} />
                    <EditableCell value={numStr(row?.total_diario)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, total_diario: strNum(v) })} />
                    <EditableCell value={numStr(row?.blocos_biopsia)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, blocos_biopsia: strNum(v) })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertProdutividade({ date: dateKey, semana, responsavel: v || null })} />
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
