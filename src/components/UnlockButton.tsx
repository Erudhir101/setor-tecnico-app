'use client'

import { Lock, Unlock } from 'lucide-react'

interface Props {
  isUnlocked: boolean
  onToggle: () => void
}

export default function UnlockButton({ isUnlocked, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
        isUnlocked
          ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
          : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
      }`}
      title={isUnlocked ? 'Bloquear edição' : 'Desbloquear edição deste mês'}
    >
      {isUnlocked ? (
        <>
          <Unlock className="w-4 h-4" />
          <span>Edição desbloqueada</span>
        </>
      ) : (
        <>
          <Lock className="w-4 h-4" />
          <span>Edição bloqueada — Desbloquear</span>
        </>
      )}
    </button>
  )
}
