'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { toast } from 'sonner'

interface EditableCellProps {
  value: string
  onSave: (value: string) => Promise<void>
  readOnly?: boolean
  type?: 'text' | 'boolean' | 'number'
  placeholder?: string
  className?: string
  options?: string[]
}

export default function EditableCell({
  value,
  onSave,
  readOnly = false,
  type = 'text',
  placeholder,
  className = '',
  options,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState(value)
  const [editValue, setEditValue] = useState(value)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDisplayValue(value)
    if (!isEditing) setEditValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (isEditing) {
      if (type === 'boolean') selectRef.current?.focus()
      else inputRef.current?.focus()
    }
  }, [isEditing, type])

  // Close custom dropdown on outside click
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

  const commitSave = (newValue: string) => {
    if (newValue === value) return
    const prev = displayValue
    setDisplayValue(newValue)
    startTransition(async () => {
      try {
        await onSave(newValue)
      } catch {
        setDisplayValue(prev)
        toast.error('Erro ao salvar. Tente novamente.')
      }
    })
  }

  const handleTextSave = () => {
    commitSave(editValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleTextSave()
    if (e.key === 'Escape') {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  // ── OPTIONS: custom single-click dropdown ──────────────────────────────────
  if (options) {
    if (readOnly) {
      return (
        <td className={`px-2 py-1.5 border-b border-gray-100 whitespace-nowrap ${className}`}>
          <OptionBadge value={displayValue} />
        </td>
      )
    }
    return (
      <td
        className={`px-2 py-1.5 border-b border-gray-100 ${isPending ? 'opacity-60' : ''} ${className}`}
      >
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="w-full text-left cursor-pointer hover:opacity-80 transition-opacity"
            title="Clique para editar"
          >
            <OptionBadge value={displayValue} />
          </button>

          {isOpen && (
            <ul className="absolute z-50 left-0 top-full mt-0.5 min-w-[130px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <li
                className="px-3 py-1.5 text-sm text-gray-400 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => { commitSave(''); setIsOpen(false) }}
              >
                —
              </li>
              {options.map((opt) => (
                <li
                  key={opt}
                  className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-50 select-none whitespace-nowrap ${
                    opt === displayValue
                      ? 'bg-blue-50 font-medium text-blue-700'
                      : 'text-gray-700'
                  }`}
                  onClick={() => { commitSave(opt); setIsOpen(false) }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </td>
    )
  }

  // ── READ-ONLY (text / boolean / number) ────────────────────────────────────
  if (readOnly) {
    return (
      <td className={`px-2 py-1.5 text-sm text-gray-700 border-b border-gray-100 whitespace-nowrap ${className}`}>
        {renderValue(displayValue, type)}
      </td>
    )
  }

  // ── EDITING: boolean select ────────────────────────────────────────────────
  if (isEditing && type === 'boolean') {
    return (
      <td className={`px-1 py-1 border-b border-blue-200 bg-blue-50/40 ${className}`}>
        <select
          ref={selectRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleTextSave}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white cursor-pointer"
        >
          <option value="">—</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </td>
    )
  }

  // ── EDITING: text / number input ───────────────────────────────────────────
  if (isEditing) {
    return (
      <td className={`px-1 py-1 border-b border-blue-200 bg-blue-50/40 ${className}`}>
        <input
          ref={inputRef}
          type={type === 'number' ? 'number' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleTextSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-2 py-1 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white min-w-[70px]"
        />
      </td>
    )
  }

  // ── DISPLAY: clickable cell ────────────────────────────────────────────────
  return (
    <td
      className={`px-2 py-1.5 text-sm text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-blue-50/40 transition-colors whitespace-nowrap ${isPending ? 'opacity-60' : ''} ${className}`}
      onClick={() => setIsEditing(true)}
      title="Clique para editar"
    >
      {renderValue(displayValue, type)}
    </td>
  )
}

function OptionBadge({ value }: { value: string }) {
  if (!value) return <span className="text-gray-300 text-xs">—</span>
  if (value === 'Sim')
    return <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
  if (value === 'Não')
    return <span className="inline-flex items-center px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
  if (value === 'Completei')
    return <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
  if (value === 'Não alterado')
    return <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
  if (value.startsWith('Troquei'))
    return <span className="inline-flex items-center px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
  return <span className="inline-flex items-center px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">{value}</span>
}

function renderValue(value: string, type: 'text' | 'boolean' | 'number') {
  if (type === 'boolean') {
    if (value === 'true')
      return <span className="inline-flex items-center px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Sim</span>
    if (value === 'false')
      return <span className="inline-flex items-center px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Não</span>
    return <span className="text-gray-300 text-xs">—</span>
  }
  if (!value) return <span className="text-gray-300 text-xs">—</span>
  return value
}
