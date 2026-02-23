'use client'

import { useEffect, useState } from 'react'
import { Thermometer, FlaskConical, Microscope, Box, Palette, Refrigerator, Droplets, Cog, BarChart3, ClipboardList, FolderOpen, MapPin } from 'lucide-react'

const TABLES = [
  { id: 'arquivo-citologia', label: 'Arquivo Citologia', icon: FolderOpen },
  { id: 'banho-histologico', label: 'Banho Histológico', icon: Thermometer },
  { id: 'bateria-he', label: 'Bateria HE', icon: FlaskConical },
  { id: 'bateria-papanicolau', label: 'Bateria Papanicolau', icon: Microscope },
  { id: 'central-inclusao', label: 'Central de Inclusão', icon: Box },
  { id: 'controle-coloracao', label: 'Controle Coloração', icon: Palette },
  { id: 'estufa-geladeira', label: 'Estufa / Geladeira', icon: Refrigerator },
  { id: 'parafina', label: 'Parafina', icon: Droplets },
  { id: 'processador-tecidos', label: 'Processador Tecidos', icon: Cog },
  { id: 'produtividade', label: 'Produtividade', icon: BarChart3 },
  { id: 'programacao-processador', label: 'Prog. Processador', icon: ClipboardList },
  { id: 'topografias', label: 'Topografias', icon: MapPin },
]

export default function TableSidebar() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = TABLES.map((t) => document.getElementById(t.id))
      const scrollY = window.scrollY + 120
      let current = ''
      for (const section of sections) {
        if (section && section.offsetTop <= scrollY) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto border-r border-gray-100 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 py-4 px-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
        Tabelas
      </p>
      <nav className="space-y-0.5">
        {TABLES.map(({ id, label, icon: Icon }) => {
          const isActive = activeId === id
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span className="truncate leading-tight">{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
