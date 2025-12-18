"use client"

import { Dialog, DialogContent, DialogTitle, DialogOverlay } from "@radix-ui/react-dialog"
import { ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar } from "@radix-ui/react-scroll-area"

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export default function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 max-w-4xl w-full max-h-[90vh] bg-[#0a0e17] border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-white">{title}</DialogTitle>
        </div>
        <ScrollArea className="h-[60vh] overflow-auto">
          <ScrollAreaViewport className="p-6 h-full">
            <div className="text-gray-300">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">{content}</pre>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="vertical" className="flex w-2.5 touch-none select-none p-0.5">
            <div className="relative flex-1 rounded-full bg-gray-700" />
          </ScrollAreaScrollbar>
        </ScrollArea>
        <div className="p-6 pt-0 flex justify-end">
          <button
            onClick={onClose}
            className="bg-weaveit-500 hover:bg-weaveit-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Got it
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}