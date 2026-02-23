'use client'

import EditableCell from '@/components/EditableCell'
import { upsertBanhoHistologico } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { BanhoHistologico } from '@/types'

interface Props {
  rows: Record<string, BanhoHistologico>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
    {children}
  </th>
)

export default function BanhoHistologicoTable({ rows, days, readOnly }: Props) {
  return (
    <section id="banho-histologico" className="animate-fade-in-up stagger-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Banho Histológico</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle diário de temperatura do banho histológico</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>T1 Visor</TH>
                <TH>T2 Termômetro</TH>
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

                    <EditableCell
                      value={row?.t1_visor ?? ''}
                      readOnly={readOnly}
                      type="number"
                      placeholder="°C"
                      onSave={async (val) => upsertBanhoHistologico({ date: dateKey, t1_visor: val || null })}
                    />
                    <EditableCell
                      value={row?.t2_termometro ?? ''}
                      readOnly={readOnly}
                      type="number"
                      placeholder="°C"
                      onSave={async (val) => upsertBanhoHistologico({ date: dateKey, t2_termometro: val || null })}
                    />
                    <EditableCell
                      value={row?.observacoes ?? ''}
                      readOnly={readOnly}
                      onSave={async (val) => upsertBanhoHistologico({ date: dateKey, observacoes: val || null })}
                    />
                    <EditableCell
                      value={row?.responsavel ?? ''}
                      readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (val) => upsertBanhoHistologico({ date: dateKey, responsavel: val || null })}
                    />
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
