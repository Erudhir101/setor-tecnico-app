'use client'

import EditableCell from '@/components/EditableCell'
import { upsertEstufaGeladeira } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { EstufaGeladeira } from '@/types'

interface Props {
  rows: Record<string, EstufaGeladeira>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

export default function EstufaGeladeiraTable({ rows, days, readOnly }: Props) {
  return (
    <section id="estufa-geladeira" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Estufa / Geladeira</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de temperatura da estufa e geladeira</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Estufa T1 Visor</TH>
                <TH>Estufa T2 Term.</TH>
                <TH>Gelad. T1 Visor</TH>
                <TH>Geladeira T2</TH>
                <TH>Geladeira T2b</TH>
                <TH>Observações</TH>
                <TH>Responsável</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rows[dateKey]
                const weekend = isWeekend(day)
                const wdLabel = getWeekdayLabel(day)

                return (
                  <tr
                    key={dateKey}
                    className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}
                  >
                    <td className="px-3 py-1.5 border-b border-gray-100 sticky left-0 bg-inherit z-10 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-800 w-5 text-right tabular-nums">
                          {day.getDate()}
                        </span>
                        <span className={`text-xs w-7 ${weekend ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
                          {wdLabel}
                        </span>
                      </div>
                    </td>

                    <EditableCell value={row?.estufa_t1_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, estufa_t1_visor: v || null })} />
                    <EditableCell value={row?.estufa_t2_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, estufa_t2_term: v || null })} />
                    <EditableCell value={row?.geladeira_t1_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, geladeira_t1_visor: v || null })} />
                    <EditableCell value={row?.geladeira_t2 ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, geladeira_t2: v || null })} />
                    <EditableCell value={row?.geladeira_t2b ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, geladeira_t2b: v || null })} />
                    <EditableCell value={row?.observacoes ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, observacoes: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertEstufaGeladeira({ date: dateKey, responsavel: v || null })} />
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
