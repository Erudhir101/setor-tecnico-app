'use client'

import EditableCell from '@/components/EditableCell'
import { upsertParafina } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { Parafina } from '@/types'

interface Props {
  rows: Record<string, Parafina>
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

export default function ParafinaTable({ rows, days, readOnly }: Props) {
  return (
    <section id="parafina" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Parafina</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de temperatura da parafina dos processadores</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Data</th>
                <THGroup colSpan={4}>Processador 1</THGroup>
                <THGroup colSpan={4}>Processador 2</THGroup>
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Observ.</th>
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Responsável</th>
              </tr>
              <tr className="bg-gray-50">
                <TH>T1 Visor</TH>
                <TH>T2 Visor</TH>
                <TH>T1 Term.</TH>
                <TH>T2 Term.</TH>
                <TH>T1 Visor</TH>
                <TH>T2 Visor</TH>
                <TH>T1 Term.</TH>
                <TH>T2 Term.</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rows[dateKey]
                const weekend = isWeekend(day)
                const wdLabel = getWeekdayLabel(day)

                return (
                  <tr key={dateKey} className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}>
                    <td className="px-3 py-1.5 border-b border-gray-100 sticky left-0 bg-inherit z-10 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-800 w-5 text-right tabular-nums">{day.getDate()}</span>
                        <span className={`text-xs w-7 ${weekend ? 'text-red-400 font-medium' : 'text-gray-400'}`}>{wdLabel}</span>
                      </div>
                    </td>
                    <EditableCell value={row?.pt1_t1_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt1_t1_visor: v || null })} />
                    <EditableCell value={row?.pt1_t2_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt1_t2_visor: v || null })} />
                    <EditableCell value={row?.pt1_t1_termometro ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt1_t1_termometro: v || null })} />
                    <EditableCell value={row?.pt1_t2_termometro ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt1_t2_termometro: v || null })} />
                    <EditableCell value={row?.pt2_t1_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt2_t1_visor: v || null })} />
                    <EditableCell value={row?.pt2_t2_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt2_t2_visor: v || null })} />
                    <EditableCell value={row?.pt2_t1_termometro ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt2_t1_termometro: v || null })} />
                    <EditableCell value={row?.pt2_t2_termometro ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertParafina({ date: dateKey, pt2_t2_termometro: v || null })} />
                    <EditableCell value={row?.observacoes ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertParafina({ date: dateKey, observacoes: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertParafina({ date: dateKey, responsavel: v || null })} />
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
