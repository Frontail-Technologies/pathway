export type CsvColumn<Row> = { header: string; value: (row: Row) => string | number | null | undefined }

const escape = (value: unknown) => {
  const text = value === null || value === undefined ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv<Row>(rows: Row[], columns: CsvColumn<Row>[]) {
  const lines = [columns.map((column) => escape(column.header)).join(',')]
  for (const row of rows) lines.push(columns.map((column) => escape(column.value(row))).join(','))
  return `﻿${lines.join('\r\n')}`
}

export function downloadCsv<Row>(fileName: string, rows: Row[], columns: CsvColumn<Row>[]) {
  const blob = new Blob([toCsv(rows, columns)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
