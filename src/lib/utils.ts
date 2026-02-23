import { getDaysInMonth as dfnGetDaysInMonth } from 'date-fns'

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export function getDaysInMonth(year: number, month: number): Date[] {
  const count = dfnGetDaysInMonth(new Date(year, month - 1, 1))
  return Array.from({ length: count }, (_, i) => new Date(year, month - 1, i + 1))
}

export function isCurrentMonth(year: number, month: number): boolean {
  const now = new Date()
  return now.getFullYear() === year && now.getMonth() + 1 === month
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function getWeekOfMonth(date: Date): number {
  return Math.ceil(date.getDate() / 7)
}

export function getWeekdayLabel(date: Date): string {
  return WEEKDAYS_PT[date.getDay()]
}

export function getMonthLabel(year: number, month: number): string {
  return `${MONTHS_PT[month - 1]} ${year}`
}

export function getPrevMonth(year: number, month: number): { year: number; month: number } {
  if (month === 1) return { year: year - 1, month: 12 }
  return { year, month: month - 1 }
}

export function getNextMonth(year: number, month: number): { year: number; month: number } {
  if (month === 12) return { year: year + 1, month: 1 }
  return { year, month: month + 1 }
}
