'use client'

import EditableCell from '@/components/EditableCell'
import { upsertTopografias } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS } from '@/lib/constants'
import type { Topografias } from '@/types'

interface Props {
  rows: Record<string, Topografias>
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

export default function TopografiasTable({ rows, days, readOnly }: Props) {
  return (
    <section id="topografias" className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Topografias</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de distribuição de biópsias por topografia</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>S. Digestivo</TH>
                <TH>Colo Uterino</TH>
                <TH>Útero</TH>
                <TH>Mama</TH>
                <TH>Pele</TH>
                <TH>Endométrio</TH>
                <TH>Placenta/R.Ov.</TH>
                <TH>Próstata</TH>
                <TH>Vesícula/Ap.</TH>
                <TH>Tireoide</TH>
                <TH>Outros</TH>
                <TH>Qtd. Exames</TH>
                <TH>Responsável</TH>
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
                    <EditableCell value={numStr(row?.s_digestivo)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, s_digestivo: strNum(v) })} />
                    <EditableCell value={numStr(row?.colo_uterino)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, colo_uterino: strNum(v) })} />
                    <EditableCell value={numStr(row?.utero)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, utero: strNum(v) })} />
                    <EditableCell value={numStr(row?.mama)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, mama: strNum(v) })} />
                    <EditableCell value={numStr(row?.pele)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, pele: strNum(v) })} />
                    <EditableCell value={numStr(row?.endometrio)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, endometrio: strNum(v) })} />
                    <EditableCell value={numStr(row?.placenta_restos_ovulares)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, placenta_restos_ovulares: strNum(v) })} />
                    <EditableCell value={numStr(row?.prostata)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, prostata: strNum(v) })} />
                    <EditableCell value={numStr(row?.vesicula_apendice)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, vesicula_apendice: strNum(v) })} />
                    <EditableCell value={numStr(row?.tireoide)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, tireoide: strNum(v) })} />
                    <EditableCell value={numStr(row?.outros)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, outros: strNum(v) })} />
                    <EditableCell value={numStr(row?.qtd_exames)} type="number" readOnly={readOnly}
                      onSave={async (v) => upsertTopografias({ date: dateKey, qtd_exames: strNum(v) })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertTopografias({ date: dateKey, responsavel: v || null })} />
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
