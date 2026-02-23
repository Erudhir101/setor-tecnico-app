'use client'

import EditableCell from '@/components/EditableCell'
import { upsertProcessadorTecidos } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS, CHEMICAL_STATUS_OPTIONS } from '@/lib/constants'
import type { ProcessadorTecidos } from '@/types'

interface Props {
  rows: Record<string, ProcessadorTecidos>
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

export default function ProcessadorTecidosTable({ rows, days, readOnly }: Props) {
  return (
    <section id="processador-tecidos" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Processador de Tecidos</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle das soluções dos processadores de tecidos</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Data</th>
                <THGroup colSpan={4}>Processador 1</THGroup>
                <THGroup colSpan={4}>Processador 2</THGroup>
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Responsável</th>
                <th rowSpan={2} className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">Observações</th>
              </tr>
              <tr className="bg-gray-50">
                <TH>Formol</TH><TH>Álcool</TH><TH>Xilol</TH><TH>Parafina</TH>
                <TH>Formol</TH><TH>Álcool</TH><TH>Xilol</TH><TH>Parafina</TH>
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
                    <EditableCell value={row?.pt1_formol ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt1_formol: v || null })} />
                    <EditableCell value={row?.pt1_alcool ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt1_alcool: v || null })} />
                    <EditableCell value={row?.pt1_xilol ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt1_xilol: v || null })} />
                    <EditableCell value={row?.pt1_parafina ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt1_parafina: v || null })} />
                    <EditableCell value={row?.pt2_formol ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt2_formol: v || null })} />
                    <EditableCell value={row?.pt2_alcool ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt2_alcool: v || null })} />
                    <EditableCell value={row?.pt2_xilol ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt2_xilol: v || null })} />
                    <EditableCell value={row?.pt2_parafina ?? ''} readOnly={readOnly} options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, pt2_parafina: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly} options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, responsavel: v || null })} />
                    <EditableCell value={row?.observacoes ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertProcessadorTecidos({ date: dateKey, observacoes: v || null })} />
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
