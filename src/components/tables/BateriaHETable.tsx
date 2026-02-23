'use client'

import EditableCell from '@/components/EditableCell'
import { upsertBateriaHE } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS, CHEMICAL_STATUS_OPTIONS } from '@/lib/constants'
import type { BateriaHE } from '@/types'

interface Props {
  rows: Record<string, BateriaHE>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

export default function BateriaHETable({ rows, days, readOnly }: Props) {
  return (
    <section id="bateria-he" className="animate-fade-in-up stagger-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Bateria HE</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle da bateria de coloração Hematoxilina &amp; Eosina</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Xilol 1</TH>
                <TH>Álcool 1</TH>
                <TH>Hematoxilina</TH>
                <TH>Giemsa</TH>
                <TH>Álcool 2</TH>
                <TH>Eosina</TH>
                <TH>Álcool 3</TH>
                <TH>Xilol 2</TH>
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

                    <EditableCell value={row?.xilol_1 ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, xilol_1: v || null })} />
                    <EditableCell value={row?.alcool_1 ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, alcool_1: v || null })} />
                    <EditableCell value={row?.hematoxilina ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, hematoxilina: v || null })} />
                    <EditableCell value={row?.giemsa ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, giemsa: v || null })} />
                    <EditableCell value={row?.alcool_2 ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, alcool_2: v || null })} />
                    <EditableCell value={row?.eosina ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, eosina: v || null })} />
                    <EditableCell value={row?.alcool_3 ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, alcool_3: v || null })} />
                    <EditableCell value={row?.xilol_2 ?? ''} readOnly={readOnly}
                      options={CHEMICAL_STATUS_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, xilol_2: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertBateriaHE({ date: dateKey, responsavel: v || null })} />
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
