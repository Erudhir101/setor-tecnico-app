'use client'

import EditableCell from '@/components/EditableCell'
import { upsertCentralInclusao } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { CentralInclusao } from '@/types'

interface Props {
  rows: Record<string, CentralInclusao>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

export default function CentralInclusaoTable({ rows, days, readOnly }: Props) {
  return (
    <section id="central-inclusao" className="animate-fade-in-up stagger-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Central de Inclusão</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de temperaturas da central de inclusão</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Cubas Visor</TH>
                <TH>Dispensador Visor</TH>
                <TH>C. Quente Visor</TH>
                <TH>Cuba 1 Term.</TH>
                <TH>Cuba 2 Term.</TH>
                <TH>Disp. Term.</TH>
                <TH>Quente Term.</TH>
                <TH>Frio Term.</TH>
                <TH>Placa Fria</TH>
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

                    <EditableCell value={row?.cubas_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, cubas_visor: v || null })} />
                    <EditableCell value={row?.dispensador_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, dispensador_visor: v || null })} />
                    <EditableCell value={row?.central_quente_visor ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, central_quente_visor: v || null })} />
                    <EditableCell value={row?.cuba_1_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, cuba_1_term: v || null })} />
                    <EditableCell value={row?.cuba_2_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, cuba_2_term: v || null })} />
                    <EditableCell value={row?.dispensador_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, dispensador_term: v || null })} />
                    <EditableCell value={row?.quente_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, quente_term: v || null })} />
                    <EditableCell value={row?.frio_term ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, frio_term: v || null })} />
                    <EditableCell value={row?.placa_fria ?? ''} readOnly={readOnly} type="number" placeholder="°C"
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, placa_fria: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertCentralInclusao({ date: dateKey, responsavel: v || null })} />
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
