'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react'
import { getPrevMonth, getNextMonth } from '@/lib/utils'

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

interface Props {
  year: number
  month: number
}

export default function MonthNavigation({ year, month }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const prev = getPrevMonth(year, month)
  const next = getNextMonth(year, month)

  useEffect(() => {
    if (!isOpen) return
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])

  return (
    <div className="flex items-center gap-2">
      {/* Previous month */}
      <Link
        href={`/${prev.year}/${prev.month}`}
        className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-600 hover:text-gray-900"
        title="Mês anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {/* Month/year dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 min-w-[180px] justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-sm font-semibold text-gray-800">
            {MONTHS_PT[month - 1]} {year}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <ul className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-1">
            {MONTHS_PT.map((name, i) => {
              const m = i + 1
              const isCurrent = m === month
              return (
                <li key={m}>
                  <Link
                    href={`/${year}/${m}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-2 text-sm transition-colors ${
                      isCurrent
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 shrink-0" />}
                    {!isCurrent && <span className="w-1.5 h-1.5 mr-2 shrink-0" />}
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Next month */}
      <Link
        href={`/${next.year}/${next.month}`}
        className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-600 hover:text-gray-900"
        title="Próximo mês"
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
