'use client'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface AdminTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  loading?: boolean
}

export default function AdminTable<T extends { id: string }>({ columns, data, onEdit, onDelete, loading }: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white border border-flora-moss/10 rounded p-12 text-center">
        <p className="font-body text-sm text-flora-moss animate-pulse">Carregando...</p>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="bg-white border border-flora-moss/10 rounded p-12 text-center">
        <p className="font-body text-sm text-flora-moss/50">Nenhum item encontrado.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-flora-moss/10 rounded overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-flora-offwhite border-b border-flora-moss/10">
            <tr>
              {columns.map(col => (
                <th key={String(col.key)} className={cn('text-left text-xs font-body text-flora-moss/60 uppercase tracking-wide px-4 py-3', col.className)}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="text-right text-xs font-body text-flora-moss/60 uppercase tracking-wide px-4 py-3">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id} className="border-b border-flora-moss/5 hover:bg-flora-moss/2 transition-colors">
                {columns.map(col => (
                  <td key={String(col.key)} className={cn('px-4 py-3 text-sm font-body text-flora-deep align-middle', col.className)}>
                    {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {onEdit && (
                      <button onClick={() => onEdit(row)} className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors mr-4">
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} className="text-xs font-body text-red-400 hover:text-red-600 transition-colors">
                        Excluir
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
