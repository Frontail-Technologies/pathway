'use client'

import Link from 'next/link'
import { Edit, ExternalLink, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { stopRowClick } from '../../kit'

export function RowActions({ name, viewHref, editHref, publicHref }: { name: string; viewHref: string; editHref?: string; publicHref?: string }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={viewHref} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          {editHref ? (
            <DropdownMenuItem render={<Link href={editHref} />}>
              <Edit className="size-4" aria-hidden="true" />
              Edit
            </DropdownMenuItem>
          ) : null}
          {publicHref ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={publicHref} target="_blank" rel="noreferrer" />}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
