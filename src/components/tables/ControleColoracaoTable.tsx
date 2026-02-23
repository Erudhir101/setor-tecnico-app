'use client'

import EditableCell from '@/components/EditableCell'
import { upsertControleColoracaoPAP, upsertControleColoracaoHE } from '@/actions/upsert'
import { formatDateKey, isWeekend, getWeekdayLabel } from '@/lib/utils'
import { RESPONSIBLE_OPTIONS, SIM_NAO_OPTIONS, TEMPOS_COLORACAO_PAP_OPTIONS, TEMPOS_COLORACAO_HE_OPTIONS } from '@/lib/constants'
import type { ControleColoracaoPAP, ControleColoracaoHE } from '@/types'

interface Props {
  rowsPAP: Record<string, ControleColoracaoPAP>
  rowsHE: Record<string, ControleColoracaoHE>
  days: Date[]
  readOnly: boolean
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap border-b border-gray-100">
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

function DateCell({ day }: { day: Date }) {
  const weekend = isWeekend(day)
  return (
    <td className="px-3 py-1.5 border-b border-gray-100 sticky left-0 bg-inherit z-10 whitespace-nowrap">
      <div className="flex items-center gap-1.5">
        <span className="font-medium text-gray-800 w-5 text-right tabular-nums">
          {day.getDate()}
        </span>
        <span className={`text-xs w-7 ${weekend ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
          {getWeekdayLabel(day)}
        </span>
      </div>
    </td>
  )
}

export default function ControleColoracaoTable({ rowsPAP, rowsHE, days, readOnly }: Props) {
  return (
    <section id="controle-coloracao" className="space-y-6 animate-fade-in-up stagger-5">
      {/* PAP */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Controle de Coloração — Papanicolau</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de qualidade da coloração PAP</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Tempos Coloração</TH>
                <TH>Coloração Satisfatória</TH>
                <TH>Medida Corretiva</TH>
                <TH>Responsável</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rowsPAP[dateKey]
                const weekend = isWeekend(day)
                return (
                  <tr key={dateKey} className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}>
                    <DateCell day={day} />
                    <EditableCell value={row?.tempos_coloracao ?? ''} readOnly={readOnly}
                      options={TEMPOS_COLORACAO_PAP_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoPAP({ date: dateKey, tempos_coloracao: v || null })} />
                    <EditableCell value={boolStr(row?.coloracao_satisfatoria)} readOnly={readOnly}
                      options={SIM_NAO_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoPAP({ date: dateKey, coloracao_satisfatoria: strBool(v) })} />
                    <EditableCell value={row?.medida_corretiva ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertControleColoracaoPAP({ date: dateKey, medida_corretiva: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoPAP({ date: dateKey, responsavel: v || null })} />
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* HE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <h2 className="text-lg font-semibold text-gray-800">Controle de Coloração — HE</h2>
          <p className="text-xs text-gray-500 mt-0.5">Controle de qualidade da coloração Hematoxilina & Eosina</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <TH>Data</TH>
                <TH>Tempo HE</TH>
                <TH>Tempo HP</TH>
                <TH>Coloração Satisfatória</TH>
                <TH>Medida Corretiva</TH>
                <TH>Responsável</TH>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const dateKey = formatDateKey(day)
                const row = rowsHE[dateKey]
                const weekend = isWeekend(day)
                return (
                  <tr key={dateKey} className={`hover:bg-blue-50/20 ${weekend ? 'bg-slate-50/80' : 'bg-white'}`}>
                    <DateCell day={day} />
                    <EditableCell value={row?.tempo_he ?? ''} readOnly={readOnly}
                      options={TEMPOS_COLORACAO_HE_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoHE({ date: dateKey, tempo_he: v || null })} />
                    <EditableCell value={row?.tempo_hp ?? ''} readOnly={readOnly}
                      options={TEMPOS_COLORACAO_HE_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoHE({ date: dateKey, tempo_hp: v || null })} />
                    <EditableCell value={boolStr(row?.coloracao_satisfatoria)} readOnly={readOnly}
                      options={SIM_NAO_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoHE({ date: dateKey, coloracao_satisfatoria: strBool(v) })} />
                    <EditableCell value={row?.medida_corretiva ?? ''} readOnly={readOnly}
                      onSave={async (v) => upsertControleColoracaoHE({ date: dateKey, medida_corretiva: v || null })} />
                    <EditableCell value={row?.responsavel ?? ''} readOnly={readOnly}
                      options={RESPONSIBLE_OPTIONS}
                      onSave={async (v) => upsertControleColoracaoHE({ date: dateKey, responsavel: v || null })} />
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
