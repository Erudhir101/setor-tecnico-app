'use client'

import { useState } from 'react'
import { Activity } from 'lucide-react'
import MonthNavigation from './MonthNavigation'
import TableSidebar from './TableSidebar'
import UnlockButton from './UnlockButton'
import ArquivoCitologiaTable from './tables/ArquivoCitologiaTable'
import BanhoHistologicoTable from './tables/BanhoHistologicoTable'
import BateriaHETable from './tables/BateriaHETable'
import BateriaPapanicolauTable from './tables/BateriaPapanicolauTable'
import CentralInclusaoTable from './tables/CentralInclusaoTable'
import ControleColoracaoTable from './tables/ControleColoracaoTable'
import EstufaGeladeiraTable from './tables/EstufaGeladeiraTable'
import ParafinaTable from './tables/ParafinaTable'
import ProcessadorTecidosTable from './tables/ProcessadorTecidosTable'
import ProdutividadeTable from './tables/ProdutividadeTable'
import ProgramacaoProcessadorTable from './tables/ProgramacaoProcessadorTable'
import TopografiasTable from './tables/TopografiasTable'
import { getMonthLabel } from '@/lib/utils'
import type { AllTableData } from '@/types'

interface Props {
  year: number
  month: number
  isCurrentMonth: boolean
  days: Date[]
  data: AllTableData
}

export default function MonthlyDashboard({ year, month, isCurrentMonth, days, data }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const readOnly = !isCurrentMonth && !isUnlocked

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/25 shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg font-bold leading-none">
                <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Flow LAB
                </span>
              </h1>
              <p className="text-xs text-gray-500 truncate">Controles do Setor Técnico</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <MonthNavigation year={year} month={month} />
            {!isCurrentMonth && (
              <UnlockButton isUnlocked={isUnlocked} onToggle={() => setIsUnlocked((v) => !v)} />
            )}
            {isCurrentMonth && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                Mês atual
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <TableSidebar />

        <main className="flex-1 min-w-0 px-3 sm:px-6 py-6 space-y-8 animate-fade-in">
          {readOnly && (
            <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
              <span className="font-medium">Mês bloqueado.</span>
              <span>Clique em &quot;Desbloquear&quot; no topo para editar este mês.</span>
            </div>
          )}

          <ArquivoCitologiaTable rows={data.arquivoCitologia} days={days} readOnly={readOnly} />
          <BanhoHistologicoTable rows={data.banhoHistologico} days={days} readOnly={readOnly} />
          <BateriaHETable rows={data.bateriaHE} days={days} readOnly={readOnly} />
          <BateriaPapanicolauTable rows={data.bateriaPapanicolau} days={days} readOnly={readOnly} />
          <CentralInclusaoTable rows={data.centralInclusao} days={days} readOnly={readOnly} />
          <ControleColoracaoTable
            rowsPAP={data.controleColoracaoPAP}
            rowsHE={data.controleColoracaoHE}
            days={days}
            readOnly={readOnly}
          />
          <EstufaGeladeiraTable rows={data.estufaGeladeira} days={days} readOnly={readOnly} />
          <ParafinaTable rows={data.parafina} days={days} readOnly={readOnly} />
          <ProcessadorTecidosTable rows={data.processadorTecidos} days={days} readOnly={readOnly} />
          <ProdutividadeTable rows={data.produtividade} days={days} readOnly={readOnly} />
          <ProgramacaoProcessadorTable rows={data.programacaoProcessador} days={days} readOnly={readOnly} />
          <TopografiasTable rows={data.topografias} days={days} readOnly={readOnly} />
        </main>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:hidden z-10">
        <div className="px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200 text-xs font-semibold text-gray-700">
          {getMonthLabel(year, month)}
        </div>
      </div>
    </div>
  )
}
