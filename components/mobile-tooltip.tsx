"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useMobileDetect } from "@/hooks/use-mobile"

interface MobileTooltipProps {
  trigger: React.ReactNode
  content: React.ReactNode
  title?: string
}

export default function MobileTooltip({ trigger, content, title }: MobileTooltipProps) {
  const [open, setOpen] = useState(false)
  const isMobile = useMobileDetect()

  if (!isMobile) {
    return trigger
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription className="text-foreground">{content}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

